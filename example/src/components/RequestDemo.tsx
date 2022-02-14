import React, { FC, useEffect } from 'react';
import { useCancelableReq } from 'react-cancelable'
import axios from 'axios'

const ITEMS = new Array(50).fill(null)

// https://httpbin.org/bytes/rr - Error 404 with body
// https://httpbin.org/delay/${randomInteger(1,5)} - random delay with body

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSomething(controller: AbortController) {
  return axios(`https://httpbin.org/delay/${randomInteger(1,5)}`, { signal: controller.signal })
  // return fetch(`https://httpbin.org/bytes/rr`, { signal: controller.signal })
}

const Item: FC = () => {
  const { res, isLoading, error } = useCancelableReq(getSomething)

  return (
    <div className='listItem'>
      {isLoading && <span>Loading...</span>}
      <br />
      {res && <span>Data fetched!</span>}
      <br />
      {error && <span>{error.message || error.code || 'Error'}</span>}
    </div>
  )
}

function RequestDemo() {
  return (
    <div className='container'>
      <div className='list'>
        {
          ITEMS.map((el, i) => <Item key={i} />)
        }
      </div>
    </div>
  );
}

export default RequestDemo;
