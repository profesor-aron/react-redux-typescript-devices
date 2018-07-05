import {
  Dispatch,
  AnyAction
} from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'

import { ActionTypes } from '../../../common/actionTypes'
import { Devices } from './DevicesListView'
import { DeviceService } from '../../../common/services/DeviceService'
import {
  IDevice,
  IDevices,
  IState,
  IThunkResult,
  IDevicesAction
} from '../../../common/interfaces'
import { changeView } from '../../../modules/main/Main'
import {
  deviceIdUpdate,
  deviceNameUpdate,
  deviceDescriptionUpdate,
  deviceFormIsSaved
} from '../form/DeviceForm'

export function devicesHasErrored(err: Error, hasError: boolean) {
  return { type: ActionTypes.DEVICES_HAS_ERRORED, payload: err, error: hasError }
}

export function devicesIsPending(isPending: boolean) {
  return { type: ActionTypes.DEVICES_IS_PENDING, payload: isPending }
}

export function devicesFetchDataSuccess(items: IDevice[]) {
  return { type: ActionTypes.DEVICES_FETCH_DATA_SUCCESS, payload: items }
}

export function devicesItemsFetchData(url: string): IThunkResult<void> {
  return (dispatch: Dispatch) => {
    dispatch(devicesIsPending(true))
    DeviceService.get(url)
      .then((items) => {
        dispatch(devicesIsPending(false))
        dispatch(devicesFetchDataSuccess(items))
      })
      .catch((err) => {
        dispatch(devicesHasErrored(err, true))
      })
  }
}

export function devicesPostData(url: string, data: IDevice) {
  return (dispatch: Dispatch) => {
    dispatch(devicesIsPending(true))
    DeviceService.post(url, data)
      .then((items) => {
        dispatch(devicesIsPending(false))
        dispatch(devicesFetchDataSuccess(items))
      })
      .catch((err) => {
        dispatch(devicesIsPending(false))
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
  return (dispatch: Dispatch) => {
    dispatch(selectDevice(device))
    dispatch(showHideConfirmModal(true))
  }
}

export function addDevice() {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
    dispatch(deviceFormIsSaved(false))
    dispatch(changeView('/devices/add'))
  }
}

export function editDevice(device: IDevice) {
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

export function devicesDeleteData() {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>, getState: () => IState) => {
    const id = getState().devices.itemSelected.id
    dispatch(showHideConfirmModal(false))
    dispatch(devicesIsPending(true))
    DeviceService.delete('/devices', {data: id})
      .then((isDeleted) => {
        dispatch(devicesIsPending(false))
        dispatch(devicesItemsFetchData('/devices'))
        dispatch(selectDevice(undefined))
      })
      .catch((error) => {
        dispatch(devicesIsPending(false))
        dispatch(devicesHasErrored(error, true))
      })
  }
}

const initialStateDevices: IDevices = {
  hasErrored: false,
  isPending: false,
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
    case ActionTypes.DEVICES_IS_PENDING:
      return {
        ...state,
        isPending: action.payload
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
