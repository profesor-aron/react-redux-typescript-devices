import React from 'react'

import { Container } from 'semantic-ui-react'
import { Translate } from 'react-redux-i18n'

import { INoFoundContainer } from '../../common/interfaces'
import { Link } from '../../common/components/link'

export const NoFound = ({changeView}: INoFoundContainer) => (
  <div>
    <Container>
      <h2><Translate value='noFound.message'/></h2>
      <div>
        <Link onClick={() => changeView('/home')}>
          <Translate value='noFound.action'/>
        </Link>
      </div>
    </Container>
  </div>
)
