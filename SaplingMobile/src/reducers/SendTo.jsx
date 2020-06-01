// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import '@babel/polyfill'

import {
  SET_SEND_TO_ADDRESS,
  SET_SEND_TO_AMOUNT,
  SET_SEND_TO_FIAT,
  SET_SEND_TO_MEMO,
} from '../actions/SendTo'

const initialContext = {
  address: '',
  amount: 0,
  fiat: 0,
  memo: ''
}

export default function SendToReducer (state = initialContext, action) {
  switch (action.type) {

    case SET_SEND_TO_ADDRESS:
      return Object.assign({}, state, {
        address: action.address
      })

    case SET_SEND_TO_AMOUNT:
      return Object.assign({}, state, {
        amount: action.amount
      })

    case SET_SEND_TO_FIAT:
      return Object.assign({}, state, {
        fiat: action.fiat
      })

    case SET_SEND_TO_MEMO:
      return Object.assign({}, state, {
        memo: action.memo
      })

    default:
      return state
  }
}
