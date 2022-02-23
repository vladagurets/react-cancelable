export function getSomething(client, url, opts) {
  return function(controller) {
    return client(url, { signal: controller.signal, ...opts })
  }
}
