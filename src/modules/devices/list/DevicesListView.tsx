import React from 'react'
import {
  Button,
  Container,
  Grid,
  Icon,
  Modal
} from 'semantic-ui-react'

import {
  IDevice,
  IDevicesContainer
} from '../../../common/interfaces'
import { Link } from '../../../common/components/link';

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
      <Modal.Header>Delete device</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete the device <b>{deviceName}</b></p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => close()}>No</Button>
        <Button positive onClick={() => confirm()}>Yes</Button>
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
        <h4>Name</h4>
      </Grid.Column>
      <Grid.Column width={7}>
        <h4>Description</h4>
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
              There are no devices.
              <br/>
              Click here to add a new device.
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
      <h2>Devices</h2>
     </Container>
    <Container textAlign='right'>
      <Button color='teal' onClick={addDevice}>
        <Icon name='plus'/>Add a device
      </Button>
    </Container>
    <Container>
      <h4>
        {devices.length} items
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
