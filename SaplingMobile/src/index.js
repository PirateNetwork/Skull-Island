import '@babel/polyfill'

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import ons from 'onsenui'

import allReducers from './reducers'
import App from './App'


import { ZERO_MOBILE_SAVE_PATH, writeToFile } from './utils/persistentStorage'

const store = createStore(allReducers)

// Save file, etc
store.subscribe(() => {
  const state = store.getState()

  if (state.secrets.secretPhrase !== null && state.settings.password !== null && state.settings.saveData === true) {
    // Write to file
    writeToFile(ZERO_MOBILE_SAVE_PATH, {
      secretPhrase: state.secrets.secretPhrase,
      settings: state.settings
    })
  }

})

const rootElement = document.getElementById('app')

ons.ready(() => {
  ons.disableDeviceBackButtonHandler()
  document.addEventListener('backbutton', function () {
    if (confirm("Exit App?")) {
      navigator.app.exitApp()
    }
  }, false)
  render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    rootElement
  )
})

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default
      render(
        <AppContainer>
          <Provider store={store}>
            <NextApp />
          </Provider>
        </AppContainer>,
        rootElement
      )
    })
  }
