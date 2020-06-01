export const SET_SUB_PAGE_MAIN = 'SET_CURRENT_SUB_PAGE_MAIN'
export const SET_SUB_PAGE_LOGIN = 'SET_CURRENT_SUB_PAGE_LOGIN'
export const SET_SUB_PAGE_WALLET = 'SET_CURRENT_SUB_PAGE_WALLET'
export const SET_SUB_PAGE_PASSWORD = 'SET_CURRENT_SUB_PAGE_PASSWORD'
export const SET_SUB_PAGE_PARAMS = 'SET_CURRENT_SUB_PAGE_PARAMS'

export function setMainPage (mainPage) {
  return {
    type: SET_SUB_PAGE_MAIN,
    mainPage
  }
}

export function setLoginPage (loginPage) {
  return {
    type: SET_SUB_PAGE_LOGIN,
    loginPage
  }
}

export function setWalletPage (walletPage) {
  return {
    type: SET_SUB_PAGE_WALLET,
    walletPage
  }
}

export function setPasswordPage (passwordPage) {
  return {
    type: SET_SUB_PAGE_PASSWORD,
    passwordPage
  }
}

export function setParamsPage (paramsPage) {
  return {
    type: SET_SUB_PAGE_PARAMS,
    paramsPage
  }
}
