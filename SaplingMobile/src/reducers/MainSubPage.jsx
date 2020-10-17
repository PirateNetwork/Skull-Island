// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import '@babel/polyfill'

import {
  SET_SUB_PAGE_MAIN,
  SET_SUB_PAGE_SEND,
  SET_SUB_PAGE_RECEIVE,
  SET_SUB_PAGE_PRIVATE_KEY,
  SET_SUB_PAGE_PASSPHRASE,
  SET_SUB_PAGE_REINDEX,
  SET_SUB_PAGE_GRAPH_OPEN,
  SET_SUB_PAGE_TRANSACTION_SCOLL,
  SET_SUB_PAGE_TRANSACTION_SCOLL_POS,

} from '../actions/MainSubPage'

export const GraphOpenPos = 0.0
export const GraphClosedPos = 0.235

const initialMainSubPage= {
  mainPage: 'visible',
  sendPage: 'none',
  receivePage: 'none',
  privateKeyPage: 'none',
  passPhrasePage: 'none',
  reindexPage: 'none',
  graphOpen: true,
  transactionScroll: false,
  transactionScrollPos: 0,
}

export default function MainSubPageReducer (state = initialMainSubPage, action) {
  switch (action.type) {
    case SET_SUB_PAGE_MAIN:
      return Object.assign({}, state, {
        mainPage: action.mainPage
      })

    case SET_SUB_PAGE_SEND:
      return Object.assign({}, state, {
        sendPage: action.sendPage
      })

    case SET_SUB_PAGE_RECEIVE:
      return Object.assign({}, state, {
        receivePage: action.receivePage
      })

    case SET_SUB_PAGE_PRIVATE_KEY:
      return Object.assign({}, state, {
        privateKeyPage: action.privateKeyPage
      })

    case SET_SUB_PAGE_PASSPHRASE:
      return Object.assign({}, state, {
        passPhrasePage: action.passPhrasePage
      })

    case SET_SUB_PAGE_REINDEX:
      return Object.assign({}, state, {
        reindexPage: action.reindexPage
      })

    case SET_SUB_PAGE_GRAPH_OPEN:
      return Object.assign({}, state, {
        graphOpen: action.graphOpen
      })

    case SET_SUB_PAGE_TRANSACTION_SCOLL:
      return Object.assign({}, state, {
        transactionScroll: action.transactionScroll
      })

    case SET_SUB_PAGE_TRANSACTION_SCOLL_POS:
      return Object.assign({}, state, {
        transactionScrollPos: action.transactionScrollPos
      })

    default:
      return state
  }
}
