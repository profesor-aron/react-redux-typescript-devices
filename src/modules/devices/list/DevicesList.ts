import { connect, Store } from 'react-redux'
import { Dispatch, Action, AnyAction, ActionCreator } from 'redux'

import { ActionTypes } from '../../../common/actionTypes'
import { Devices } from './DevicesListView'
import { DeviceService } from '../../../common/services/DeviceService'

import {
  IDevice,
  IDevices,
  IState,
  IView,
  IThunkResult,
  IActionBase
} from '../../../common/interfaces'

import { viewNameUpdate, changeView } from '../../../modules/main/Main'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {
  deviceIdUpdate,
  deviceNameUpdate,
  deviceDescriptionUpdate,
  deviceFormIsSaved
} from '../form/DeviceForm'

export interface IDevicesItemsAction extends IActionBase {
  payload: IDevice[]
}

export interface IDevicesHasErroredAction extends IActionBase {
  payload: Error
}

export interface IDevicesIsLoadingAction extends IActionBase {
  payload: boolean
}

export interface IDevicesIsOpenModalAction extends IActionBase {
  payload: boolean
}

export interface IDevicesItemSelectedAction extends IActionBase {
  payload: IDevice | undefined
}

export function devicesHasErrored(err: Error, hasError: boolean) {
  return { type: ActionTypes.DEVICES_HAS_ERRORED, payload: err, error: hasError }
}

export function devicesIsLoading(isLoading: boolean) {
  return { type: ActionTypes.DEVICES_IS_LOADING, payload: isLoading }
}

export function devicesFetchDataSuccess(items: IDevice[]) {
  return { type: ActionTypes.DEVICES_FETCH_DATA_SUCCESS, payload: items }
}

export function devicesItemsFetchData(url: string): IThunkResult<void> {
  return (dispatch: Dispatch) => {
    dispatch(devicesIsLoading(true))
    DeviceService.get(url)
      .then((items) => {
        console.log('devicesItemsFetchData', items)
        dispatch(devicesIsLoading(false))
        dispatch(devicesFetchDataSuccess(items))
      })
      .catch((err) => {
        dispatch(devicesHasErrored(err, true))
      })
  }
}

export function devicesPostData(url: string, data: IDevice) {
  return (dispatch: Dispatch) => {
    dispatch(devicesIsLoading(true))
    DeviceService.post(url, data)
      .then((items) => {
        dispatch(devicesIsLoading(false))
        dispatch(devicesFetchDataSuccess(items))
      })
      .catch((err) => {
        dispatch(devicesHasErrored(err, true))
      })
  }
}

export function showHideConfirmModal(isOpen: boolean) {
  return { type: ActionTypes.DEVICES_SHOW_HIDE_CONFIRM_MODAL, payload: isOpen }
}

export function selectDevice(device: IDevice) {
  return { type: ActionTypes.DEVICES_ITEM_SELECTED, payload: device }
}

export function deleteDevice(device: IDevice) {
  return (dispatch: Dispatch, getState: () => IState) => {
    dispatch(selectDevice(device))
    dispatch(showHideConfirmModal(true))
  }
}

export function addDevice(): IThunkResult<void> {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
    dispatch(deviceFormIsSaved(false))
    dispatch(changeView('/devices/add'))
  }
}

export function editDevice(device: IDevice): IThunkResult<void> {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
    DeviceService.get(`/devices/${device.id}`)
      .then((deviceFound) => {
        dispatch(deviceFormIsSaved(false))
        dispatch(deviceIdUpdate(deviceFound.id))
        dispatch(deviceNameUpdate(deviceFound.name))
        dispatch(deviceDescriptionUpdate(deviceFound.description))
        dispatch(changeView('/devices/edit'))
      })
      .catch((error) => {
        dispatch(devicesHasErrored(error, true))
      })
  }
}

// todo loading by isPending
// todo remove IThunkResult ?
export function devicesDeleteData(): IThunkResult<void> {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>, getState: () => IState) => {
    dispatch(showHideConfirmModal(false))
    const id = getState().devices.itemSelected.id
    console.log('id', id)
    //dispatch(devicesIsLoading(true))
    DeviceService.delete('/devices', {data: id})
      .then((isDeleted) => {
        console.log('isDeleted', isDeleted)
        dispatch(devicesItemsFetchData('/devices'))
        dispatch(selectDevice(undefined))
      })
      .catch((error) => {
        dispatch(devicesHasErrored(error, true))
      })
  }
}

export type IDevicesAction = IDevicesHasErroredAction
  | IDevicesIsLoadingAction
  | IDevicesItemsAction
  | IDevicesIsOpenModalAction
  | IDevicesItemSelectedAction

const initialStateDevices: IDevices = {
  hasErrored: false,
  isLoading: false,
  isOpenModal: false,
  itemSelected: undefined,
  items: []
}

export function devicesReduce(state = initialStateDevices, action: IDevicesAction) {
  switch (action.type) {
    case ActionTypes.DEVICES_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.error
      }
    case ActionTypes.DEVICES_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case ActionTypes.DEVICES_FETCH_DATA_SUCCESS:
      return {
        ...state,
        items: action.payload
      }
    case ActionTypes.DEVICES_SHOW_HIDE_CONFIRM_MODAL:
      return {
        ...state,
        isOpenModal: action.payload
      }
    case ActionTypes.DEVICES_ITEM_SELECTED:
      return {
        ...state,
        itemSelected: action.payload
      }
    default:
      return state
  }
}

export const getDevices = (state: IState) => {
  return state.devices.items
}

export const isOpenModal = (state: IState) => {
  return state.devices.isOpenModal
}

export const getDeviceSelected = (state: IState) => {
  return state.devices.itemSelected
}

export const DevicesContainer = connect(
  (state: IState) => ({
    devices: getDevices(state),
    isOpenModal: isOpenModal(state),
    itemSelected: getDeviceSelected(state)
  }),
  {
    addDevice: () => addDevice(),
    confirm: () => devicesDeleteData(),
    deleteDevice: (device: IDevice) => deleteDevice(device),
    editDevice: (device: IDevice) => editDevice(device),
    hideConfirmModal: () => showHideConfirmModal(false)
  }
)(Devices)
