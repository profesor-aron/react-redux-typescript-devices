import axios from 'axios'

export const DeviceService = {
  delete: (url: string, data: any) => { // todo
    return axios.delete(url, data)
    .then((response) => {
      return response.data
    })
  },
  get: (url: string) => {
    return axios.get(url)
    .then((response) => {
      return response.data
    })
  },
  post: (url: string, data: any) => { // todo
    return axios.post(url, data)
    .then((response) => {
      return response.data
    })
  },
  put: (url: string, data: any) => { // todo
    return axios.put(url, data)
    .then((response) => {
      return response.data
    })
  }
}
