import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { setLocale } from 'react-redux-i18n'
import { ThunkDispatch } from 'redux-thunk'

import { MenuView } from './MenuView'
import { IState } from '../../../common/interfaces'
import { changeView } from '../../../modules/main/Main'

export function changeLocale(locale: string) {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
    dispatch(setLocale(locale))
  }
}

export const MenuViewContainer = connect(
  (state: IState) => ({}),
  {
    changeLocale: (locale: string) => changeLocale(locale),
    changeView: (route: string) => changeView(route)
  }
)(MenuView)
