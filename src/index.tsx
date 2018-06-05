import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { DevicesList } from './devices/list/DevicesList'

import {
  HashRouter as Router,
  Link,
  Route
} from 'react-router-dom'

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
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/devices/list'>Devices list</Link>
          </li>
          <li>
            <Link to='/devices/form'>Device form</Link>
          </li>
        </ul>
      </div>

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
