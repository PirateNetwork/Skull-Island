// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import '@babel/polyfill'

import {
  SET_ACTIVE_PASSWORD,
  SET_ADDRESS,
  SET_PRIVATE_KEY,
  SET_HEIGHT,
  SET_SYNCED_BLOCKS,
  SET_REFRESH_SECONDS_REMAINING,
  SET_SYNCED,
  SET_BALANCE,
  SET_DIMENSIONS,
  SET_IN_BTC_VALUE,
  SET_IN_CURRENCY_VALUE,
  SET_QR_SCANNING,
  SET_SAVING,
  SET_WALLET_INUSE,
  SET_WALLET_LOADED,
  SET_REFRESH_ADDRESS,
  SET_TADDRESSES,
  SET_ZADDRESSES,
  SET_TX,
  SET_TX_LIST,
  SET_VIEWING_TX,
  SET_MENU_READY,
  SET_ADDRESS_SCANNING

} from '../actions/Context'

const initialContext = {
  activePassword: '',
  address: '',
  privateKey: '',
  height: 0,
  syncedBlocks: 0,
  setRefreshSecondsRemaining: 0,
  synced: false,
  balance: 0,
  dimensions: {"height" : window.outerHeight, "width" : window.outerWidth},
  BTCValue: 0,
  currencyValue: 0,
  qrScanning: false,
  addrScanning: false,
  saving: false,
  walletInUse: false,
  walletLoaded: false,
  refreshAddresses: false,
  zAddresses: [],
  tAddresses: [],
  tx: null,
  txList: null,
  viewingTx: false,
  menuReady: false
}

export default function ContextReducer (state = initialContext, action) {
  switch (action.type) {

    case SET_ACTIVE_PASSWORD:
      return Object.assign({}, state, {
        activePassword: action.activePassword
      })

    case SET_ADDRESS:
      return Object.assign({}, state, {
        address: action.address
      })

    case SET_PRIVATE_KEY:
      return Object.assign({}, state, {
        privateKey: action.privateKey
      })

    case SET_HEIGHT:
      return Object.assign({}, state, {
        height: action.height
      })

    case SET_SYNCED_BLOCKS:
      return Object.assign({}, state, {
        syncedBlocks: action.syncedBlocks
      })

    case SET_REFRESH_SECONDS_REMAINING:
      return Object.assign({}, state, {
        refreshSecondsRemaining: action.refreshSecondsRemaining
      })

    case SET_SYNCED:
      return Object.assign({}, state, {
        synced: action.synced
      })

    case SET_BALANCE:
      return Object.assign({}, state, {
        balance: action.balance
      })

    case SET_DIMENSIONS:
      return Object.assign({}, state, {
        dimensions: action.dimensions
      })

    case SET_IN_BTC_VALUE:
      return Object.assign({}, state, {
        BTCValue: action.BTCValue
      })

    case SET_IN_CURRENCY_VALUE:
      return Object.assign({}, state, {
        currencyValue: action.currencyValue
      })

    case SET_QR_SCANNING:
      return Object.assign({}, state, {
        qrScanning: action.qrScanning
      })

    case SET_ADDRESS_SCANNING:
      return Object.assign({}, state, {
        addrScanning: action.addrScanning
      })

    case SET_SAVING:
      return Object.assign({}, state, {
        saving: action.saving
      })

    case SET_WALLET_INUSE:
      return Object.assign({}, state, {
        walletInUse: action.walletInUse
      })

    case SET_WALLET_LOADED:
      return Object.assign({}, state, {
        walletLoaded: action.walletLoaded
      })

    case SET_REFRESH_ADDRESS:
      return Object.assign({}, state, {
        refreshAddresses: action.refreshAddresses
      })

    case SET_TADDRESSES:
      return Object.assign({}, state, {
        tAddresses: action.tAddresses
      })

    case SET_ZADDRESSES:
      return Object.assign({}, state, {
        zAddresses: action.zAddresses
      })

    case SET_TX:
      return Object.assign({}, state, {
        tx: action.tx
      })

    case SET_TX_LIST:
      return Object.assign({}, state, {
        txList: action.txList
      })

    case SET_VIEWING_TX:
      return Object.assign({}, state, {
        viewingTx: action.viewingTx
      })

    case SET_MENU_READY:
      return Object.assign({}, state, {
        menuReady: action.menuReady
      })

    default:
      return state
  }
}
