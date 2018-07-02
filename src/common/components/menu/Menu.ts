import { connect } from 'react-redux'

import { MenuView } from './MenuView'
import { IState } from '../../../common/interfaces'
import { changeView } from '../../../modules/main/Main'

export const MenuViewContainer = connect(
  (state: IState) => ({}),
  {
    changeView: (route: string) => changeView(route)
  }
)(MenuView)
