#!/bin/bash

# Script de inicio rápido para Docker

echo "🐳 Iniciando servicios Docker..."
echo ""

# Verificar si Docker está corriendo
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker no está corriendo. Por favor, inicia Docker Desktop."
    exit 1
fi

# Iniciar en modo desarrollo
echo "🚀 Iniciando en modo DESARROLLO (con hot-reload)..."
docker-compose -f docker-compose.dev.yml up --build

