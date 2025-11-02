# Script para configurar PostgreSQL en Windows PowerShell

Write-Host "🔧 Configurando PostgreSQL para Prueba Técnica..." -ForegroundColor Cyan
Write-Host ""

# Verificar si PostgreSQL está instalado
$pgPath = "C:\Program Files\PostgreSQL"
if (Test-Path $pgPath) {
    $pgVersions = Get-ChildItem $pgPath | Where-Object { $_.Name -match '^\d+$' }
    if ($pgVersions) {
        $latestVersion = $pgVersions | Sort-Object Name -Descending | Select-Object -First 1
        $psqlPath = Join-Path $pgPath $latestVersion.Name "bin\psql.exe"
        
        if (Test-Path $psqlPath) {
            Write-Host "✅ PostgreSQL encontrado en: $psqlPath" -ForegroundColor Green
        } else {
            Write-Host "❌ psql.exe no encontrado" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "❌ No se encontraron versiones de PostgreSQL" -ForegroundColor Red
        Write-Host "   Instala PostgreSQL desde: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "❌ PostgreSQL no está instalado" -ForegroundColor Red
    Write-Host "   Descarga desde: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📦 Creando base de datos 'personas_db'..." -ForegroundColor Cyan

# Intentar crear la base de datos
$createDbQuery = "CREATE DATABASE personas_db;"
try {
    & $psqlPath -U postgres -c $createDbQuery 2>&1 | Out-Null
    Write-Host "✅ Base de datos creada exitosamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Error al crear base de datos (puede que ya exista)" -ForegroundColor Yellow
    Write-Host "   Verifica manualmente con: psql -U postgres -c 'SELECT datname FROM pg_database;'" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host "   1. Copia backend/.env.example a backend/.env" -ForegroundColor White
Write-Host "   2. Edita backend/.env y configura:" -ForegroundColor White
Write-Host "      USE_POSTGRESQL=True" -ForegroundColor Yellow
Write-Host "      DB_NAME=personas_db" -ForegroundColor Yellow
Write-Host "      DB_USER=postgres" -ForegroundColor Yellow
Write-Host "      DB_PASSWORD=tu_password_postgres" -ForegroundColor Yellow
Write-Host "      DB_HOST=localhost" -ForegroundColor Yellow
Write-Host "      DB_PORT=5432" -ForegroundColor Yellow
Write-Host "   3. Ejecuta migraciones:" -ForegroundColor White
Write-Host "      cd backend" -ForegroundColor Gray
Write-Host "      .\venv\Scripts\Activate.ps1" -ForegroundColor Gray
Write-Host "      python manage.py migrate" -ForegroundColor Gray
Write-Host ""

