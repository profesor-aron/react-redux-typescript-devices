import { connect } from 'react-redux'
import {
  Dispatch,
  AnyAction
} from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ActionTypes } from '../../common/actionTypes'
import {
  IState,
  IView,
  IViewAction,
  IThunkResult
} from '../../common/interfaces'
import { MainView } from './MainView'
import { Router } from '../../router'
import { devicesItemsFetchData } from '../devices/list/DevicesList'
import { clearDeviceForm } from '../devices/form/DeviceForm'

export function viewNameUpdate(name: string) {
  return { type: ActionTypes.VIEW_UPDATE, payload: name }
}

export function showHome() {
  return (dispatch: Dispatch) => {
    dispatch(viewNameUpdate('home'))
  }
}

export function showDevices() {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
    dispatch(devicesItemsFetchData('/devices'))
    dispatch(viewNameUpdate('devicesList'))
  }
}

export function showAddDeviceForm() {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
    dispatch(clearDeviceForm())
    dispatch(viewNameUpdate('devicesForm'))
  }
}

export function showEditDeviceForm() {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
    dispatch(viewNameUpdate('devicesForm'))
  }
}

export function showNoFound() {
  return (dispatch: Dispatch) => {
    dispatch(viewNameUpdate('noFound'))
  }
}

const initialStateView: IView = {
  name: 'home'
}

export function viewReduce(state = initialStateView, action: IViewAction) {
  switch (action.type) {
    case ActionTypes.VIEW_UPDATE:
      return {
        ...state,
        name: action.payload
      }
    default:
      return state
  }
}

export function changeView(route: string): IThunkResult<void> {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
    Router.changeView(route)
  }
}

export const getViewName = (state: IState) => {
  return state.view.name
}

export const MainViewContainer = connect(
  (state: IState) => ({
    viewName: getViewName(state)
  })
)(MainView)
