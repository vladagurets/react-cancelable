import { useState, useEffect, useMemo } from "react";
import { rejectOrCb, getResParser, getCTypeHeaderVal } from "./utils";

export default function useCancelableReq(fn: CancelableRequestFn, opts?: UseCancelableReqParams): UseCancelableReqReturn {
  const {
    isLazy = false,
    cancelOnUnmount = true,
    controller,
    onComplete,
    onFail,
    onCancel
  } = opts || {};

  const [isLoading, setIsLoading] = useState(!isLazy);
  const [resData, setResData] = useState();
  const [error, setError] = useState<Error>();

  const abortController = useMemo(() => controller || new AbortController(), [])

  function handleSetError(data: any) {
    setError(data);
    setIsLoading(false);
    onFail?.(data)
  }

  function handleSetResData(data: any) {
    setResData(data)
    setIsLoading(false)
    onComplete?.(data)
  }

  function cancel(): void {
    abortController.abort()
    onCancel?.()
  }

  function processResult(response: Response, isMounted: boolean) {
    const contentheader = getCTypeHeaderVal(response)
    const resHandler = getResParser(contentheader)

    if (response['data']) {
      // Get `axios` res data
      rejectOrCb(handleSetResData, { isMounted, data: response['data'] })
    } else {
      // Get `fetch` res data
      response[resHandler]()
        .then((data: any) => rejectOrCb(response.ok ? handleSetResData : handleSetError, { isMounted, data }))
        .catch((error: any) => rejectOrCb(handleSetError, { isMounted, data: error }))
    }
  }

  function makeRequest() {
    setIsLoading(true)

    fn(abortController)
      .then(response => rejectOrCb(processResult, { isMounted: true, data: response }))
      .catch((error: any) => rejectOrCb(handleSetError, { isMounted: true, data: error.response || error }))
  }

  useEffect(() => {
    let isMounted = true;

    if (!isLazy) {
      fn(abortController)
        .then(response => rejectOrCb(processResult, { isMounted, data: response }))
        .catch((error: any) => rejectOrCb(handleSetError, { isMounted, data: error.response || error }))
    }

    if (cancelOnUnmount) {
      return () => {
        isMounted = false;
  
        if (!abortController.signal.aborted) {
          abortController.abort();
        }
      };
    }

    return;
  }, [])

  return {
    data: resData,
    error,
    isLoading,
    cancel,
    makeLazyRequest: isLazy ? makeRequest : null
  };
}
