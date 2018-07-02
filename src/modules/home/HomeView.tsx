import React from 'react'

import {
  Container,
  Grid,
  Segment
} from 'semantic-ui-react'

import { IHomeContainer } from '../../common/interfaces'
import { Link } from '../../common/components/link'

export const Home = ({showDevices, addDevice}: IHomeContainer) => (
  <div>
    <Container>
      <h2>Welcome</h2>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Segment inverted color={'olive'}>
              <Link onClick={() => showDevices()}>Devices</Link>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment inverted color={'olive'}>
              <Link onClick={() => addDevice()}>Add a device</Link>
          </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </div>
)
