# Prueba Técnica - Sistema de Gestión de Personas

Sistema completo de gestión de personas desarrollado con **React + TypeScript** (Frontend) y **Django REST Framework** (Backend), conectado a **PostgreSQL**. Incluye funcionalidades de exportación, diseño responsive y documentación completa.

---

## 📋 Descripción del Proyecto

Sistema de gestión que permite:
- ✅ **Registrar** personas (naturales y jurídicas) con información completa
- ✅ **Listar y buscar** personas por documento
- ✅ **Editar y eliminar** personas con confirmaciones
- ✅ **Exportar** datos a PDF y Excel
- ✅ **Gestionar tareas** asociadas a cada persona

---

## 🏗️ Arquitectura del Proyecto

```
prueba-tecnica/
├── frontend/              # React + TypeScript
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Pantallas principales
│   │   ├── services/      # Servicios API
│   │   ├── utils/         # Utilidades (exportación)
│   │   └── types/         # Definiciones TypeScript
│   ├── Dockerfile
│   └── package.json
│
├── backend/               # Django REST Framework
│   ├── personas/         # App principal
│   │   ├── models.py      # Modelos Persona y Tarea
│   │   ├── serializers.py # Serializadores con validaciones
│   │   ├── views.py       # ViewSets basados en clases
│   │   └── urls.py        # Routing
│   ├── personas_api/      # Configuración del proyecto
│   ├── Dockerfile
│   └── requirements.txt
│
├── docs/                  # Documentación completa
│   ├── POSTMAN_COLLECTION.json
│   ├── GUIA_DOCUMENTACION_POSTMAN.md
│   ├── EJEMPLOS_RESPUESTAS_API.md
│   ├── GUIA_PRUEBAS_FUNCIONALIDAD.md
│   └── ESTADO_PROYECTO.md
│
├── database/              # Scripts de base de datos
├── docker-compose.dev.yml # Docker Compose para desarrollo
└── README.md
```

---

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 19** con TypeScript
- **Axios** para peticiones HTTP
- **React Router DOM** para navegación
- **CSS Modules** para estilos
- **jsPDF** y **jspdf-autotable** para exportación PDF
- **xlsx (SheetJS)** para exportación Excel

### Backend
- **Django 5.2** con Django REST Framework
- **PostgreSQL 15** como base de datos
- **Python 3.13**
- **psycopg2-binary** para conexión a PostgreSQL
- **python-decouple** para variables de entorno
- **django-cors-headers** para CORS

### DevOps
- **Docker** y **Docker Compose** para containerización
- **Git** para control de versiones

---

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- Python 3.8+
- PostgreSQL 12+ (o usar Docker)
- Git
- Docker Desktop (opcional, pero recomendado)

---

## 🐳 Opción 1: Docker (Recomendado)

La forma más sencilla de ejecutar el proyecto completo con PostgreSQL incluido.

```bash
# Windows PowerShell
.\start-docker.ps1

# Linux/Mac
./start-docker.sh

# O manualmente
docker-compose -f docker-compose.dev.yml up --build
```

### Acceso
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Admin Django**: http://localhost:8000/admin
- **PostgreSQL**: localhost:5432

> 💡 **¿Quieres ejecutar el proyecto en otra PC?** Ver la guía completa en [`docs/GUIA_EJECUTAR_OTRA_PC.md`](docs/GUIA_EJECUTAR_OTRA_PC.md)

---

## 💻 Opción 2: Instalación Local (Sin Docker)

### Frontend

```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en `http://localhost:3000`

### Backend

1. **Configurar entorno virtual:**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   .\venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

2. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configurar PostgreSQL:**
   ```bash
   # Crear archivo .env desde .env.example
   copy .env.example .env  # Windows
   # cp .env.example .env  # Linux/Mac
   
   # Editar .env y configurar:
   USE_POSTGRESQL=True
   DB_NAME=personas_db
   DB_USER=postgres
   DB_PASSWORD=tu_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

4. **Ejecutar migraciones:**
   ```bash
   python manage.py migrate
   ```

5. **Crear superusuario (opcional):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Iniciar servidor:**
   ```bash
   python manage.py runserver
   ```

El backend estará disponible en `http://localhost:8000`

---

## 🗄️ Base de Datos

### Modelos Implementados

#### **Persona**
Modelo principal con todos los campos requeridos:

**Campos de Identificación:**
- `tipo_persona`: NATURAL | JURIDICA
- `tipo_documento`: CC | NIT | CE | PAS
- `numero_documento`: Único (string, max 30)
- `digito_verificacion`: Opcional para NIT

**Campos Geográficos:**
- `pais`: CO | EC | PE | BO
- `departamento`: ATL | BOL | CES
- `municipio`: BOG | MED | CLO
- `direccion`: Dirección completa

**Campos de Empresa (para jurídicas):**
- `razon_social`: Razón social
- `nombre_comercial`: Nombre comercial
- `tipo_empresa_cacaotera`: COM | TRA | EXP

**Campos de Contacto:**
- `correo_electronico`: Email válido
- `numero_celular`: Teléfono
- `confirmar_correo_electronico`: Campo de validación (no persiste)
- `confirmar_numero_celular`: Campo de validación (no persiste)

**Campos Adicionales:**
- `quien_diligencia`: Nombre de quien completa el formulario
- `cargo`: Cargo del responsable
- `area`: Área de trabajo
- `created_at`, `updated_at`: Timestamps automáticos

#### **Tarea**
Modelo relacionado con Persona (uno a muchos):

- `persona`: ForeignKey a Persona
- `titulo`: Título de la tarea
- `descripcion`: Descripción detallada
- `fecha_limite`: Fecha límite de la tarea
- `completada`: Boolean (estado)
- `created_at`, `updated_at`: Timestamps

---

## 🔌 API Endpoints

### 📋 Personas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/personas/` | Lista todas las personas (paginado) |
| `GET` | `/api/personas/{id}/` | Obtiene una persona por ID |
| `POST` | `/api/personas/` | Crea una nueva persona |
| `PUT` | `/api/personas/{id}/` | Actualiza una persona completa |
| `DELETE` | `/api/personas/{id}/` | Elimina una persona |
| `GET` | `/api/personas/?documento={numero}` | Filtra por número de documento |
| `GET` | `/api/personas/?search={termino}` | Búsqueda en documento, razón social, email |

### ✅ Tareas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/tareas/` | Lista todas las tareas |
| `GET` | `/api/tareas/{id}/` | Obtiene una tarea por ID |
| `POST` | `/api/tareas/` | Crea una nueva tarea |
| `PUT` | `/api/tareas/{id}/` | Actualiza una tarea |
| `DELETE` | `/api/tareas/{id}/` | Elimina una tarea |

---

## 🎨 Características del Frontend

### 📱 Pantallas

1. **Pantalla de Registro** (`/registro`)
   - Formulario de búsqueda de personas
   - Formulario completo de información de usuario
   - Crear nueva persona o editar existente
   - Validaciones en tiempo real
   - Modales de éxito/error/información

2. **Pantalla de Listado** (`/listado`)
   - Tabla completa de personas registradas
   - Búsqueda por documento
   - Acciones: Editar, Eliminar, Aprobar
   - **Exportación a PDF y Excel** ✨
   - Paginación
   - Diseño responsive con scroll horizontal

### 🧩 Componentes

#### **Layout**
- `Sidebar`: Menú de navegación lateral
- `Header`: Barra superior con acciones

#### **Formularios**
- `UserIdentificationForm`: Búsqueda por documento
- `UserInfoForm`: Formulario completo de información

#### **Tablas**
- `PersonaTable`: Tabla con todas las personas

#### **Modales**
- `SuccessModal`: Acciones exitosas
- `ErrorModal`: Errores y validaciones
- `InfoModal`: Información general
- `ConfirmModal`: Confirmación de acciones destructivas

### 🎯 Funcionalidades Especiales

- ✅ **Exportación a PDF**: Tabla formateada con encabezados y estilos
- ✅ **Exportación a Excel**: Datos completos con múltiples columnas
- ✅ **Diseño Responsive**: Adaptable a diferentes tamaños de pantalla
- ✅ **Validaciones Frontend y Backend**: Doble validación de datos
- ✅ **Confirmaciones**: Modal personalizado para eliminaciones
- ✅ **Búsqueda en tiempo real**: Filtrado por documento
- ✅ **Carga automática**: Pre-llenado de formularios desde URL

---

## 🔧 Estándares de Desarrollo (Backend)

El proyecto sigue las mejores prácticas de Django REST Framework:

### ✅ Vistas Basadas en Clases (ViewSets)
```python
class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['numero_documento', 'razon_social', 'correo_electronico']
```

### ✅ Serializadores con Validaciones
```python
class PersonaSerializer(serializers.ModelSerializer):
    # Validaciones personalizadas
    def validate(self, attrs):
        # Validar coincidencia de correos y teléfonos
        ...
```

### ✅ Router de DRF
- Uso de `DefaultRouter` para generar URLs automáticamente
- Endpoints RESTful estándar

### ✅ Optimizaciones
- `select_related()` para consultas eficientes
- Paginación configurada
- Filtros y búsqueda implementados

---

## 🧪 Testing

### Postman

**Colecciones Disponibles:**
- `docs/POSTMAN_COLLECTION.json` 

**Para usar:**
1. Importa la colección en Postman
2. Crea un entorno con variable `base_url = http://localhost:8000/api`
3. Selecciona el entorno
4. Ejecuta los endpoints
5. Guarda respuestas como ejemplos para documentar

### Pruebas Funcionales

**Casos de prueba incluidos:**
- ✅ Creación de persona (natural y jurídica)
- ✅ Búsqueda por documento
- ✅ Actualización de datos
- ✅ Eliminación con confirmación
- ✅ Validaciones de campos
- ✅ Exportación PDF/Excel

---

## 📝 Estructura Git (Recomendada)

```
main
  └── develop (desarrollo)
      ├── feature/..
      ├── feature/..
      └── feature/..
```

### Convención de Commits

```
tipo(scope): descripción

Tipos:
- feat: Nueva funcionalidad
- fix: Corrección de bug
- docs: Documentación
- style: Formato, estilos
- refactor: Refactorización
- test: Tests
- chore: Mantenimiento

Ejemplos:
- feat(frontend): add export to PDF functionality
- fix(backend): correct document validation
- docs: update README with deployment info
```

---


## 🔐 Seguridad y Buenas Prácticas

- ✅ Validaciones en frontend y backend
- ✅ Campos de confirmación no persisten en BD
- ✅ CORS configurado correctamente
- ✅ Variables de entorno para configuración sensible
- ✅ Docker para aislamiento de servicios


---

## 👥 Autor

Yarlinson Tiberio Barranco Bastilla

Desarrollado como parte de una prueba técnica.

## 📄 Licencia

Este proyecto es de uso educativo/demostrativo.

---

**Última actualización:** Noviembre 2025  
**Versión:** 1.0.0
