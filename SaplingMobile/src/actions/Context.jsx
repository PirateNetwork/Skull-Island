export const SET_FIREBASE = 'SET_CURRENT_FIREBASE'
export const SET_ACTIVE_PASSWORD = 'SET_CURRENT_ACTIVE_PASSWORD'
export const SET_ADDRESS = 'SET_CURRENT_ADDRESS'
export const SET_PRIVATE_KEY = 'SET_CURRENT_PRIVATE_KEY'
export const SET_HEIGHT = 'SET_CURRENT_HEIGHT'
export const SET_SYNCED = 'SET_CURRENT_SYNCED'
export const SET_BALANCE = 'SET_CURRENT_BALANCE'
export const SET_DIMENSIONS = 'SET_CURRENT_DIMENSIONS'
export const SET_ZER_IN_BTC_VALUE = 'SET_ZER_IN_BTC_VALUE'
export const SET_ZER_IN_CURRENCY_VALUE = 'SET_ZER_IN_CURRENCY_VALUE'
export const SET_QR_SCANNING = 'SET_QR_SCANNING'
export const SET_SAVING = 'SET_CURRENT_SAVING'
export const SET_WALLET_INUSE = 'SET_CURRENT_WALLET_INUSE'
export const SET_WALLET_LOADED = 'SET_CURRENT_WALLET_LOADED'
export const SET_REFRESH_ADDRESS = 'SET_CURRENT_REFRESH_ADDRESS'
export const SET_TADDRESSES = 'SET_CURRENT_TADDRESSES'
export const SET_ZADDRESSES = 'SET_CURRENT_ZADDRESSES'
export const SET_TX = 'SET_CURRENT_TX'
export const SET_MENU_READY = 'SET_CURRENT_MENU_READY'

export function setFirebase (firebase) {
  return {
    type: SET_FIREBASE,
    firebase
  }
}

export function setActivePassword (activePassword) {
  return {
    type: SET_ACTIVE_PASSWORD,
    activePassword
  }
}

export function setAddress (address) {
  return {
    type: SET_ADDRESS,
    address
  }
}

export function setPrivateKey (privateKey) {
  return {
    type: SET_PRIVATE_KEY,
    privateKey
  }
}

export function setHeight(height) {
  return {
    type: SET_HEIGHT,
    height
  }
}

export function setSynced(synced) {
  return {
    type: SET_SYNCED,
    synced
  }
}

export function setBalance (balance) {
  return {
    type: SET_BALANCE,
    balance
  }
}

export function setDimensions (dimensions) {
  return {
    type: SET_DIMENSIONS,
    dimensions
  }
}

export function setZerInBtcValue (BTCValue) {
  return {
    type: SET_ZER_IN_BTC_VALUE,
    BTCValue
  }
}

export function setZerInCurrencyValue (currencyValue) {
  return {
    type: SET_ZER_IN_CURRENCY_VALUE,
    currencyValue
  }
}

export function setQrScanning (qrScanning) {
  return {
    type: SET_QR_SCANNING,
    qrScanning
  }
}

export function setSaving (saving) {
  return {
    type: SET_SAVING,
    saving
  }
}

export function setWalletInUse (walletInUse) {
  return {
    type: SET_WALLET_INUSE,
    walletInUse
  }
}

export function setWalletLoaded (walletLoaded) {
  return {
    type: SET_WALLET_LOADED,
    walletLoaded
  }
}

export function setRefreshAddresses (refreshAddresses) {
  return {
    type: SET_REFRESH_ADDRESS,
    refreshAddresses
  }
}

export function setTAddresses (tAddresses) {
  return {
    type: SET_TADDRESSES,
    tAddresses
  }
}

export function setZAddresses (zAddresses) {
  return {
    type: SET_ZADDRESSES,
    zAddresses
  }
}

export function setTx (tx) {
  return {
    type: SET_TX,
    tx
  }
}

export function setMenuReady (menuReady) {
  return {
    type: SET_MENU_READY,
    menuReady
  }
}
