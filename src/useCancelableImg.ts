import { useState } from "react";
import useCancelableReq from "./useCancelableReq";

/**
 * @description Hook to prepare cencelable image request.
 * `fn` must return a Request as Blob
 */
export default function useCancelableImg(fn: CancelableRequestFn, opts?: UseCancelableReqParams): UseCancelableImgReturn {
  const { controller, onComplete, onFail, onCancel } = opts || {};

  const { isLoading, error, cancel } = useCancelableReq(fn, {
    controller,
    onComplete: handleComplete,
    onFail,
    onCancel
  });
  const [url, setUrl] = useState<string>()

  function handleComplete(blob: Blob) {
    if (!(blob instanceof Blob)) {
      throw Error('[react-cancelable] useCancelableImg: Request must return Blob')
    }

    const imageObjectURL = URL.createObjectURL(blob);
    setUrl(imageObjectURL)
    onComplete?.(imageObjectURL)
  }

  return {
    url,
    error,
    isLoading,
    cancel
  };
}
