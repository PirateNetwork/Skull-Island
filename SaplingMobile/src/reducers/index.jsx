import { combineReducers } from 'redux'

import SecretsReducer from './Secrets'
import SettingsReducer from './Settings'
import ContextReducer from './Context'
import ContactsReducer from './Contacts'
import MainSubPageReducer from './MainSubPage'
import SendToReducer from './SendTo'

const allReducers = combineReducers({
  secrets: SecretsReducer,
  settings: SettingsReducer,
  context: ContextReducer,
  contacts: ContactsReducer,
  mainSubPage: MainSubPageReducer,
  sendTo: SendToReducer
})

export default allReducers
