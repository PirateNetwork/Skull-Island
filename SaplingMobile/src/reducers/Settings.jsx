// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import '@babel/polyfill'

import {
  LANG_ENGLISH,
  CURRENCY_USD,
  SET_LANGUAGE,
  SET_CURRENCY,
  SET_WALLET_PASSWORD,
  SET_WALLET_PASSPHRASE,
  SET_INSIGHT_EXPLORER,
  SET_SAVE_DATA,
  SET_CURRENT_COIN,
  SET_MINIMUM_BLOCK,
  SET_DISPLAY_DIMENSIONS
} from '../actions/Settings'

import { coins } from '../utils/coins.js'

const initialSettings = {
  currentCoin: 'pirate',
  explorerURL: coins['pirate'].explorer[0],
  language: LANG_ENGLISH,
  currency: CURRENCY_USD,
  minimumBlock:  {
    pirate: 0,
    },
  password: null,
  passPhrase: null,
  saveData: false,
  displayDimensions: {"height" : window.outerHeight, "width" : window.outerWidth},

}

export default function SettingsReducer (state = initialSettings, action) {
  switch (action.type) {
    case SET_WALLET_PASSWORD:
      return Object.assign({}, state, {
        password: action.password
      })

    case SET_WALLET_PASSPHRASE:
      return Object.assign({}, state, {
        passPhrase: action.passPhrase
      })

    case SET_CURRENCY:
      return Object.assign({}, state, {
        currency: action.currency
      })

    case SET_LANGUAGE:
      return Object.assign({}, state, {
        language: action.language
      })

    case SET_INSIGHT_EXPLORER:
      return Object.assign({}, state, {
        explorerURL: action.explorerURL
      })

    case SET_SAVE_DATA:
      return Object.assign({}, state, {
        saveData: action.saveData
      })

    case SET_CURRENT_COIN:
      return Object.assign({}, state, {
        currentCoin: action.currentCoin
      })

    case SET_MINIMUM_BLOCK:
      return Object.assign({}, state, {
        minimumBlock: action.minimumBlock
      })

    case SET_DISPLAY_DIMENSIONS:
      return Object.assign({}, state, {
        displayDimensions: action.displayDimensions
      })

    default:
      return state
  }
}
