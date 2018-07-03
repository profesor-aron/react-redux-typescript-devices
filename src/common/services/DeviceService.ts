import axios from 'axios'

export const DeviceService = {
  get: (url: string) => {
    return axios.get(url)
    .then((response) => {
      return response.data
    })
  },
  post: <T>(url: string, data: T) => {
    return axios.post(url, data)
    .then((response) => {
      return response.data
    })
  },
  put: <T>(url: string, data: T) => {
    return axios.put(url, data)
    .then((response) => {
      return response.data
    })
  },
  delete: <T>(url: string, data: T) => {
    return axios.delete(url, data)
    .then((response) => {
      return response.data
    })
  }
}
