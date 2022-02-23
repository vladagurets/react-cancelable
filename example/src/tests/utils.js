export function getSomething(client, url) {
  return function(controller) {
    return client(url, { signal: controller.signal })
  }
}
