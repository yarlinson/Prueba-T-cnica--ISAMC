#!/bin/bash
# Script para configurar PostgreSQL en Linux/Mac

echo "🔧 Configurando PostgreSQL para Prueba Técnica..."
echo ""

# Verificar si PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL no está instalado."
    echo "   Instala PostgreSQL:"
    echo "   - Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib"
    echo "   - Mac: brew install postgresql"
    exit 1
fi

echo "✅ PostgreSQL está instalado"
echo ""

# Crear base de datos
echo "📦 Creando base de datos 'personas_db'..."
sudo -u postgres psql -c "CREATE DATABASE personas_db;" 2>/dev/null || echo "   Base de datos ya existe o error (continúe manualmente)"
echo ""

# Crear usuario (opcional)
echo "👤 Configurando usuario..."
echo "   Usuario por defecto: postgres"
echo "   Si necesitas crear un usuario específico, ejecuta:"
echo "   sudo -u postgres createuser -P personas_user"
echo ""

echo "✅ PostgreSQL configurado!"
echo ""
echo "📝 Configura las variables de entorno en backend/.env:"
echo "   USE_POSTGRESQL=True"
echo "   DB_NAME=personas_db"
echo "   DB_USER=postgres"
echo "   DB_PASSWORD=tu_password"
echo "   DB_HOST=localhost"
echo "   DB_PORT=5432"
echo ""
echo "🚀 Ejecuta las migraciones:"
echo "   cd backend"
echo "   python manage.py migrate"

