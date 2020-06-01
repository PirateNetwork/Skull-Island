export const SET_SEND_TO_ADDRESS = 'SET_SEND_TO_ADDRESS'
export const SET_SEND_TO_AMOUNT = 'SET_SEND_TO_AMOUNT'
export const SET_SEND_TO_FIAT = 'SET_SEND_TO_FIAT'
export const SET_SEND_TO_MEMO = 'SET_SEND_TO_MEMO'



export function setSendToAddress (address) {
  return {
    type: SET_SEND_TO_ADDRESS,
    address
  }
}

export function setSendToAmount (amount) {
  return {
    type: SET_SEND_TO_AMOUNT,
    amount
  }
}

export function setSendToFiat (fiat) {
  return {
    type: SET_SEND_TO_FIAT,
    fiat
  }
}

export function setSendToMemo (memo) {
  return {
    type: SET_SEND_TO_MEMO,
    memo
  }
}
