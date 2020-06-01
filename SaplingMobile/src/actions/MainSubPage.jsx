export const SET_SUB_PAGE_ZMAIN = 'SET_CURRENT_SUB_PAGE_ZMAIN'
export const SET_SUB_PAGE_TMAIN = 'SET_CURRENT_SUB_PAGE_TMAIN'
export const SET_SUB_PAGE_SEND = 'SET_CURRENT_SUB_PAGE_SEND'
export const SET_SUB_PAGE_RECEIVE = 'SET_CURRENT_SUB_PAGE_RECEIVE'
export const SET_SUB_PAGE_PRIVATE_KEY = 'SET_CURRENT_SUB_PAGE_PRIVATE_KEY'
export const SET_SUB_PAGE_PASSPHRASE = 'SET_CURRENT_SUB_PAGE_PASSPHRASE'
export const SET_SUB_PAGE_REINDEX = 'SET_CURRENT_SUB_PAGE_REINDEX'
export const SET_SUB_PAGE_GRAPH_OPEN = 'SET_CURRENT_SUB_PAGE_GRAPH_OPEN'
export const SET_SUB_PAGE_TRANSACTION_SCOLL = 'SET_CURRENT_SUB_PAGE_TRANSACTION_SCOLL'
export const SET_SUB_PAGE_TRANSACTION_SCOLL_POS = 'SET_CURRENT_SUB_PAGE_TRANSACTION_SCOLL_POS'

export function setZMainPage (zmainPage) {
  return {
    type: SET_SUB_PAGE_ZMAIN,
    zmainPage
  }
}

export function setTMainPage (tmainPage) {
  return {
    type: SET_SUB_PAGE_TMAIN,
    tmainPage
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

export function setGraphOpen (graphOpen) {
  return {
    type: SET_SUB_PAGE_GRAPH_OPEN,
    graphOpen
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
