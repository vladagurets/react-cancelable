
## useCancelableReq

Some info about useCancelableReq

#### Example:
```jsx
import React from 'react';
import { useCancelableReq } from 'react-cancelable'

function makeRequest(controller) {
  // Pass signal to your request
  return fetch("YOUR_ENDPOINT", { signal: controller.signal })
}

function Item() {
  const { res, isLoading, error } = useCancelableReq(makeRequest)

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {error && <span>Error occured</span>}
      {res && <span>Result is fetched</span>}
    </>
  )
}
```

## useCancelableImg

Some info about useCancelableImg

#### Example:
```jsx
import React from 'react';
import { useCancelableReq } from 'react-cancelable'


function getImage(controller: AbortController) {
  // Pass signal to your request
  return fetch('IMAGE_URL', { signal: controller.signal })
}

function Item() {
  const { url, isLoading, error } = useCancelableImg(getImage)

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {error && <span>Error occured</span>}
      {url && <img src={url} />}
    </>
  )
}
```

## cancelable HOF

Some info about ancelable HOF

#### Example:
```javascript
import { cancelable } from 'react-cancelable'

function makeRequest(controller) {
  return fetch("YOUR_ENDPOINT", { signal: controller.signal })
}

// Wrap your request
const request = cancelable(makeRequest)

setTimeout(() => {
  // Cancel request later
  request.cancel()
}, 1000)
```
