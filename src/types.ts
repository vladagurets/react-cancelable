type UseCancelableReqParams = {
  isLazy?: boolean;
  cancelOnUnmount?: boolean;
  controller?: AbortController;
  onFail?: (error: any) => void;
  onComplete?: (res: any) => void;
  onCancel?: () => void;
}

type BaseCancelableReturn = {
  error?: Error;
  isLoading: boolean;
  cancel: VoidFunction;
  makeLazyRequest: VoidFunction | null;
}

type UseCancelableReqReturn = BaseCancelableReturn & {
  data?: Response;
}

type UseCancelableImgReturn = BaseCancelableReturn & {
  src?: string;
}

type RejectOrCbOpts = {
  isMounted: boolean;
  data: any;
}

type CancelableRequestFn = (controller: AbortController) => Promise<any>

type ExtendedPromise = Promise<any> & {
  cancel: VoidFunction
}
