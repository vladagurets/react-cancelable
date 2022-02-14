import { useState, useEffect, useMemo } from "react";
import { rejectOrCb, getResParser } from "./utils";

export default function useCancelableReq(fn: CancelableRequestFn, opts?: UseCancelableReqParams): UseCancelableReqReturn {
  const { onComplete, onFail } = opts || {};

  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState<Response>();
  const [error, setError] = useState<Error>();

  const abortController = useMemo(() => new AbortController(), [])

  function handleSetError(e: any) {
    setError(e);
    setIsLoading(false);
    onFail && onFail(e)
  }

  function handleSetRes(res: any) {
    setRes(res)
    setIsLoading(false)
    onComplete && onComplete(res)
  }

  function processResult(response: Response, isMounted: boolean) {
    const resHandler = getResParser(response.headers.get('Content-Type') || 'default');

    response[resHandler]()
      .then((data: any) => rejectOrCb(response.ok ? handleSetRes : handleSetError, { isMounted, data }))
      .catch((error: any) => rejectOrCb(handleSetError, { isMounted, data: error }))
  }

  useEffect(() => {
    let isMounted = true;

    fn(abortController)
      .then(response => rejectOrCb(processResult, { isMounted, data: response }))
      .catch(error => rejectOrCb(handleSetError, { isMounted, data: error }))

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
