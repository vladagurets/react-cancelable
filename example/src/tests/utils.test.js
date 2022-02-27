import { getResParser, getCTypeHeaderVal } from 'react-cancelable'
import axios from 'axios'

test('getCTypeHeaderVal', async () => {
  const fetchRes = await fetch('https://httpbin.org/get')
  const axiosRes = await axios.get('https://httpbin.org/get')

  expect(getCTypeHeaderVal(fetchRes)).toBe('application/json')
  expect(getCTypeHeaderVal(axiosRes)).toBe('application/json')
})

test('getResParser', async () => {
  const fetchRes = await fetch('https://httpbin.org/get')
  const axiosRes = await axios.get('https://httpbin.org/get')

  const fetchCT = getCTypeHeaderVal(fetchRes)
  const axiosCT = getCTypeHeaderVal(axiosRes)

  expect(getResParser(fetchCT)).toBe('json')
  expect(getResParser(axiosCT)).toBe('json')
  expect(getResParser('application/json')).toBe('json')
  expect(getResParser('text/xml')).toBe('text')
  expect(getResParser('image/png')).toBe('blob')
  expect(getResParser('video/mp4')).toBe('blob')
  expect(getResParser('???')).toBe('blob')
})
