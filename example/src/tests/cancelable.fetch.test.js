import { renderHook, act } from '@testing-library/react-hooks'
import { useCancelableReq, useCancelableImg } from 'react-cancelable'
import { getSomething } from './utils'

const CANCEL_ERROR_STRING = 'AbortError: Aborted'

beforeAll(() => {
  global.URL.createObjectURL = blob => blob.toString();
})

test('useCancelableImg (fetch)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableImg(getSomething(fetch, 'https://picsum.photos/50')))

  await waitForNextUpdate({ timeout: 2000 })

  expect(result.current.src).toBe(new Blob().toString())
})

// ______________

test('useCancelableReq (fetch -> get json)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(fetch, 'https://httpbin.org/json')))

  await waitForNextUpdate({ timeout: 2000 })
  
  expect(typeof result.current.data).toBe('object')
  expect(result.current.res.status).toBe(200)
})

test('useCancelableReq (fetch -> get text)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(fetch, 'https://httpbin.org/robots.txt')))

  await waitForNextUpdate({ timeout: 2000 })
  
  expect(typeof result.current.data).toBe('string')
  expect(result.current.res.status).toBe(200)
})

test('useCancelableReq (fetch -> get blob)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(fetch, 'https://picsum.photos/50')))

  await waitForNextUpdate({ timeout: 2000 })
  
  expect(result.current.data instanceof Blob).toBe(true)
  expect(result.current.res.status).toBe(200)
})

test('useCancelableReq (fetch -> get error without body)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(fetch, 'https://httpbin.org/status/400')))

  await waitForNextUpdate({ timeout: 2000 })
  
  expect(result.current.res.status).toBe(400)
})

test('useCancelableReq (fetch -> get error with body)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(fetch, 'https://httpbin.org/range/_dummy_')))

  await waitForNextUpdate({ timeout: 2000 })
  
  expect(typeof result.current.error).toBe('string')
})

test('useCancelableReq (fetch -> opts.isLazy)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(
    getSomething(fetch, 'https://httpbin.org/json'),
    {
      isLazy: true
    }
  ))

  act(() => {
    result.current.makeLazyRequest()
  })

  await waitForNextUpdate({ timeout: 2000 })

  expect(typeof result.current.data).toBe('object')
  expect(result.current.res.status).toBe(200)
})

test('useCancelableImg (fetch -> opts.controller)', async () => {
  const controller = new AbortController()

  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(
    getSomething(fetch, 'https://httpbin.org/json'),
    {
      controller
    }
  ))

  controller.abort()

  await waitForNextUpdate({ timeout: 2000 })

  expect(result.current.error.toString()).toBe(CANCEL_ERROR_STRING)
})

test('useCancelableImg (fetch -> artefacts.cancel)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(
    getSomething(fetch, 'https://httpbin.org/json')
  ))

  act(() => {
    result.current.cancel()
  })

  await waitForNextUpdate({ timeout: 2000 })

  expect(result.current.error.toString()).toBe(CANCEL_ERROR_STRING)
})
