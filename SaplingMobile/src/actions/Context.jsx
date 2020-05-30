export const SET_ACTIVE_TYPE = 'SET_CURRENT_ACTIVE_TYPE'
export const SET_ACTIVE_PASSWORD = 'SET_CURRENT_ACTIVE_PASSWORD'
export const SET_T_ADDRESS = 'SET_CURRENT_T_ADDRESS'
export const SET_T_PRIVATE_KEY = 'SET_CURRENT_T_PRIVATE_KEY'
export const SET_T_BALANCE = 'SET_CURRENT_T_BALANCE'
export const SET_Z_ADDRESS = 'SET_CURRENT_Z_ADDRESS'
export const SET_Z_PRIVATE_KEY = 'SET_CURRENT_Z_PRIVATE_KEY'
export const SET_Z_HEIGHT = 'SET_CURRENT_Z_HEIGHT'
export const SET_Z_SYNCED = 'SET_CURRENT_Z_SYNCED'
export const SET_Z_BALANCE = 'SET_CURRENT_Z_BALANCE'
export const SET_SAPLING_OUTPUT_VERIFIED = 'SET_CURRENT_SAPLING_OUTPUT_VERIFIED'
export const SET_SAPLING_SPEND_VERIFIED = 'SET_CURRENT_SAPLING_SPEND_VERIFIED'
export const SET_DIMENSIONS = 'SET_CURRENT_DIMENSIONS'
export const SET_ZER_IN_BTC_VALUE = 'SET_ZER_IN_BTC_VALUE'
export const SET_ZER_IN_CURRENCY_VALUE = 'SET_ZER_IN_CURRENCY_VALUE'
export const SET_DB = 'SET_CURRENT_DB'
export const SET_REINDEX = 'SET_CURRENT_REINDEX'
export const SET_QR_SCANNING = 'SET_QR_SCANNING'


export function setActiveType (activeType) {
  return {
    type: SET_ACTIVE_TYPE,
    activeType
  }
}

export function setActivePassword (activePassword) {
  return {
    type: SET_ACTIVE_PASSWORD,
    activePassword
  }
}

export function setTAddress (tAddress) {
  return {
    type: SET_T_ADDRESS,
    tAddress
  }
}

export function setTPrivateKey (tPrivateKey) {
  return {
    type: SET_T_PRIVATE_KEY,
    tPrivateKey
  }
}

export function setTBalance (tBalance) {
  return {
    type: SET_T_BALANCE,
    tBalance
  }
}

export function setZAddress (zAddress) {
  return {
    type: SET_Z_ADDRESS,
    zAddress
  }
}

export function setZPrivateKey (zPrivateKey) {
  return {
    type: SET_Z_PRIVATE_KEY,
    zPrivateKey
  }
}

export function setZHeight(zHeight) {
  return {
    type: SET_Z_HEIGHT,
    zHeight
  }
}

export function setZSynced(zSynced) {
  return {
    type: SET_Z_SYNCED,
    zSynced
  }
}

export function setZBalance (zBalance) {
  return {
    type: SET_Z_BALANCE,
    zBalance
  }
}

export function setSaplingOutputVerified (saplingoutputverified) {
  return {
    type: SET_SAPLING_OUTPUT_VERIFIED,
    saplingoutputverified
  }
}

export function setSaplingSpendVerified (saplingspendverified) {
  return {
    type: SET_SAPLING_SPEND_VERIFIED,
    saplingspendverified
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

export function setDB (db) {
  return {
    type: SET_DB,
    db
  }
}

export function setReindex (reindex) {
  return {
    type: SET_REINDEX,
    reindex
  }
}

// export function setCurrentCoin (currentCoin) {
//   return {
//     type: SET_CURRENT_COIN,
//     currentCoin
//   }
// }

export function setQrScanning (qrScanning) {
  return {
    type: SET_QR_SCANNING,
    qrScanning
  }
}
