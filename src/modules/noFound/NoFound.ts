import { connect } from 'react-redux'

import { NoFound } from './NoFoundView'

import {
  IState
} from '../../common/interfaces'
import { changeView } from '../main/Main'

export const NoFoundContainer = connect(
  (state: IState) => ({}),
  {
    changeView: (route: string) => changeView(route)
  }
)(NoFound)
