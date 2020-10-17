import '@babel/polyfill'

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'


import allReducers from './reducers'
import App from './App'

const store = createStore(allReducers)

const rootElement = document.getElementById('app')

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  render(
      <Provider store={store}>
        <App />
      </Provider>,
    rootElement
  )
}
