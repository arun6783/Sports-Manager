// src/utils/api.js
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const api = axios.create({
  baseURL: API_BASE_URL,
})

// Example usage in a component:
export const addPlayer = async (data) => {
  const response = await api.post('/api/players/add', data)
  return response.data
}
