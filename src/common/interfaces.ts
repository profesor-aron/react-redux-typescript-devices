import { SyntheticEvent } from 'react'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

export type IThunkResult<R> = ThunkAction<R, IState, undefined, AnyAction>

export interface IDevice {
  id?: number | undefined
  name: string
  description: string
}

export interface IDeviceForm {
  device: IDevice
  hasErrored: boolean
  isPending: boolean
  isSaved: boolean
  isValid: boolean
  isValidName: boolean
}

export interface IDevices {
  hasErrored: boolean
  isLoading: boolean
  isOpenModal: boolean
  items: IDevice[]
  itemSelected: IDevice | undefined
}

export interface IView {
  name: string
}

export interface IState {
  deviceForm: IDeviceForm
  devices: IDevices
  view: IView
}

/***************************************************/
/* Devices */
export interface IDevicesContainer {
  devices: IDevice[]
  isOpenModal: boolean
  itemSelected: IDevice | undefined
  addDevice: () => void
  confirm: () => void
  deleteDevice: (device: IDevice) => void,
  editDevice: (device: IDevice) => void,
  hideConfirmModal: () => void
}

/***************************************************/
/* View */
export interface IViewAction {
  type: string
  value: string
}

/***************************************************/
/* Menu */
export interface IMenuContainer {
  changeView: (route: string) => void
}

/***************************************************/
/* Main */
export interface IMainContainer {
  viewName: string
}

/***************************************************/
/* Home */
export interface IHomeContainer {
  showDevices: () => void
  addDevice: () => void
}

/***************************************************/
/* Link */
export interface ILink {
  onClick: () => void
  children: string | JSX.Element
}

/***************************************************/
/* Device */
export interface IDeviceContainer {
  apply: () => void
  deviceForm: IDeviceForm
  isSaved: boolean
  showDevices: () => void
  updateName: (e: SyntheticEvent<HTMLInputElement>) => void
  updateDescription: (e: SyntheticEvent<HTMLInputElement>) => void
}

/***************************************************/
/* NoFound */
export interface INoFoundContainer {
  changeView: (route: string) => void
}

export interface IDeviceFormHasErroredAction {
  type: string
  value: boolean
}

export interface IDeviceFormIsPendingAction {
  type: string
  value: boolean
}

export interface IDeviceFormPostDataSuccessAction {
  type: string
  value: number | undefined
}

export interface IDeviceFormPutDataSuccessAction {
  type: string
  value: number | undefined
}

export interface IDeviceFormIsValiddAction {
  type: string
  value: boolean
}

export interface IDeviceNameIsValiddAction {
  type: string
  value: boolean
}

export interface IDeviceIdAction {
  type: string
  value: number
}

export interface IDeviceNameAction {
  type: string
  value: string
}

export interface IDeviceDescriptionAction {
  type: string
  value: string
}

export type IDeviceAction = IDeviceIdAction
  | IDeviceNameAction
  | IDeviceDescriptionAction
  | IDeviceFormIsValiddAction
  | IDeviceNameIsValiddAction
  | IDeviceFormHasErroredAction
  | IDeviceFormIsPendingAction
  | IDeviceFormPostDataSuccessAction
  | IDeviceFormPutDataSuccessAction
