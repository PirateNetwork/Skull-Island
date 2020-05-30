// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import '@babel/polyfill'

import {
  SET_SUB_PAGE_ZMAIN,
  SET_SUB_PAGE_TMAIN,
  SET_SUB_PAGE_SEND,
  SET_SUB_PAGE_RECEIVE,
  SET_SUB_PAGE_PRIVATE_KEY,
  SET_SUB_PAGE_PASSPHRASE,
  SET_SUB_PAGE_REINDEX,
} from '../actions/MainSubPage'

const initialMainSubPage= {
  zmainPage: 'visible',
  tmainPage: 'none',
  sendPage: 'none',
  receivePage: 'none',
  privateKeyPage: 'none',
  passPhrasePage: 'none',
  reindexPage: 'none'
}

export default function MainSubPageReducer (state = initialMainSubPage, action) {
  switch (action.type) {
    case SET_SUB_PAGE_ZMAIN:
      return Object.assign({}, state, {
        zmainPage: action.zmainPage
      })

    case SET_SUB_PAGE_TMAIN:
      return Object.assign({}, state, {
        tmainPage: action.tmainPage
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


    default:
      return state
  }
}
