import React from 'react'
import {
  Button,
  Container,
  Grid,
  Icon,
  Modal
} from 'semantic-ui-react'
import { Translate } from 'react-redux-i18n'

import {
  IDevice,
  IDevicesContainer
} from '../../../common/interfaces'
import { Link } from '../../../common/components/link'

export interface IConfirmModal {
  isOpenModal: boolean
  deviceName: string
  close: () => void
  confirm: () => void
}

const ConfirmModal = ({isOpenModal, deviceName, close, confirm}: IConfirmModal) => {
  return (
    <Modal
      open={isOpenModal}
      closeOnEscape={false}
      closeOnRootNodeClick={false}
      onClose={close}
    >
      <Modal.Header><Translate value='devices.list.modal.header'/></Modal.Header>
      <Modal.Content>
        <p><Translate value='devices.list.modal.content'/> <b>{deviceName}</b></p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => close()}><Translate value='devices.list.modal.no'/></Button>
        <Button positive onClick={() => confirm()}><Translate value='devices.list.modal.yes'/></Button>
      </Modal.Actions>
    </Modal>
  )
}

interface IDisplayDevices {
  devices: IDevice[]
  addDevice: () => void
  editDevice: (device: IDevice) => void
  deleteDevice: (device: IDevice) => void
}

const DisplayDevices = ({devices, editDevice, deleteDevice, addDevice}: IDisplayDevices) => {
  const header = (
    <Grid.Row color={'olive'}>
      <Grid.Column width={1} textAlign='center'>
        <h4>#</h4>
      </Grid.Column>
      <Grid.Column width={6}>
        <h4><Translate value='devices.list.table.name'/></h4>
      </Grid.Column>
      <Grid.Column width={7}>
        <h4><Translate value='devices.list.table.description'/></h4>
      </Grid.Column>
    </Grid.Row>
  )

  let content: JSX.Element | JSX.Element[] = <div/>

  if (devices.length === 0) {
    content = (
      <Grid.Row>
        <Grid.Column width={16} textAlign='center'>
          <Link onClick={() => addDevice()}>
            <div>
              <Translate value='devices.list.empty.message'/>
              <br/>
              <Translate value='devices.list.empty.action'/>
            </div>
          </Link>
        </Grid.Column>
      </Grid.Row>
    )
  } else if (devices.length > 0) {
    content = (
      devices.map((device: IDevice, index: number) => (
        <Grid.Row key={index}>
          <Grid.Column width={1} textAlign='center'>
            {index + 1}
          </Grid.Column>
          <Grid.Column width={6}>
            <Link onClick={() => editDevice(device)}>
              <h4>{device.name}</h4>
            </Link>
          </Grid.Column>
          <Grid.Column width={7}>
            {device.description}
          </Grid.Column>
          <Grid.Column width={2} textAlign='center'>
            <Link onClick={() => deleteDevice(device)}>
              <Icon color='red' name='trash alternate' size='large' />
            </Link>
          </Grid.Column>
        </Grid.Row>
      ))
    )
  }

  return (
    <Grid celled columns={4}>
      {header}
      {content}
    </Grid>
  )
}

export const Devices = ({
  addDevice,
  confirm,
  deleteDevice,
  devices,
  editDevice,
  hideConfirmModal,
  isOpenModal,
  itemSelected }: IDevicesContainer) => (
  <div>
    <ConfirmModal
      isOpenModal={isOpenModal}
      deviceName={itemSelected ? itemSelected.name : ''}
      close={hideConfirmModal}
      confirm={confirm}
    />
    <Container>
      <h2><Translate value='devices.list.title'/></h2>
     </Container>
    <Container textAlign='right'>
      <Button color='teal' onClick={addDevice}>
        <Icon name='plus'/><Translate value='devices.list.addDevice'/>
      </Button>
    </Container>
    <Container>
      <h4>
        {devices.length} <Translate value='devices.list.items'/>
      </h4>
      <DisplayDevices
        addDevice={addDevice}
        devices={devices}
        editDevice={editDevice}
        deleteDevice={deleteDevice}
      />
    </Container>
  </div>
)
