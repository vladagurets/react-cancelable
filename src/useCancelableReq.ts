import { useState, useEffect } from "react";
import rejectPromiseChain from "./rejectPromiseChain";

const RES_TYPES_TO_PARSER = {
  'json': 'json',
  'text': 'text',
  default: 'blob'
}

function getResParser(contentType: string): string {
  if (contentType.includes('application/json')) {
    return RES_TYPES_TO_PARSER.json
  }

  const type = contentType.split('/').shift()
  return type && RES_TYPES_TO_PARSER[type] || RES_TYPES_TO_PARSER.default;
}

export default function useCancelableReq({
  src,
  resType,
  fetchParams = {},
  onComplete,
  onFail,
}: UseCancelableReqParams): UseCancelableReqReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState<Response>();
  const [error, setError] = useState<Error>();

  function onSetError(e: any) {
    setError(e);
    setIsLoading(false);
    onFail && onFail(e)
  }

  function onSetRes(res: any) {
    setRes(res)
    setIsLoading(false)
    onComplete && onComplete(res)
  }

  function processRes(response: Response, isMounted: boolean) {
    if (response.ok) {
      const resHandler = resType || getResParser(response.headers.get('Content-Type') || 'default');
      response[resHandler]()
        .then((_response: any) => rejectOrCb(isMounted, onSetRes, _response))
    } else {
      const resHandler = getResParser(response.headers.get('Content-Type') || 'default');
      response[resHandler]()
        .then((_response: any) => rejectOrCb(isMounted, onSetError, _response))
    }
  }

  function rejectOrCb(isMounted: boolean, cb: Function, ...rest: any[]) {
    if (isMounted) {
      cb(...rest)
    } else {
      rejectPromiseChain()
    }
  }

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();

    fetch(src, {
      ...fetchParams,
      signal: controller.signal,
    })
      .then(response => rejectOrCb(isMounted, processRes, response, isMounted))
      .catch(error => rejectOrCb(isMounted, onSetError, error))

    return () => {
      isMounted = false;

      if (!controller.signal.aborted) {
        controller.abort();
      }
    };
  }, []);

  return {
    res,
    error,
    isLoading,
  };
}
