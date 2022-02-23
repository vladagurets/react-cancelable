import { renderHook } from '@testing-library/react-hooks'
import { useCancelableReq } from 'react-cancelable'
import { getSomething } from './utils'


test('useCancelableReq (fetch -> get json)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(fetch, 'https://httpbin.org/json')))

  await waitForNextUpdate()
  
  expect(typeof result.current.data).toBe('object')
})

test('useCancelableReq (fetch -> get text)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(fetch, 'https://httpbin.org/robots.txt')))

  await waitForNextUpdate()
  
  expect(typeof result.current.data).toBe('string')
})

// test('useCancelableReq (fetch -> get error)', async () => {
//   const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(fetch, 'https://httpbin.org/status/400')))

//   await waitForNextUpdate()

//   // console.log(result.current)
  
//   // expect(typeof result.current.res).toBe('string')
// })
