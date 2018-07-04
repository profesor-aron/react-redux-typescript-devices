import React from 'react'
import {
  Icon,
  Image,
  Menu,
} from 'semantic-ui-react'
import { Translate } from 'react-redux-i18n'

import 'semantic-ui-css/semantic.min.css'

import { IMenuContainer } from '../../interfaces'

const srcEN = '/assets/images/flags/en.png'
const srcFR = '/assets/images/flags/fr.png'
const srcES = '/assets/images/flags/es.png'

export const MenuView = ({ changeLocale, changeView }: IMenuContainer) => (
  <div>
    <Menu color='blue' inverted>
      <Menu.Item
        name='home'
        onClick={() => changeView('/home')}
        active={true}
      >
        <Icon name='home' />
        <Translate value='menu.home'/>
      </Menu.Item>
      <Menu.Item
        name='devices'
        onClick={() => changeView('/devices')}
        active={false}
      >
        <Icon name='server' />
        <Translate value='menu.devices'/>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item onClick={() => changeLocale('en')}>
          <Image src={srcEN} size='mini' />
        </Menu.Item>
        <Menu.Item onClick={() => changeLocale('fr')}>
          <Image src={srcFR} size='mini' />
        </Menu.Item>
        <Menu.Item onClick={() => changeLocale('es')}>
          <Image src={srcES} size='mini' />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  </div>
)
