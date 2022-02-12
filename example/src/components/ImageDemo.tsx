import React, { FC } from 'react';
import { useCancelableImage } from 'react-cancelable'

const ITEMS = new Array(100).fill(null)

const Item: FC = () => {
  const { url, isLoading, error } = useCancelableImage({ src: 'https://picsum.photos/5000' })
  return (
    <div className='imageListItem'>
      {isLoading && <span>Loading...</span>}
      <br />
      { url && <img alt='Fetched' src={url} width='200' height='200' /> }
      <br />
      {error && <span>{error.message || error.code || 'Error'}</span>}
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
