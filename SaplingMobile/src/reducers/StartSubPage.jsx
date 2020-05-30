// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import '@babel/polyfill'

import {
  SET_SUB_PAGE_MAIN,
  SET_SUB_PAGE_LOGIN,
  SET_SUB_PAGE_WALLET,
  SET_SUB_PAGE_PASSWORD,
  SET_SUB_PAGE_PARAMS,
} from '../actions/StartupSubPage'

const initialStartupSubPage= {
  mainPage: false,
  loginPage: false,
  walletPage: false,
  passwordPage: false,
  paramsPage: false,
}

export default function StartupSubPageReducer (state = initialStartupSubPage, action) {
  switch (action.type) {
    case SET_SUB_PAGE_MAIN:
      return Object.assign({}, state, {
        mainPage: action.mainPage
      })

    case SET_SUB_PAGE_LOGIN:
      return Object.assign({}, state, {
        loginPage: action.loginPage
      })

    case SET_SUB_PAGE_WALLET:
      return Object.assign({}, state, {
        walletPage: action.walletPage
      })

    case SET_SUB_PAGE_PASSWORD:
      return Object.assign({}, state, {
        passwordPage: action.passwordPage
      })

    case SET_SUB_PAGE_PARAMS:
      return Object.assign({}, state, {
        paramsPage: action.paramsPage
      })

    default:
      return state
  }
}
