import React, { FC, useEffect, useState } from 'react';
import './App.css';
import { useCancelableReq } from 'react-cancelable'

const ITEMS = new Array(100).fill(null)

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Item: FC = () => {
  const { res, isLoading, error } = useCancelableReq({ src: 'https://httpbin.org/get' })
  console.log(error, res)
  return (
    <div className="Item">
      {isLoading && <span>Loading...</span>}
      <br />
      {res && <span>Data fetched!</span>}
      <br />
      {error && <span>{error.message || error.code || 'Error'}</span>}
    </div>
  )
}

function App() {
  const [isListVisible, setIsListVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsListVisible(false)
    }, 3000);
  }, [])
  return (
    <div className="App">
      <h1>Examples of react-cancelable</h1>
      {
        !isListVisible && <h3>List is unmounted. Pending requests are canceled.</h3>
      }
      {
        isListVisible &&
          <div className="List">
            {
              ITEMS.map((el, i) => <Item key={i} />)
            }
          </div>
      }
    </div>
  );
}

export default App;
