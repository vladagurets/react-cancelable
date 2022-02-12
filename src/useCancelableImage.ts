import { useState } from "react";
import useCancelableReq from "./useCancelableReq";

export default function useCancelableImage({
  src,
  fetchParams = {},
  onComplete,
  onFail,
}: UseCancelableImageParams): UseCancelableImageReturn {
  const [url, setUrl] = useState<string>()
  const { isLoading, error } = useCancelableReq({
    src,
    fetchParams,
    resType: 'blob',
    onComplete: handleFetchComplete,
    onFail
   })

    function handleFetchComplete(blob: Blob) {
    const imageObjectURL = URL.createObjectURL(blob);
    setUrl(imageObjectURL)
    onComplete && onComplete(imageObjectURL)
  }

  return {
    url,
    error,
    isLoading,
  };
}
