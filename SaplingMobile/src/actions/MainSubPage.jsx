export const SET_SUB_PAGE_MAIN = 'SET_CURRENT_SUB_PAGE_MAIN'
export const SET_SUB_PAGE_SEND = 'SET_CURRENT_SUB_PAGE_SEND'
export const SET_SUB_PAGE_RECEIVE = 'SET_CURRENT_SUB_PAGE_RECEIVE'
export const SET_SUB_PAGE_PRIVATE_KEY = 'SET_CURRENT_SUB_PAGE_PRIVATE_KEY'
export const SET_SUB_PAGE_PASSPHRASE = 'SET_CURRENT_SUB_PAGE_PASSPHRASE'
export const SET_SUB_PAGE_REINDEX = 'SET_CURRENT_SUB_PAGE_REINDEX'
export const SET_SUB_PAGE_TRANSACTION_SCOLL = 'SET_CURRENT_SUB_PAGE_TRANSACTION_SCOLL'
export const SET_SUB_PAGE_TRANSACTION_SCOLL_POS = 'SET_CURRENT_SUB_PAGE_TRANSACTION_SCOLL_POS'
export const SET_SUB_PAGE_ADDRESSLIST = 'SET_CURRENT_SUB_PAGE_ADDRESSLIST'
export const SET_SUB_PAGE_TRANSACTION = 'SET_CURRENT_SUB_PAGE_TRANSACTION'
export const SET_SUB_PAGE_RECONNECT = 'SET_CURRENT_SUB_PAGE_RECONNECT'

export function setMainPage (mainPage) {
  return {
    type: SET_SUB_PAGE_MAIN,
    mainPage
  }
}

export function setSendPage (sendPage) {
  return {
    type: SET_SUB_PAGE_SEND,
    sendPage
  }
}

export function setReceivePage (receivePage) {
  return {
    type: SET_SUB_PAGE_RECEIVE,
    receivePage
  }
}

export function setPrivateKeyPage (privateKeyPage) {
  return {
    type: SET_SUB_PAGE_PRIVATE_KEY,
    privateKeyPage
  }
}

export function setPassPhrasePage (passPhrasePage) {
  return {
    type: SET_SUB_PAGE_PASSPHRASE,
    passPhrasePage
  }
}

export function setReindexPage (reindexPage) {
  return {
    type: SET_SUB_PAGE_REINDEX,
    reindexPage
  }
}

export function setTransactionScroll (transactionScroll) {
  return {
    type: SET_SUB_PAGE_TRANSACTION_SCOLL,
    transactionScroll
  }
}

export function setTransactionScrollPos (transactionScrollPos) {
  return {
    type: SET_SUB_PAGE_TRANSACTION_SCOLL_POS,
    transactionScrollPos
  }
}

export function setAddressList (addressList) {
  return {
    type: SET_SUB_PAGE_ADDRESSLIST,
    addressList
  }
}

export function setTransactionPage (transactionPage) {
  return {
    type: SET_SUB_PAGE_TRANSACTION,
    transactionPage
  }
}

export function setReconnectPage (reconnectPage) {
  return {
    type: SET_SUB_PAGE_RECONNECT,
    reconnectPage
  }
}
