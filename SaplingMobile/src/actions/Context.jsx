export const SET_HAS_EXISTING_WALLET = 'SET_CURRENT_HAS_EXISTING_WALLET'
export const SET_ACTIVE_PASSWORD = 'SET_CURRENT_ACTIVE_PASSWORD'
export const SET_ADDRESS = 'SET_CURRENT_ADDRESS'
export const SET_PRIVATE_KEY = 'SET_CURRENT_PRIVATE_KEY'
export const SET_HEIGHT = 'SET_CURRENT_HEIGHT'
export const SET_SYNCED_BLOCKS = 'SET_CURRENT_SYNCED_BLOCKS'
export const SET_REFRESH_SECONDS_REMAINING = 'SET_CURRENT_REFRESH_SECONDS_REMINAING'
export const SET_SYNCED = 'SET_CURRENT_SYNCED'
export const SET_BALANCE = 'SET_CURRENT_BALANCE'
export const SET_DIMENSIONS_HEIGHT = 'SET_CURRENT_DIMENSIONS_HEIGHT'
export const SET_DIMENSIONS_WIDTH = 'SET_CURRENT_DIMENSIONS_WIDTH'
export const SET_DIMENSIONS_TOP = 'SET_CURRENT_DIMENSIONS_TOP'
export const SET_DIMENSIONS_BOTTOM = 'SET_CURRENT_DIMENSIONS_BOTTOM'
export const SET_IN_BTC_VALUE = 'SET_IN_BTC_VALUE'
export const SET_IN_CURRENCY_VALUE = 'SET_IN_CURRENCY_VALUE'
export const SET_QR_SCANNING = 'SET_QR_SCANNING'
export const SET_SAVING = 'SET_CURRENT_SAVING'
export const SET_WALLET_INUSE = 'SET_CURRENT_WALLET_INUSE'
export const SET_WALLET_LOADED = 'SET_CURRENT_WALLET_LOADED'
export const SET_REFRESH_ADDRESS = 'SET_CURRENT_REFRESH_ADDRESS'
export const SET_TADDRESSES = 'SET_CURRENT_TADDRESSES'
export const SET_ZADDRESSES = 'SET_CURRENT_ZADDRESSES'
export const SET_TX = 'SET_CURRENT_TX'
export const SET_TX_LIST = 'SET_CURRENT_TX_LIST'
export const SET_VIEWING_TX = 'SET_CURRENT_VIEWING_TX'
export const SET_MENU_READY = 'SET_CURRENT_MENU_READY'
export const SET_ADDRESS_SCANNING = 'SET_CURRENT_ADDRESS_SCANNING'
export const SET_ACTIVE_SERVER = 'SET_CURRENT_ACTIVE_SERVER'
export const SET_USER_SERVERS = 'SET_CURRENT_USER_SERVERS'
export const SET_PRIMARY_SERVERS = 'SET_CURRENT_PRIMARY_SERVERS'
export const SET_BACKUP_SERVERS = 'SET_CURRENT_BACKUP_SERVERS'
export const SET_DISCONNECTED = 'SET_CURRENT_DISCONNECTED'

export function setHasExistingWallet (hasExistingWallet) {
  return {
    type: SET_HAS_EXISTING_WALLET,
    hasExistingWallet
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

export function setRefreshSecondsRemaining(refreshSecondsRemaining) {
  return {
    type: SET_REFRESH_SECONDS_REMAINING,
    refreshSecondsRemaining
  }
}

export function setSyncedBlocks(syncedBlocks) {
  return {
    type: SET_SYNCED_BLOCKS,
    syncedBlocks
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

export function setDimensionsHeight (dimensionsHeight) {
  return {
    type: SET_DIMENSIONS_HEIGHT,
    dimensionsHeight
  }
}

export function setDimensionsWidth (dimensionsWidth) {
  return {
    type: SET_DIMENSIONS_WIDTH,
    dimensionsWidth
  }
}

export function setDimensionsTop (dimensionsTop) {
  return {
    type: SET_DIMENSIONS_TOP,
    dimensionsTop
  }
}

export function setDimensionsBottom (dimensionsBottom) {
  return {
    type: SET_DIMENSIONS_BOTTOM,
    dimensionsBottom
  }
}

export function setZerInBtcValue (BTCValue) {
  return {
    type: SET_IN_BTC_VALUE,
    BTCValue
  }
}

export function setZerInCurrencyValue (currencyValue) {
  return {
    type: SET_IN_CURRENCY_VALUE,
    currencyValue
  }
}

export function setQrScanning (qrScanning) {
  return {
    type: SET_QR_SCANNING,
    qrScanning
  }
}

export function setAddressScanning (addrScanning) {
  return {
    type: SET_ADDRESS_SCANNING,
    addrScanning
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

export function setTxList (txList) {
  return {
    type: SET_TX_LIST,
    txList
  }
}

export function setViewingTx (viewingTx) {
  return {
    type: SET_VIEWING_TX,
    viewingTx
  }
}

export function setMenuReady (menuReady) {
  return {
    type: SET_MENU_READY,
    menuReady
  }
}

export function setActiveServer (activeServer) {
  return {
    type: SET_ACTIVE_SERVER,
    activeServer
  }
}

export function setUserServers (userServers) {
  return {
    type: SET_USER_SERVERS,
    userServers
  }
}

export function setPrimaryServers (primaryServers) {
  return {
    type: SET_PRIMARY_SERVERS,
    primaryServers
  }
}

export function setBackupServers (backupServers) {
  return {
    type: SET_BACKUP_SERVERS,
    backupServers
  }
}

export function setDisconnected (disconnected) {
  return {
    type: SET_DISCONNECTED,
    disconnected
  }
}
