import { SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import {
  AnyAction,
  Dispatch
} from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ActionTypes } from '../../../common/actionTypes'
import { DeviceForm } from './DeviceFormView'
import {
  IDevice,
  IDeviceAction,
  IDeviceForm,
  IState
} from '../../../common/interfaces'
import { DeviceService } from '../../../common/services/DeviceService'
import { changeView } from '../../main/Main'

const initialStateDevice: IDevice = {
  description: '',
  name: ''
}

const initialStateDeviceForm: IDeviceForm = {
  device: initialStateDevice,
  hasErrored: false,
  isPending: false,
  isSaved: false,
  isValid: true,
  isValidName: true
}

export function deviceFormIsValid(isValid: boolean) {
  return { type: ActionTypes.DEVICE_FORM_IS_VALID, payload: isValid }
}

export function deviceNameIsValid(isValid: boolean) {
  return { type: ActionTypes.DEVICE_NAME_IS_VALID, payload: isValid }
}

export function deviceIdUpdate(id: number | undefined) {
  return { type: ActionTypes.DEVICE_ID_UPDATE, payload: id }
}

export function deviceNameUpdate(name: string) {
  return { type: ActionTypes.DEVICE_NAME_UPDATE, payload: name }
}

export function deviceDescriptionUpdate(description: string) {
  return { type: ActionTypes.DEVICE_DESCRIPTION_UPDATE, payload: description }
}

export function deviceFormIsSaved(saved: boolean) {
  return { type: ActionTypes.DEVICE_FORM_IS_SAVED, payload: saved }
}

export function clearDeviceForm() {
  return (dispatch: Dispatch) => {
    dispatch(deviceFormIsValid(true))
    dispatch(deviceNameIsValid(true))
    dispatch(deviceFormHasErrored(null, false))
    dispatch(deviceFormIsPending(false))
    dispatch(deviceFormPostDataSuccess(undefined))
    dispatch(deviceNameUpdate(''))
    dispatch(deviceDescriptionUpdate(''))
  }
}

export function validateDeviceForm() {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>, getState: () => IState) => {
    const state = getState()
    const { device } = state.deviceForm
    if (device.name.trim().length === 0) {
      dispatch(deviceNameIsValid(false))
    } else {
      dispatch(deviceNameIsValid(true))
      if (device.id === undefined) {
        dispatch(devicePostData('/devices', device))
      } else {
        dispatch(devicePutData('/devices', device))
      }
    }
  }
}

export function deviceFormHasErrored(err: Error, hasError: boolean) {
  return { type: ActionTypes.DEVICE_FORM_HAS_ERRORED, payload: err, error: hasError }
}

export function deviceFormIsPending(isPending: boolean) {
  return { type: ActionTypes.DEVICE_FORM_IS_PENDING, payload: isPending }
}

export function deviceFormPostDataSuccess(idNewDevice: number | undefined) {
  return { type: ActionTypes.DEVICE_FORM_POST_DATA_SUCCESS, payload: idNewDevice }
}

export function deviceFormPutDataSuccess(idDevice: number | undefined) {
  return { type: ActionTypes.DEVICE_FORM_PUT_DATA_SUCCESS, payload: idDevice }
}

export function devicePostData(url: string, data: IDevice) {
  return (dispatch: ThunkDispatch<IState, void, AnyAction>) => {
    dispatch(deviceFormIsSaved(false))
    dispatch(deviceFormIsPending(true))
    DeviceService.post(url, data)
      .then((id) => {
        dispatch(deviceFormIsSaved(true))
        dispatch(deviceFormIsPending(false))
        dispatch(deviceFormPostDataSuccess(id))
      })
      .catch((error) => {
        dispatch(deviceFormHasErrored(error, true))
      })
  }
}

export function devicePutData(url: string, data: IDevice) {
  return (dispatch: Dispatch) => {
    dispatch(deviceFormIsSaved(false))
    dispatch(deviceFormIsPending(true))
    DeviceService.put(url, data)
      .then((id) => {
        dispatch(deviceFormIsSaved(true))
        dispatch(deviceFormIsPending(false))
        dispatch(deviceFormPutDataSuccess(id))
      })
      .catch((error) => {
        dispatch(deviceFormHasErrored(error, true))
      })
  }
}

export function deviceFormReduce(state = initialStateDeviceForm, action: IDeviceAction) {
  switch (action.type) {
    case ActionTypes.DEVICE_FORM_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.error
      }
    case ActionTypes.DEVICE_FORM_IS_PENDING:
      return {
        ...state,
        isPending: action.payload
      }
    case ActionTypes.DEVICE_FORM_POST_DATA_SUCCESS:
      return {
        ...state,
        device: {
          ...state.device,
          id: action.payload
        }
      }
    case ActionTypes.DEVICE_FORM_PUT_DATA_SUCCESS:
      return {
        ...state,
        device: {
          ...state.device,
          id: action.payload
        }
      }
    case ActionTypes.DEVICE_FORM_IS_VALID:
      return {
        ...state,
        isValid: action.payload
      }
    case ActionTypes.DEVICE_NAME_IS_VALID:
      return {
        ...state,
        isValidName: action.payload
      }
    case ActionTypes.DEVICE_FORM_IS_SAVED:
      return {
        ...state,
        isSaved: action.payload
      }
    case ActionTypes.DEVICE_ID_UPDATE:
      return {
        ...state,
        device: {
          ...state.device,
          id: action.payload
        }
      }
    case ActionTypes.DEVICE_NAME_UPDATE:
      return {
        ...state,
        device: {
          ...state.device,
          name: action.payload
        }
      }
    case ActionTypes.DEVICE_DESCRIPTION_UPDATE:
      return {
        ...state,
        device: {
          ...state.device,
          description: action.payload
        }
      }
    default:
      return state
  }
}

export const getDevice = (state: IState) => {
  return state.deviceForm
}

export const isSaved = (state: IState) => {
  return state.deviceForm.isSaved
}

export const DeviceFormContainer = connect(
  (state: IState) => ({
    deviceForm: getDevice(state),
    isSaved: isSaved(state)
  }),
  {
    apply: () => validateDeviceForm(),
    showDevices: () => changeView('/devices'),
    updateDescription: (e: SyntheticEvent<HTMLInputElement>) => deviceDescriptionUpdate(e.currentTarget.value),
    updateName: (e: SyntheticEvent<HTMLInputElement>) => deviceNameUpdate(e.currentTarget.value)
  }
)(DeviceForm)
