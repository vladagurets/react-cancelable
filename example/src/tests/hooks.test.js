import { renderHook } from '@testing-library/react-hooks'
import { useCancelableReq } from 'react-cancelable'

function getSomethingWithFetch(controller) {
  return fetch(`https://httpbin.org/get`, { signal: controller.signal })
}

test('useCancelableReq | get | fetch', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomethingWithFetch))

  await waitForNextUpdate()

  console.log(result.current)

  
  // expect(result.current.res).toBe(undefined)
})
