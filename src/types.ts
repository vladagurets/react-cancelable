type UseCancelableReqParams = {
  controller?: AbortController;
  onFail?: (error: any) => void;
  onComplete?: (res: any) => void;
}

type UseCancelableReqReturn = {
  res?: Response;
  error?: Error;
  isLoading: boolean;
}

type UseCancelableImgReturn = {
  url?: string;
  error?: Error;
  isLoading: boolean;
}

type RejectOrCbOpts = {
  isMounted: boolean;
  data: any;
}

type CancelableRequestFn = (controller: AbortController) => Promise<any>

type ExtendedPromise = Promise<any> & {
  cancel: VoidFunction
}
