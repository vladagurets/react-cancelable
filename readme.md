<h1 align="center">react-cancelable<i>(alpha)</i></h1>
<p align="center"><i>Improve client's traffic experiense</i></span>
<br></br>

<br />

[![version][npm-version-badge]][npm-url]
<!-- [![downloads][total-downloads-badge]][npm-url] -->

[npm-url]: https://www.npmjs.com/package/react-cancelable
[npm-version-badge]: https://badge.fury.io/js/react-cancelable.svg
[total-downloads-badge]: https://img.shields.io/npm/dt/react-cancelable.svg

<br />

# Table of Contents

1. [Motivation](#motivation)
2. [Tools](#tools)
    1. [useCancelableReq](#usecancelablereq)
    2. [useCancelableImg](#usecancelableimg)
    3. [cancelable HOF](#cancelable-hof)
3. [Fetch vs Axios](#fetch-vs-axios)
4. [Best practices (WIP)](#best-practices)

<br />

# Motivation

In most of cases client consumes a lot of excess traffic. Modern web applications make a huge bunch of requests per conventional time unit then a lot of clients don't wait until all requests made by web app are finished. As a result, the browser expects data that will no longer be used

But don't worry you can easily deal with it with the latest AbortController API and react-cancelable

<br />

# Tools

## useCancelableReq

<br />

Make cancelable request. Hook helps you to control request canceling by React Component Lifecycle or by your own.

<br />

### Signature

<br />

```typescript
type RequestFn = (controller: AbortController) => Promise<any>

type Opts = {
  isLazy?: boolean;
  cancelOnUnmount?: boolean;
  controller?: AbortController;
  onComplete?: (res: any) => void;
  onFail?: (error: any) => void
  onCancel?: VoidFunction;
}

type Artefacts = {
  res?: any;
  error?: any;
  isLoading: boolean;
  cancel: VoidFunction,
  makeLazyRequest: VoidFunction | null;
}

useCancelableReq(fn: RequestFn, opts?: Opts): Artefacts
```

<br />

### API
<br />
<table width="100%">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>isLazy</td>
      <td>Control request by your own if true. By default, a request will be made on the component mount</td>
      <td>false</td>
    </tr>
    <tr>
      <td>cancelOnUnmount</td>
      <td>Request will be canceled on component unmount if true</td>
      <td>true</td>
    </tr>
    <tr>
      <td>controller</td>
      <td>By default component will create instance automaticaly under the hood. If yoo want to controll multiple requests with one conteroller pass your own instance of AbortControler</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>onComplete</td>
      <td>Trigger after request is completed</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>onFail</td>
      <td>Trigger after request is failed</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>onCancel</td>
      <td>Trigger after request is canceled</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>res</td>
      <td>Response of a request</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>error</td>
      <td>Error of a request</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>isLoading</td>
      <td>Flag to determine active status of request. If isLazy is true isLoading is false by default</td>
      <td>true</td>
    </tr>
    <tr>
      <td>cancel</td>
      <td>Request cancel trigger</td>
      <td>function</td>
    </tr>
    <tr>
      <td>makeLazyRequest</td>
      <td>Make request trigger. If isLazy is true makeLazyRequest is function</td>
      <td>null</td>
    </tr>
  </tbody>
</table>

<br />

### Example

<br />

```jsx
import React from 'react'
import { useCancelableReq } from 'react-cancelable'

function makeRequest(controller) {
  // Pass signal to your request
  return fetch("YOUR_ENDPOINT", { signal: controller.signal })
}

const opts = {}

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

<br />

## useCancelableImg

<br />

Make cancelable request. Hook helps you to cancel requested image.

<br />

### Signature

<br />

```typescript
type RequestFn = (controller: AbortController) => Promise<any>

type Opts = {
  isLazy?: boolean;
  cancelOnUnmount?: boolean;
  controller?: AbortController;
  onComplete?: (res: any) => void;
  onFail?: (error: any) => void
  onCancel?: VoidFunction;
}

type Artefacts = {
  src?: string;
  error?: any;
  isLoading: boolean;
  cancel: VoidFunction,
  makeLazyRequest: VoidFunction | null;
}

useCancelableImg(fn: RequestFn, opts?: Opts): Artefacts
```

<br />

### API
<br />
<table width="100%">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>isLazy</td>
      <td>Control request by your own if true. By default, a request will be made on the component mount</td>
      <td>false</td>
    </tr>
    <tr>
      <td>cancelOnUnmount</td>
      <td>Request will be canceled on component unmount if true</td>
      <td>true</td>
    </tr>
    <tr>
      <td>controller</td>
      <td>By default component will create instance automaticaly under the hood. If yoo want to controll multiple requests with one conteroller pass your own instance of AbortControler</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>onComplete</td>
      <td>Trigger after request is completed</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>onFail</td>
      <td>Trigger after request is failed</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>onCancel</td>
      <td>Trigger after request is canceled</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>src</td>
      <td>Generated ObjectURI to Blob image after request done</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>error</td>
      <td>Error of a request</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>isLoading</td>
      <td>Flag to determine active status of request. If isLazy is true isLoading is false by default</td>
      <td>true</td>
    </tr>
    <tr>
      <td>cancel</td>
      <td>Request cancel trigger</td>
      <td>function</td>
    </tr>
    <tr>
      <td>makeLazyRequest</td>
      <td>Make request trigger. If isLazy is true makeLazyRequest is function</td>
      <td>null</td>
    </tr>
  </tbody>
</table>

<br />

### Example

<br />

```jsx
import React from 'react'
import { useCancelableReq } from 'react-cancelable'


function getImage(controller) {
  // Pass signal to your request
  return fetch('IMAGE_URL', { signal: controller.signal })
}

function Item() {
  const { src, isLoading, error } = useCancelableImg(getImage)

  return (
    <>
      {isLoading && <span>Loading...</span>}
      {src && <img src={src} />}
    </>
  )
}
```

<br />

## cancelable HOF
<br />

Hight order function to create cancelable requests

<br />

### Signature

<br />

```typescript
type RequestFn = (controller: AbortController) => Promise<any>

cancelable(fn: RequestFn, controller?: AbortController): Promise<any> & { cancel: VoidFunction}
```

<br />

### API

<br />

<table width="100%">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>fn</td>
      <td>Callback that returns Promise generated by HTTP client</td>
      <td>function</td>
    </tr>
    <tr>
      <td>controller</td>
      <td>By default component will create instance automaticaly under the hood. If yoo want to controll multiple requests with one conteroller pass your own instance of AbortControler</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>cancel</td>
      <td>Request cancel trigger. Property added to returned Promise</td>
      <td>function</td>
    </tr>
  </tbody>
</table>

<br />

### Example

<br />

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

<br />

# Fetch vs Axios

There is no differen what HTTP client you use. Package have one important rule - HTTP client must accept [AbortController signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal).

```javascript
function makeFetchRequest(controller) {
  return fetch("YOUR_ENDPOINT", { signal: controller.signal })
}

function makeAxiosRequest(controller) {
  return axios.get("YOUR_ENDPOINT", { signal: controller.signal })
}
```

<br />

# Best practices (WIP)

Cancel multiple similar request via one AbortController. Each helper can take ```controller``` parameter.

```javascript
import { cancelable } from 'react-cancelable'

const controller = new AbortController()

function makeRequest(controller) {
  return fetch("YOUR_ENDPOINT", { signal: controller.signal })
}

// Make requests
new Array(100).fill(0).forEach(() => { cancelable(makeRequest, controller) } )

setTimeout(() => {
  // Stop all pending requests
  controller.abort()
}, 1000)
```
