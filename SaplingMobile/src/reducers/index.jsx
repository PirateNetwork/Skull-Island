import { combineReducers } from 'redux'

import SecretsReducer from './Secrets'
import SettingsReducer from './Settings'
import ContextReducer from './Context'
import ContactsReducer from './Contacts'
import MainSubPageReducer from './MainSubPage'

const allReducers = combineReducers({
  secrets: SecretsReducer,
  settings: SettingsReducer,
  context: ContextReducer,
  contacts: ContactsReducer,
  mainSubPage: MainSubPageReducer
})

export default allReducers
