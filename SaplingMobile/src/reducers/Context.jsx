// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import '@babel/polyfill'

import {
  SET_ACTIVE_TYPE,
  SET_ACTIVE_PASSWORD,
  SET_T_ADDRESS,
  SET_T_PRIVATE_KEY,
  SET_T_BALANCE,
  SET_Z_ADDRESS,
  SET_Z_PRIVATE_KEY,
  SET_Z_HEIGHT,
  SET_Z_SYNCED,
  SET_Z_BALANCE,
  SET_SAPLING_SPEND_VERIFIED,
  SET_SAPLING_OUTPUT_VERIFIED,
  SET_DIMENSIONS,
  SET_ZER_IN_BTC_VALUE,
  SET_ZER_IN_CURRENCY_VALUE,
  SET_DB,
  SET_REINDEX,
  SET_QR_SCANNING,
  SET_INSIGHT_SOCKET,

} from '../actions/Context'

const initialContext = {
  activeType: 'Z',
  activePassword: '',
  tAddress: '',
  tPrivateKey: '',
  tBalance: 0,
  zAddress: '',
  zPrivateKey: '',
  zHeight: 0,
  zSynced: false,
  zBalance: 0,
  saplingspend: null,
  saplingoutput: null,
  saplingspendverified: false,
  saplingoutputverified: false,
  dimensions: {"height" : window.outerHeight, "width" : window.outerWidth},
  BTCValue: 0,
  currencyValue: 0,
  db: null,
  reindex: 0,
  qrScanning: false,
  insightSocket: false,
}

export default function ContextReducer (state = initialContext, action) {
  switch (action.type) {
    case SET_ACTIVE_TYPE:
      return Object.assign({}, state, {
        activeType: action.activeType
      })

    case SET_ACTIVE_PASSWORD:
      return Object.assign({}, state, {
        activePassword: action.activePassword
      })

    case SET_T_ADDRESS:
      return Object.assign({}, state, {
        tAddress: action.tAddress
      })

    case SET_T_PRIVATE_KEY:
      return Object.assign({}, state, {
        tPrivateKey: action.tPrivateKey
      })

    case SET_T_BALANCE:
      return Object.assign({}, state, {
        tBalance: action.tBalance
      })

    case SET_Z_ADDRESS:
      return Object.assign({}, state, {
        zAddress: action.zAddress
      })

    case SET_Z_PRIVATE_KEY:
      return Object.assign({}, state, {
        zPrivateKey: action.zPrivateKey
      })

    case SET_Z_HEIGHT:
      return Object.assign({}, state, {
        zHeight: action.zHeight
      })

    case SET_Z_SYNCED:
      return Object.assign({}, state, {
        zSynced: action.zSynced
      })

    case SET_Z_BALANCE:
      return Object.assign({}, state, {
        zBalance: action.zBalance
      })

    case SET_SAPLING_OUTPUT_VERIFIED:
      return Object.assign({}, state, {
        saplingoutputverified: action.saplingoutputverified
      })

    case SET_SAPLING_SPEND_VERIFIED:
      return Object.assign({}, state, {
        saplingspendverified: action.saplingspendverified
      })

    case SET_DIMENSIONS:
      return Object.assign({}, state, {
        dimensions: action.dimensions
      })

    case SET_ZER_IN_BTC_VALUE:
      return Object.assign({}, state, {
        BTCValue: action.BTCValue
      })

    case SET_ZER_IN_CURRENCY_VALUE:
      return Object.assign({}, state, {
        currencyValue: action.currencyValue
      })

    case SET_DB:
      return Object.assign({}, state, {
        db: action.db
      })

    case SET_REINDEX:
      return Object.assign({}, state, {
        reindex: action.reindex
      })

    case SET_QR_SCANNING:
      return Object.assign({}, state, {
        qrScanning: action.qrScanning
      })

    case SET_INSIGHT_SOCKET:
      return Object.assign({}, state, {
        insightSocket: action.insightSocket
      })

    default:
      return state
  }
}
