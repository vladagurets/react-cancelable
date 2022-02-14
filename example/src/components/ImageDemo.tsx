import React, { FC } from 'react';
import { useCancelableImage } from 'react-cancelable'
import axios from 'axios'

const ITEMS = new Array(100).fill(null)

function getImage(controller: AbortController) {
  return axios('https://picsum.photos/5000', { signal: controller.signal, responseType: 'blob' })
  // return fetch('https://picsum.photos/5000', { signal: controller.signal })
}

const Item: FC = () => {
  const { url, isLoading, error } = useCancelableImage(getImage)

  return (
    <div className='imageListItem'>
      {isLoading && <span>Loading...</span>}
      <br />
      { url && <img alt='Fetched' src={url} width='200' height='200' /> }
      <br />
      {error && <span>{error}</span>}
    </div>
  )
}

function ImageDemo() {
  return (
    <div className='container'>
      <div className='imageList'>
        {
          ITEMS.map((el, i) => <Item key={i} />)
        }
      </div>
    </div>
  );
}

export default ImageDemo;
