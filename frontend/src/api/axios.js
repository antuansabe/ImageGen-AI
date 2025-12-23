// Configuración de Axios para API
import axios from 'axios'

// La URL del backend viene de variables de entorno
// Desarrollo: http://localhost:5000 (desde .env.local)
// Producción: https://tu-backend.onrender.com (desde Vercel env vars)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Timeout de 60 segundos para batch generation
  timeout: 60000,
})

// Interceptor para logging en desarrollo
if (import.meta.env.DEV) {
  api.interceptors.request.use((config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  })

  api.interceptors.response.use(
    (response) => {
      console.log(`✅ API Response: ${response.config.url}`, response.status)
      return response
    },
    (error) => {
      console.error(`❌ API Error: ${error.config?.url}`, error.message)
      return Promise.reject(error)
    }
  )
}

export default api
export { API_URL }
