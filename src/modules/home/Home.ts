import { connect } from 'react-redux'

import { Home } from './HomeView'

import {
  IState
} from '../../common/interfaces'
import { changeView } from '../main/Main'

export const HomeContainer = connect(
  (state: IState) => ({}),
  {
    addDevice: () => changeView('/devices/add'),
    showDevices: () => changeView('/devices')
  }
)(Home)
