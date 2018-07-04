import React from 'react'

import {
  Container,
  Grid,
  Segment
} from 'semantic-ui-react'
import { Translate } from 'react-redux-i18n'

import { IHomeContainer } from '../../common/interfaces'
import { Link } from '../../common/components/link'

export const Home = ({showDevices, addDevice}: IHomeContainer) => (
  <div>
    <Container>
      <h2><Translate value='home.welcome'/></h2>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Segment inverted color={'olive'}>
              <Link onClick={() => showDevices()}>
                <Translate value='home.devices'/>
              </Link>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment inverted color={'olive'}>
              <Link onClick={() => addDevice()}>
                <Translate value='home.addDevice'/>
              </Link>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </div>
)
