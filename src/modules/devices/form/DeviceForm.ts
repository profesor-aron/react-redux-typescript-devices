import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ActionTypes } from '../../../common/actionTypes'
import { DeviceForm } from './DeviceFormView'

import {
  IDevice,
  IDeviceAction,
  IDeviceForm,
  IState
} from '../../../common/interfaces'

import { SyntheticEvent } from 'react'
import { DeviceService } from '../../../common/services/DeviceService'
import { changeView } from '../../main/Main';

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

export function deviceFormIsValid(value: boolean) {
  return { type: ActionTypes.DEVICE_FORM_IS_VALID, value }
}

export function deviceNameIsValid(value: boolean) {
  return { type: ActionTypes.DEVICE_NAME_IS_VALID, value }
}

export function deviceIdUpdate(value: number | undefined) {
  return { type: ActionTypes.DEVICE_ID_UPDATE, value }
}

export function deviceNameUpdate(value: string) {
  return { type: ActionTypes.DEVICE_NAME_UPDATE, value }
}

export function deviceDescriptionUpdate(value: string) {
  return { type: ActionTypes.DEVICE_DESCRIPTION_UPDATE, value }
}

export function deviceFormIsSaved(value: boolean) {
  return { type: ActionTypes.DEVICE_FORM_IS_SAVED, value }
}

export function clearDeviceForm() {
  return (dispatch: Dispatch) => {
    dispatch(deviceFormIsValid(true))
    dispatch(deviceNameIsValid(true))
    dispatch(deviceFormHasErrored(false))
    dispatch(deviceFormIsPending(false))
    dispatch(deviceFormPostDataSuccess(undefined))
    dispatch(deviceNameUpdate(''))
    dispatch(deviceDescriptionUpdate(''))
  }
}

export function validateDeviceForm() {
  return (dispatch: Dispatch, getState: () => IState) => {
    const state = getState()
    const { device } = state.deviceForm
    if (device.name.trim().length === 0) {
      dispatch(deviceNameIsValid(false))
    } else {
      dispatch(deviceNameIsValid(true))
      if (device.id === undefined) {
        // POST DEVICE
        devicePostData('/devices', device)(dispatch)
      } else {
        // PUT DEVICE
        devicePutData('/devices', device)(dispatch)
      }
    }
  }
}

export function deviceFormHasErrored(value: boolean) {
  return { type: ActionTypes.DEVICE_FORM_HAS_ERRORED, value }
}

export function deviceFormIsPending(value: boolean) {
  return { type: ActionTypes.DEVICE_FORM_IS_PENDING, value }
}

export function deviceFormPostDataSuccess(value: number | undefined) {
  return { type: ActionTypes.DEVICE_FORM_POST_DATA_SUCCESS, value }
}

export function deviceFormPutDataSuccess(value: number | undefined) {
  return { type: ActionTypes.DEVICE_FORM_PUT_DATA_SUCCESS, value }
}

export function devicePostData(url: string, data: any) {
  return (dispatch: Dispatch) => {
    dispatch(deviceFormIsSaved(false))
    dispatch(deviceFormIsPending(true))
    DeviceService.post(url, data)
      .then((id) => {
        dispatch(deviceFormIsSaved(true))
        dispatch(deviceFormIsPending(false))
        dispatch(deviceFormPostDataSuccess(id))
      })
      .catch((error) => {
        dispatch(deviceFormHasErrored(true))
      })
  }
}

export function devicePutData(url: string, data: any) {
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
        dispatch(deviceFormHasErrored(true))
      })
  }
}

export function deviceFormReduce(state = initialStateDeviceForm, action: IDeviceAction) {
  switch (action.type) {
    case ActionTypes.DEVICE_FORM_HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.value
      }
    case ActionTypes.DEVICE_FORM_IS_PENDING:
      return {
        ...state,
        isPending: action.value
      }
    case ActionTypes.DEVICE_FORM_POST_DATA_SUCCESS:
      return {
        ...state,
        device: {
          ...state.device,
          id: action.value
        }
      }
    case ActionTypes.DEVICE_FORM_PUT_DATA_SUCCESS:
      return {
        ...state,
        device: {
          ...state.device,
          id: action.value
        }
      }
    case ActionTypes.DEVICE_FORM_IS_VALID:
      return {
        ...state,
        isValid: action.value
      }
    case ActionTypes.DEVICE_NAME_IS_VALID:
      return {
        ...state,
        isValidName: action.value
      }
    case ActionTypes.DEVICE_FORM_IS_SAVED:
      return {
        ...state,
        isSaved: action.value
      }
    case ActionTypes.DEVICE_ID_UPDATE:
      return {
        ...state,
        device: {
          ...state.device,
          id: action.value
        }
      }
    case ActionTypes.DEVICE_NAME_UPDATE:
      return {
        ...state,
        device: {
          ...state.device,
          name: action.value
        }
      }
    case ActionTypes.DEVICE_DESCRIPTION_UPDATE:
      return {
        ...state,
        device: {
          ...state.device,
          description: action.value
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
