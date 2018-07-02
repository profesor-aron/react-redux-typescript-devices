import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import {IDevice} from '../interfaces'

const mock = new MockAdapter(axios)

class Database {

  private static DEVICE_ID: number = 0
  private static DEVICES: IDevice[] = undefined

  public static initialise() {
    if (Database.DEVICES === undefined) {
      Database.DEVICES = [
        { id: ++Database.DEVICE_ID, name: 'device1', description: 'description1' },
        { id: ++Database.DEVICE_ID, name: 'device2', description: 'description2' },
        { id: ++Database.DEVICE_ID, name: 'device3', description: 'description3' },
        { id: ++Database.DEVICE_ID, name: 'device4', description: 'description4' },
        { id: ++Database.DEVICE_ID, name: 'device5', description: 'description5' },
        { id: ++Database.DEVICE_ID, name: 'device6', description: 'description6' }
      ]
    }
  }

  public static getDevices() {
    return Database.DEVICES
  }

  public static deleteDevice(id: number) {
    return new Promise((resolve, reject) => {
      const index = Database.DEVICES.findIndex((item) => item.id === id)
      const list = [
        ...Database.DEVICES.slice(0, index),
        ...Database.DEVICES.slice(index + 1)
      ]
      Database.DEVICES = list
      resolve(true)
    })
  }

  public static addDevice(newDevice: IDevice) {
    return new Promise((resolve, reject) => {
      newDevice.id = ++Database.DEVICE_ID
      Database.DEVICES = [...Database.DEVICES, newDevice]
      resolve(newDevice.id)
    })
  }

  public static updateDevice(device: IDevice) {
    return new Promise((resolve, reject) => {
      const index = Database.DEVICES.findIndex((item) => item.id === device.id)
      Database.DEVICES[index] = device
      resolve(device.id)
    })
  }
}

Database.initialise()

mock.onGet('/devices').reply((config) => {
  return [200, Database.getDevices()]
})

mock.onPost('/devices').reply((config) => {
  const device = JSON.parse(config.data)
  return new Promise((resolve, reject) => {
    Database.addDevice(device).then((newId) => {
      resolve([200, newId])
    }, (error) => {
      console.log(error) // Error: "It broke"
    })
  })
})

mock.onPut('/devices').reply((config) => {
  const device = JSON.parse(config.data)
  return new Promise((resolve, reject) => {
    Database.updateDevice(device).then((id) => {
      resolve([200, id])
    }, (error) => {
      console.log(error) // Error: "It broke"
    })
  })
})

mock.onDelete('/devices').reply((config) => {
  return new Promise((resolve, reject) => {
    const id = config.data
    Database.deleteDevice(id).then((result) => {
      resolve([200, true ])
    }, (error) => {
      console.log(error) // Error: "It broke"
    })
  })
})
