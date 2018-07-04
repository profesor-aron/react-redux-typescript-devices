import React from 'react'

import { Container } from 'semantic-ui-react'
import { INoFoundContainer } from '../../common/interfaces'
import { Link } from '../../common/components/link'

export const NoFound = ({changeView}: INoFoundContainer) => (
  <div>
    <Container>
      <h2>Page no found</h2>
      <div>
        <Link onClick={() => changeView('/home')}>
          Click here to go to home page
        </Link>
      </div>
    </Container>
  </div>
)
