const RES_TYPES_TO_PARSER = {
  'json': 'json',
  'text': 'text',
  default: 'blob'
}

const C_TYPE_HEADER_KEY = 'content-type';

export function getResParser(contentType: string): string {
  if (contentType.includes('application/json')) {
    return RES_TYPES_TO_PARSER.json
  }

  const type = contentType.split('/').shift()
  return type && RES_TYPES_TO_PARSER[type] || RES_TYPES_TO_PARSER.default;
}

export function stopPromiseChain() {
  return Promise.resolve();
}

export function rejectOrCb(cb: Function, opts: RejectOrCbOpts) {
  const { isMounted, data } = opts
  if (isMounted) {
    cb(data, isMounted)
  } else {
    stopPromiseChain()
  }
}

export function getCTypeHeaderVal(response: Response): string {
  let headerVal

  if (response?.headers?.get) {
    headerVal = response.headers.get(C_TYPE_HEADER_KEY)
  } else if (response?.headers) {
    headerVal = response.headers[C_TYPE_HEADER_KEY]
  }

  return headerVal || 'default';
}
