import React, { FC } from 'react';
import { useCancelableImg } from 'react-cancelable'
import axios from 'axios'

const ITEMS = new Array(50).fill(null)

function getImage(controller: AbortController) {
  return axios('https://picsum.photos/5000', { signal: controller.signal, responseType: 'blob' })
  // return fetch('https://picsum.photos/5000', { signal: controller.signal })
}

const Item: FC = () => {
  const { src, isLoading } = useCancelableImg(getImage)

  return (
    <div className='imageListItem'>
      {isLoading && <span>Loading...</span>}
      {src && <img className='imgPreview' alt='Fetched' src={src} /> }
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
