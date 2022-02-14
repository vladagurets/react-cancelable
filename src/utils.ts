const RES_TYPES_TO_PARSER = {
  'json': 'json',
  'text': 'text',
  default: 'blob'
}

export function getResParser(contentType: string): string {
  if (contentType.includes('application/json')) {
    return RES_TYPES_TO_PARSER.json
  }

  const type = contentType.split('/').shift()
  return type && RES_TYPES_TO_PARSER[type] || RES_TYPES_TO_PARSER.default;
}

export function rejectPromiseChain() {
  return Promise.reject('[react-cancelable] Request canceled');
}

export function rejectOrCb(cb: Function, opts: RejectOrCbOpts) {
  const { isMounted, data } = opts
  if (isMounted) {
    cb(data, isMounted)
  } else {
    rejectPromiseChain()
  }
}
