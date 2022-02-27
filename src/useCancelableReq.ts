import { useState, useEffect, useMemo, useRef } from "react";
import { rejectOrCb, getResParser, getCTypeHeaderVal, getErrorBody } from "./utils";

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
  const resRef = useRef<Response>();
  const [resData, setResData] = useState();
  const [error, setError] = useState<Error>();

  const abortController = useMemo(() => controller || new AbortController(), [])

  function setResponse(response: Response) {
    resRef.current = response
  }

  function handleSetError(data: any) {
    const errorBody = getErrorBody(data)

    // Set response object for axios
    if (data.request) {
      setResponse(data)
    }

    setError(errorBody);
    setIsLoading(false);
    onFail?.(errorBody)
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

    resRef.current = response;

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
    res: resRef.current,
    data: resData,
    error,
    isLoading,
    cancel,
    makeLazyRequest: isLazy ? makeRequest : null
  };
}
