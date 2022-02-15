import { useState } from "react";
import useCancelableReq from "./useCancelableReq";

/**
 * @description Hook to prepare cencelable image request.
 * `fn` must return a Request as Blob
 */
export default function useCancelableImg(fn: CancelableRequestFn, opts?: UseCancelableReqParams): UseCancelableImgReturn {
  const {
    isLazy = false,
    cancelOnUnmount = true,
    controller,
    onComplete,
    onFail,
    onCancel
  } = opts || {};

  const { isLoading, error, cancel, makeLazyRequest } = useCancelableReq(fn, {
    controller,
    cancelOnUnmount,
    isLazy,
    onComplete: handleComplete,
    onFail,
    onCancel
  });
  const [src, setSrc] = useState<string>()

  function handleComplete(blob: Blob) {
    if (!(blob instanceof Blob)) {
      throw Error('[react-cancelable] useCancelableImg: Request must return Blob')
    }

    const imageObjectURL = URL.createObjectURL(blob);
    setSrc(imageObjectURL)
    onComplete?.(imageObjectURL)
  }

  return {
    src,
    error,
    isLoading,
    cancel,
    makeLazyRequest
  };
}
