import { useState, useEffect, useMemo } from "react";
import { rejectOrCb, getResParser } from "./utils";

export default function useCancelableReq(fn: CancelableRequestFn, opts?: UseCancelableReqParams): UseCancelableReqReturn {
  const { onComplete, onFail } = opts || {};

  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState<Response>();
  const [error, setError] = useState<Error>();

  const abortController = useMemo(() => new AbortController(), [])

  function handleSetError(data: any) {
    setError(data);
    setIsLoading(false);
    onFail && onFail(data)
  }

  function handleSetResData(data: any) {
    setRes(data)
    setIsLoading(false)
    onComplete && onComplete(data)
  }

  function processResult(response: Response, isMounted: boolean) {
    const resHandler = getResParser(response.headers.get('Content-Type') || 'default');

    response[resHandler]()
      .then((data: any) => rejectOrCb(response.ok ? handleSetResData : handleSetError, { isMounted, data }))
      .catch((error: any) => rejectOrCb(handleSetError, { isMounted, data: error }))
  }

  useEffect(() => {
    let isMounted = true;

    fn(abortController)
      .then(response => rejectOrCb(processResult, { isMounted, data: response }))
      .catch((error: any) => rejectOrCb(handleSetError, { isMounted, data: error }))

    return () => {
      isMounted = false;

      if (!abortController.signal.aborted) {
        abortController.abort();
      }
    };
  }, [])
  return {
    res,
    error,
    isLoading,
  };
}
