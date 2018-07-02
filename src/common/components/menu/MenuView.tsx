import React from 'react'
import {
  Icon,
  Menu,
} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'

import { IMenuContainer } from '../../interfaces'

export const MenuView = ({ changeView }: IMenuContainer) => (
  <div>
    <Menu color='blue' inverted>
      <Menu.Item
        name='home'
        onClick={() => changeView('/home')}
        active={true}
      >
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item
        name='devices'
        onClick={() => changeView('/devices')}
        active={false}
      >
        <Icon name='server' />
        Devices
      </Menu.Item>
    </Menu>
  </div>
)
