type UseCancelableReqParams = {
  controller?: AbortController;
  onFail?: (error: any) => void;
  onComplete?: (res: any) => void;
  onCancel?: () => void;
}

type BaseCancelableReturn = {
  error?: Error;
  isLoading: boolean;
  cancel: VoidFunction;
}

type UseCancelableReqReturn = BaseCancelableReturn & {
  res?: Response;
}

type UseCancelableImgReturn = BaseCancelableReturn & {
  url?: string;
}

type RejectOrCbOpts = {
  isMounted: boolean;
  data: any;
}

type CancelableRequestFn = (controller: AbortController) => Promise<any>

type ExtendedPromise = Promise<any> & {
  cancel: VoidFunction
}
