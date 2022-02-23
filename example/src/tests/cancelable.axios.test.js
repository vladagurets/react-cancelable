import { renderHook } from '@testing-library/react-hooks'
import { useCancelableReq, useCancelableImg } from 'react-cancelable'
import { getSomething } from './utils'
import axios from 'axios'

beforeAll(() => {
  global.URL.createObjectURL = blob => blob.toString();
})

test('useCancelableReq (axios -> get json)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(axios, 'https://httpbin.org/json')))

  await waitForNextUpdate({ timeout: 2000 })

  
  expect(typeof result.current.data).toBe('object')
  expect(result.current.res.status).toBe(200)
})

test('useCancelableReq (axios -> get text)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(axios, 'https://httpbin.org/robots.txt')))

  await waitForNextUpdate({ timeout: 2000 })
  
  expect(typeof result.current.data).toBe('string')
  expect(result.current.res.status).toBe(200)
})

test('useCancelableReq (axios -> get blob)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(
    getSomething(axios, 'https://picsum.photos/50', { responseType: 'blob'}))
  )

  await waitForNextUpdate({ timeout: 2000 })
  
  expect(result.current.data instanceof Blob).toBe(true)
  expect(result.current.res.status).toBe(200)
})

test('useCancelableReq (axios -> get error without body)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(axios, 'https://httpbin.org/status/400')))

  await waitForNextUpdate({ timeout: 2000 })
  
  expect(result.current.res.status).toBe(400)
})

test('useCancelableReq (axios -> get error with body)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableReq(getSomething(axios, 'https://httpbin.org/range/_dummy_')))

  await waitForNextUpdate({ timeout: 2000 })
  
  expect(typeof result.current.error).toBe('string')
})

test('useCancelableImg (axios -> get src)', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useCancelableImg(
    getSomething(axios, 'https://picsum.photos/50', { responseType: 'blob'}))
  )

  await waitForNextUpdate({ timeout: 2000 })
  
  expect(result.current.src).toBe(new Blob().toString())
})
