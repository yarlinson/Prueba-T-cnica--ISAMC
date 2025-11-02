#!/bin/bash
set -e

echo "⏳ Esperando PostgreSQL..."

# Esperar a que PostgreSQL esté listo
until nc -z db 5432; do
  echo "   PostgreSQL no está listo, esperando..."
  sleep 1
done

echo "✅ PostgreSQL está listo!"

# Ejecutar migraciones
echo "📦 Ejecutando migraciones..."
python manage.py migrate --noinput

echo "✅ Migraciones completadas!"

# Recopilar archivos estáticos (opcional, descomentar si es necesario)
# echo "📁 Recopilando archivos estáticos..."
# python manage.py collectstatic --noinput || true

echo "🚀 Iniciando servidor Django..."

# Ejecutar el comando que se pasó
exec "$@"
