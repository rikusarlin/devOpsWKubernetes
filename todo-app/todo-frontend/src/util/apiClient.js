import axios from 'axios'

const apiClient = axios.create({
  baseURL: window.location.href,
})

export default apiClient