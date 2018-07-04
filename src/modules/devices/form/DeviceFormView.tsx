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
import { I18n, Translate } from 'react-redux-i18n'

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
    let title = <h2><Translate value='devices.form.title.edit'/></h2>
    if (isNew) {
      title = <h2><Translate value='devices.form.title.add'/></h2>
    }
    return title
  }
  const SuccessMessage = () => {
    if (isSaved) {
      return (
        <Message success
          header={<Translate value='devices.form.success.header'/>}
          content={<p><Translate value='devices.form.success.content'/></p>}
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
            <Icon name='long arrow alternate left' /> <Translate value='devices.form.back'/>
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
            label={<Translate value='devices.form.fields.name.label'/>}
            placeholder={I18n.t('devices.form.fields.name.placeholder')}
            value={deviceForm.device.name}
            onChange={(e: SyntheticEvent<HTMLInputElement>) => updateName(e)}
            error={!deviceForm.isValidName}
          />
          <Form.Field
            id='device-description'
            control={TextArea}
            label={<Translate value='devices.form.fields.description.label'/>}
            placeholder={I18n.t('devices.form.fields.description.placeholder')}
            value={deviceForm.device.description}
            onChange={(e: SyntheticEvent<HTMLInputElement>) => updateDescription(e)}
          />
          <Button primary onClick={() => apply()}>
            <Translate value='devices.form.apply'/>
          </Button>
        </Form>
      </Container>
    </div>
  )
}
