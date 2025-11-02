# Script de inicio rapido para Docker (PowerShell)
# Encoding: UTF-8

Write-Host "Iniciando servicios Docker..." -ForegroundColor Cyan
Write-Host ""

# Verificar si Docker esta corriendo
try {
    docker info | Out-Null
} catch {
    Write-Host "ERROR: Docker no esta corriendo. Por favor, inicia Docker Desktop." -ForegroundColor Red
    exit 1
}

# Iniciar en modo desarrollo
Write-Host "Iniciando en modo DESARROLLO (con hot-reload)..." -ForegroundColor Green
docker-compose -f docker-compose.dev.yml up --build

