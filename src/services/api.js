import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getApiErrorMessage = (error) => {
  if (error.response?.data?.message) return error.response.data.message
  if (error.response?.status === 401) return 'Your session has expired. Please sign in again.'
  if (error.request) return 'We could not reach the server. Please try again in a moment.'
  return 'Something went wrong. Please try again.'
}

export const registerUser = (details) => api.post('/api/auth/register', details)
export const loginUser = (credentials) => api.post('/api/auth/login', credentials)

export default api
