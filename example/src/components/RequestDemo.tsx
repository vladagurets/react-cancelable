import React, { FC } from 'react';
import { useCancelableReq } from 'react-cancelable'

const ITEMS = new Array(100).fill(null)

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Item: FC = () => {
  const { res, isLoading, error } = useCancelableReq({ src: `https://httpbin.org/delay/${randomInteger(1,5)}` })
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
