import React, { SyntheticEvent } from 'react'
import {
  Button,
  Container,
  Form,
  Icon,
  Input,
  Message,
  TextArea
} from 'semantic-ui-react'

import { IDeviceContainer } from '../../../common/interfaces'
import { Link } from '../../../common/components/link'

export const DeviceForm = ({
  deviceForm,
  updateName,
  updateDescription,
  showDevices,
  apply,
  isSaved}: IDeviceContainer) => {
  interface ITitleForm {
    isNew: boolean
  }
  const Title = ({isNew}: ITitleForm) => {
    let title = <h2>Edit the device</h2>
    if (isNew) {
      title = <h2>Add a device</h2>
    }
    return title
  }
  const SuccessMessage = () => {
    if (isSaved) {
      return (
        <Message success
          header='Device'
          content='The device data has been successfully saved'
        />
      )
    }
    return null
  }
  const isNewDevice = deviceForm.device.id !== undefined ? false : true
  return (
    <div>
      <Container>
        <Link onClick={() => showDevices()}>
          <div>
            <Icon name='long arrow alternate left' /> back to devices list
          </div>
        </Link>
        <SuccessMessage/>
        <Title isNew={isNewDevice}/>
      </Container>
      <Container>
        <Form>
          <Form.Field
            id='device-name'
            control={Input}
            label='Name'
            placeholder='Enter the name'
            value={deviceForm.device.name}
            onChange={(e: SyntheticEvent<HTMLInputElement>) => updateName(e)}
            error={!deviceForm.isValidName}
          />
          <Form.Field
            id='device-description'
            control={TextArea}
            label='Description'
            placeholder='Enter the description'
            value={deviceForm.device.description}
            onChange={(e: SyntheticEvent<HTMLInputElement>) => updateDescription(e)}
          />
          <Button primary onClick={() => apply()}>Apply</Button>
        </Form>
      </Container>
    </div>
  )
}
