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

import './common/services/MockServerAPI'

import { devicesReduce } from './modules/devices/list/DevicesList'
import {
  MainViewContainer,
  viewReduce
} from './modules/main/Main'
import { MenuViewContainer } from './common/components/menu/Menu'
import { deviceFormReduce } from './modules/devices/form/DeviceForm'
import { Router } from './router'

export const rootReducer = combineReducers({
  deviceForm: deviceFormReduce,
  devices: devicesReduce,
  view: viewReduce
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

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
