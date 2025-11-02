"""
Script para crear datos de prueba en la base de datos
Ejecutar: python manage.py shell < create_test_data.py
O: python create_test_data.py (desde el directorio backend)
"""

import os
import sys
import django

# Configurar Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'personas_api.settings')
django.setup()

from personas.models import Persona, Tarea
from datetime import date, timedelta

def create_test_data():
    """Crea datos de prueba para facilitar las pruebas"""
    
    print("🧪 Creando datos de prueba...")
    
    # Eliminar datos existentes (opcional)
    # Persona.objects.all().delete()
    # print("   Datos anteriores eliminados")
    
    # Persona 1: Jurídica
    persona1, created1 = Persona.objects.get_or_create(
        numero_documento='900123456',
        defaults={
            'tipo_persona': 'JURIDICA',
            'tipo_documento': 'NIT',
            'digito_verificacion': '1',
            'pais': 'CO',
            'departamento': 'ATL',
            'municipio': 'BOG',
            'direccion': 'Calle 123 #45-67',
            'razon_social': 'Empresa Ejemplo S.A.S.',
            'nombre_comercial': 'Ejemplo Company',
            'tipo_empresa_cacaotera': 'COM',
            'correo_electronico': 'contacto@ejemplo.com',
            'numero_celular': '3001234567',
            'quien_diligencia': 'Juan Pérez',
            'cargo': 'Gerente General',
            'area': 'Administración',
        }
    )
    
    if created1:
        print(f"✅ Persona jurídica creada: {persona1.razon_social} (ID: {persona1.id})")
        
        # Crear tarea para persona 1
        tarea1 = Tarea.objects.create(
            persona=persona1,
            titulo='Revisar documentación fiscal',
            descripcion='Verificar y actualizar todos los documentos fiscales de la empresa',
            fecha_limite=date.today() + timedelta(days=30),
            completada=False
        )
        print(f"   ✅ Tarea creada: {tarea1.titulo}")
    else:
        print(f"⚠️  Persona jurídica ya existe: {persona1.razon_social}")
    
    # Persona 2: Natural
    persona2, created2 = Persona.objects.get_or_create(
        numero_documento='1234567890',
        defaults={
            'tipo_persona': 'NATURAL',
            'tipo_documento': 'CC',
            'pais': 'CO',
            'departamento': 'BOL',
            'municipio': 'MED',
            'direccion': 'Carrera 10 #20-30',
            'correo_electronico': 'persona@ejemplo.com',
            'numero_celular': '3201234567',
            'quien_diligencia': 'María García',
            'cargo': 'Coordinadora',
            'area': 'Comercial',
        }
    )
    
    if created2:
        print(f"✅ Persona natural creada: {persona2.quien_diligencia} (ID: {persona2.id})")
        
        # Crear tarea para persona 2
        tarea2 = Tarea.objects.create(
            persona=persona2,
            titulo='Actualizar información de contacto',
            descripcion='Verificar y actualizar datos de contacto en el sistema',
            fecha_limite=date.today() + timedelta(days=15),
            completada=True
        )
        print(f"   ✅ Tarea creada: {tarea2.titulo} (Completada)")
    else:
        print(f"⚠️  Persona natural ya existe: {persona2.quien_diligencia}")
    
    # Persona 3: Jurídica Transformadora
    persona3, created3 = Persona.objects.get_or_create(
        numero_documento='800987654',
        defaults={
            'tipo_persona': 'JURIDICA',
            'tipo_documento': 'NIT',
            'digito_verificacion': '2',
            'pais': 'CO',
            'departamento': 'CES',
            'municipio': 'CLO',
            'direccion': 'Avenida 5 #10-20',
            'razon_social': 'Cacao del Valle S.A.',
            'nombre_comercial': 'CacaoValle',
            'tipo_empresa_cacaotera': 'TRA',
            'correo_electronico': 'info@cacaovalle.com',
            'numero_celular': '3159876543',
            'quien_diligencia': 'Carlos Rodríguez',
            'cargo': 'Director',
            'area': 'Operaciones',
        }
    )
    
    if created3:
        print(f"✅ Persona jurídica creada: {persona3.razon_social} (ID: {persona3.id})")
    else:
        print(f"⚠️  Persona jurídica ya existe: {persona3.razon_social}")
    
    # Resumen
    total_personas = Persona.objects.count()
    total_tareas = Tarea.objects.count()
    
    print("\n" + "="*50)
    print(f"📊 Resumen:")
    print(f"   Total Personas: {total_personas}")
    print(f"   Total Tareas: {total_tareas}")
    print("="*50)
    print("\n✅ Datos de prueba creados exitosamente!")
    print("\n📝 Puedes probar:")
    print("   - Buscar documento: 900123456")
    print("   - Buscar documento: 1234567890")
    print("   - Buscar documento: 800987654")
    print("   - Ver en /listado todas las personas")

if __name__ == '__main__':
    create_test_data()

