export const SET_SEED_PHRASE = 'SET_SEED_PHRASE'
export const SET_BIRTHDAY = 'SET_BIRTHDAY'

export function setSeedPhrase (seedPhrase) {
  return {
    type: SET_SEED_PHRASE,
    seedPhrase
  }
}

export function setBirthday (birthday) {
  return {
    type: SET_BIRTHDAY,
    birthday
  }
}
