import { getResParser, getCTypeHeaderVal, cancelable } from 'react-cancelable'
import axios from 'axios'

test('getCTypeHeaderVal', async () => {
  const fetchRes = await fetch('https://httpbin.org/get')
  const axiosRes = await axios.get('https://httpbin.org/get')

  const fetchImgRes = await fetch('https://picsum.photos/200')
  const axiosImgRes = await axios.get('https://picsum.photos/200')

  expect(getCTypeHeaderVal(fetchRes)).toBe('application/json')
  expect(getCTypeHeaderVal(axiosRes)).toBe('application/json')

  expect(getCTypeHeaderVal(fetchImgRes)).toBe('image/jpeg')
  expect(getCTypeHeaderVal(axiosImgRes)).toBe('image/jpeg')
})

test('getResParser', async () => {
  const fetchRes = await fetch('https://httpbin.org/get')
  const axiosRes = await axios.get('https://httpbin.org/get')
  const fetchImgRes = await fetch('https://picsum.photos/200')
  const axiosImgRes = await axios.get('https://picsum.photos/200')

  const fetchCT = getCTypeHeaderVal(fetchRes)
  const axiosCT = getCTypeHeaderVal(axiosRes)
  const fetchImgCT = getCTypeHeaderVal(fetchImgRes)
  const axiosImgCT = getCTypeHeaderVal(axiosImgRes)

  expect(getResParser(fetchCT)).toBe('json')
  expect(getResParser(axiosCT)).toBe('json')
  expect(getResParser(fetchImgCT)).toBe('blob')
  expect(getResParser(axiosImgCT)).toBe('blob')
  expect(getResParser('application/json')).toBe('json')
  expect(getResParser('text/xml')).toBe('text')
  expect(getResParser('image/png')).toBe('blob')
  expect(getResParser('video/mp4')).toBe('blob')
  expect(getResParser('???')).toBe('blob')
})

test('cancelable | wait', async () => {
  const fetchReq = cancelable((controller) => fetch('https://httpbin.org/get', { signal: controller.signal }))
  const axiosReq = cancelable((controller) => axios.get('https://httpbin.org/get', { signal: controller.signal }))

  const results = await Promise.allSettled([axiosReq, fetchReq])

  expect(results.every(res => res.status === 'fulfilled')).toBe(true)
})

test('cancelable | reject', async () => {
  const fetchReq = cancelable((controller) => fetch('https://httpbin.org/delay/3', { signal: controller.signal }))
  const axiosReq = cancelable((controller) => axios.get('https://httpbin.org/delay/3', { signal: controller.signal }))

  axiosReq.cancel()
  fetchReq.cancel()

  const results = await Promise.allSettled([axiosReq, fetchReq])

  expect(results.every(res => res.status === 'rejected')).toBe(true)
})
