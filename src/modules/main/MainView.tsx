import React from 'react'

import { IMainContainer } from '../../common/interfaces'
import { DeviceFormContainer } from '../devices/form/DeviceForm'
import { DevicesContainer } from '../devices/list/DevicesList'
import { HomeContainer } from '../home/Home'
import { NoFoundContainer } from '../noFound/NoFound'

function DisplayView({ viewName }: IMainContainer) {
  switch (viewName) {
    case 'home':
      return <HomeContainer />
    case 'devicesList':
      return <DevicesContainer />
    case 'devicesForm':
      return <DeviceFormContainer />
    default:
      return <NoFoundContainer />
  }
}

export const MainView = ({ viewName }: IMainContainer) => (
  <div>
    <DisplayView viewName={viewName} />
  </div>
)
