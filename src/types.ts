type UseCancelableReqParams = {
  onFail?: (error: any) => void;
  onComplete?: (res: any) => void;
}

type UseCancelableReqReturn = {
  res?: Response;
  error?: Error;
  isLoading: boolean;
}

type UseCancelableImageReturn = {
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
  stop: VoidFunction
}
