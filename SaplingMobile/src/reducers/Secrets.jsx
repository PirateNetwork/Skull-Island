// Object.assign({}) doesn't work on all versions of android
// Need to include polyfill
import '@babel/polyfill'

import {
  SET_SEED_PHRASE,
  SET_BIRTHDAY
} from '../actions/Secrets'

/*
 * item objects are of type
 * [
 *    {
 *       address: 'address',
 *       privateKey: 'private key'
 *    }
 * ]
 */

const initialSecrets = {
  seedPhrase: '',
  birthday: 0,
}

export default function SecretsReducer (state = initialSecrets, action) {
  switch (action.type) {

    case SET_BIRTHDAY:
          return Object.assign({}, state, {
            birthday: action.birthday
          })

    case SET_SEED_PHRASE:
      return Object.assign({}, state, {
        seedPhrase: action.seedPhrase
      })

    default:
      return state
  }
}
