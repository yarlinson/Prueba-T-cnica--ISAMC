import axios from 'axios';
import { Persona, Tarea } from '../types/persona';

// Configuración de API - detecta automáticamente el entorno
const getApiBaseUrl = () => {
  // Si está en Docker o desarrollo, usar la URL configurada
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Por defecto, apuntar a localhost (desarrollo local sin Docker)
  return 'http://localhost:8000/api';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Error del servidor
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request fue hecho pero no hubo respuesta
      console.error('Network Error:', 'No se pudo conectar al servidor');
    } else {
      // Algo más causó el error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Personas API
export const personasApi = {
  getAll: async (params?: { documento?: string }) => {
    const response = await api.get('/personas/', { params });
    // DRF puede devolver resultados paginados o lista directa
    if (response.data.results) {
      return { ...response, data: response.data.results };
    }
    return response;
  },
  getById: (id: number) => {
    return api.get<Persona>(`/personas/${id}/`);
  },
  create: (data: Persona) => {
    return api.post<Persona>('/personas/', data);
  },
  update: (id: number, data: Partial<Persona>) => {
    return api.put<Persona>(`/personas/${id}/`, data);
  },
  delete: (id: number) => {
    return api.delete(`/personas/${id}/`);
  },
};

// Tareas API
export const tareasApi = {
  getAll: () => {
    return api.get<Tarea[]>('/tareas/');
  },
  getById: (id: number) => {
    return api.get<Tarea>(`/tareas/${id}/`);
  },
  create: (data: Tarea) => {
    return api.post<Tarea>('/tareas/', data);
  },
  update: (id: number, data: Partial<Tarea>) => {
    return api.put<Tarea>(`/tareas/${id}/`, data);
  },
  delete: (id: number) => {
    return api.delete(`/tareas/${id}/`);
  },
};

export default api;
