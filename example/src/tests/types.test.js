import { renderHook } from '@testing-library/react-hooks'
import { useCancelableReq, useCancelableImg, cancelable } from 'react-cancelable'

function getSomething(controller) {
  return fetch(`https://httpbin.org/delay/0`, { signal: controller.signal })
}

test('validate useCancelableReq return type', async () => {
  const { result } = renderHook(() => useCancelableReq(getSomething))

  expect('data' in result.current).toBe(true)
  expect('error' in result.current).toBe(true)
  expect(result.current.isLoading).toBe(true)
  expect(typeof result.current.cancel).toBe('function')
  expect(result.current.makeLazyRequest).toBe(null)
  expect('makeLazyRequest' in result.current).toBe(true)
})

test('validate useCancelableImg return type', async () => {
  const { result } = renderHook(() => useCancelableImg(getSomething))

  expect('src' in result.current).toBe(true)
  expect('error' in result.current).toBe(true)
  expect(result.current.isLoading).toBe(true)
  expect(typeof result.current.cancel).toBe('function')
  expect(result.current.makeLazyRequest).toBe(null)
  expect('makeLazyRequest' in result.current).toBe(true)
})

test('validate cancelable return type', async () => {
  const request = cancelable(getSomething)

  expect(request instanceof Promise).toBe(true)
  expect(typeof request.cancel).toBe('function')
})
