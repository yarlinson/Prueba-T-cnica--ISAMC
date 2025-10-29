# Prueba Técnica - Sistema de Gestión de Personas

## 📋 Descripción del Proyecto

Sistema completo de gestión de personas desarrollado con React + TypeScript (Frontend) y Django REST Framework (Backend), conectado a PostgreSQL.

## 🏗️ Arquitectura del Proyecto

```
prueba-tecnica/
├── frontend/          # React + TypeScript
├── backend/           # Django REST Framework
├── docs/             # Documentación
├── database/         # Scripts SQL
└── README.md
```

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **Axios** para peticiones HTTP
- **React Router DOM** para navegación
- **CSS Modules** para estilos

### Backend
- **Django 5.2** con Django REST Framework
- **PostgreSQL** como base de datos
- **Python 3.13**
- **psycopg2** para conexión a PostgreSQL

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- Python 3.8+
- PostgreSQL 12+
- Git

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\Activate.ps1
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## 🗄️ Base de Datos

### Modelos
- **Persona**: Información personal básica
- **Tarea**: Tareas asociadas a cada persona

### Campos del Modelo Persona
- nombre
- apellido
- documento (único)
- email
- teléfono
- fecha_nacimiento
- created_at

### Campos del Modelo Tarea
- título
- descripción
- fecha_límite
- persona (ForeignKey)
- completada

## 🔌 API Endpoints

### Personas
- `GET /api/personas/` - Listar todas las personas
- `POST /api/personas/` - Crear nueva persona
- `GET /api/personas/{id}/` - Obtener persona específica
- `PUT /api/personas/{id}/` - Actualizar persona
- `DELETE /api/personas/{id}/` - Eliminar persona
- `GET /api/personas/?documento={numero}` - Filtrar por documento

## 🎨 Características del Frontend

### Pantallas
1. **Pantalla de Registro**: Formulario para crear nuevas personas
2. **Pantalla de Lista**: Tabla con todas las personas registradas

### Componentes Modales
- Modal de éxito
- Modal de error
- Modal informativo

## 🧪 Testing

### Postman
- Colección completa de endpoints
- Documentación de cada servicio
- Casos de prueba incluidos

## 🚀 Despliegue

### Opciones Recomendadas
1. **Heroku**: Fácil y rápido
2. **AWS**: Profesional y escalable
3. **DigitalOcean**: Balanceado costo-beneficio

## 📝 Desarrollo

### Ramas Git
- `main`: Código de producción
- `develop`: Código de desarrollo
- `feature/*`: Nuevas funcionalidades

### Commits
- Estructura: `tipo(scope): descripción`
- Ejemplo: `feat(frontend): add persona form component`

## 👥 Autor

Desarrollado como parte de una prueba técnica.

## 📄 Licencia

Este proyecto es de uso educativo/demostrativo.