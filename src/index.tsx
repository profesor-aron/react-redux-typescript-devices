import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  i18nReducer,
  loadTranslations,
  setLocale,
  syncTranslationWithStore
} from 'react-redux-i18n'

import './common/services/MockServerAPI'

import { devicesReduce } from './modules/devices/list/DevicesList'
import {
  MainViewContainer,
  viewReduce
} from './modules/main/Main'
import { MenuViewContainer } from './common/components/menu/Menu'
import { deviceFormReduce } from './modules/devices/form/DeviceForm'
import { Router } from './router'
import { translations } from './common/translations'

export const rootReducer = combineReducers({
  deviceForm: deviceFormReduce,
  devices: devicesReduce,
  view: viewReduce,
  i18n: i18nReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translations))
store.dispatch(setLocale('en'))

Router.initialise(store.dispatch)
Router.changeView('/home')

const App = () => {
  return (
    <div>
      <MenuViewContainer />
      <MainViewContainer />
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
