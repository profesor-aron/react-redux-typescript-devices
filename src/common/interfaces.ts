import { SyntheticEvent } from 'react'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

export interface IActionBase {
  type: string
  error: boolean
}

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
export interface IViewAction extends IActionBase {
  payload: string
}

/***************************************************/
/* Menu */
export interface IMenuContainer {
  changeLocale: (locale: string) => void
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
/* NoFound */
export interface INoFoundContainer {
  changeView: (route: string) => void
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

export interface IDeviceFormHasErroredAction extends IActionBase {
  payload: boolean
}

export interface IDeviceFormIsPendingAction extends IActionBase {
  payload: boolean
}

export interface IDeviceFormPostDataSuccessAction extends IActionBase {
  payload: number | undefined
}

export interface IDeviceFormPutDataSuccessAction extends IActionBase {
  payload: number | undefined
}

export interface IDeviceFormIsValiddAction extends IActionBase {
  payload: boolean
}

export interface IDeviceNameIsValiddAction extends IActionBase {
  payload: boolean
}

export interface IDeviceIdAction extends IActionBase {
  payload: number
}

export interface IDeviceNameAction extends IActionBase {
  payload: string
}

export interface IDeviceDescriptionAction extends IActionBase {
  payload: string
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
