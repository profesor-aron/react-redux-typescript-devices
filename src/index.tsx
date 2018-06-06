import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {
  HashRouter as Router,
  Link,
  Route
} from 'react-router-dom'
import {
  Icon,
  Menu,
} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

import { DevicesList } from './devices/list/DevicesList'

const routes = [
  {
    exact: true,
    main: () => <h2>Home</h2>,
    path: '/'
  },
  {
    main: () => <DevicesList/>,
    path: '/devices/list'
  },
  {
    main: () => <h2>Shoelaces</h2>,
    path: '/devices/form'
  }
]

const App = () => (
  <Router>
    <div>
      <Menu>
        <Menu.Item
          name='home'
          href='#/'
          active={true}
        >
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item
          name='devices'
          href='#/devices/list'
        >
          <Icon name='server' />
          Devices
        </Menu.Item>
      </Menu>
      <div>
        {
          routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))
        }
      </div>
    </div>
  </Router>
)

/*
const store = createStore(counterReduce)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
*/

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
