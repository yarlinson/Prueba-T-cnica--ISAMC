-- Script de inicialización de PostgreSQL para Prueba Técnica
-- Ejecutar este script para crear la base de datos si no existe

-- Crear base de datos (ejecutar como superusuario)
-- psql -U postgres -f init_postgres.sql

-- Crear base de datos si no existe
SELECT 'CREATE DATABASE personas_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'personas_db')\gexec

-- Crear usuario si no existe (opcional, si quieres un usuario específico)
-- CREATE USER personas_user WITH PASSWORD 'personas_password';
-- GRANT ALL PRIVILEGES ON DATABASE personas_db TO personas_user;

-- Conectar a la base de datos
\c personas_db

-- Extensiones útiles (si las necesitas)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- Para búsquedas de texto

-- Mensaje de confirmación
SELECT 'Base de datos personas_db creada exitosamente' AS mensaje;

