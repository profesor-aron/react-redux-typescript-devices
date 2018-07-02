import {
  createHashHistory,
  History,
  Location
} from 'history'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import {
  showHome,
  showDevices,
  showAddDeviceForm,
  showEditDeviceForm,
  showNoFound
} from './modules/main/Main'
import { IState } from './common/interfaces'

export class Router {

  private static history: History
  private static dispatch: ThunkDispatch<IState, void, AnyAction>

  public static initialise(dispatch: ThunkDispatch<IState, void, AnyAction>) {
    if (!Router.history) {
      Router.dispatch = dispatch
      Router.history = createHashHistory()
      Router.addListener()
    }
  }

  public static changeView(route: string) {
    Router.history.push(route)
  }

  private static addListener() {
    Router.history.listen((location: Location) => {
      if (location.pathname === '/home') {
        Router.dispatch(showHome())
      } else if (location.pathname === '/devices') {
        Router.dispatch(showDevices())
      } else if (location.pathname === '/devices/add') {
        Router.dispatch(showAddDeviceForm())
      } else if (location.pathname === '/devices/edit') {
        Router.dispatch(showEditDeviceForm())
      } else {
        Router.dispatch(showNoFound())
      }
    })
  }
}
