"""
Django management command para crear datos de prueba
Uso: python manage.py create_test_data
"""

from django.core.management.base import BaseCommand
from personas.models import Persona, Tarea
from datetime import date, timedelta


class Command(BaseCommand):
    help = 'Crea datos de prueba para facilitar las pruebas del sistema'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🧪 Creando datos de prueba...'))
        
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
            self.stdout.write(self.style.SUCCESS(f'✅ Persona jurídica creada: {persona1.razon_social}'))
            tarea1 = Tarea.objects.create(
                persona=persona1,
                titulo='Revisar documentación fiscal',
                descripcion='Verificar y actualizar todos los documentos fiscales',
                fecha_limite=date.today() + timedelta(days=30),
                completada=False
            )
            self.stdout.write(self.style.SUCCESS(f'   ✅ Tarea creada: {tarea1.titulo}'))
        else:
            self.stdout.write(self.style.WARNING(f'⚠️  Persona jurídica ya existe: {persona1.razon_social}'))
        
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
            self.stdout.write(self.style.SUCCESS(f'✅ Persona natural creada: {persona2.quien_diligencia}'))
            tarea2 = Tarea.objects.create(
                persona=persona2,
                titulo='Actualizar información de contacto',
                descripcion='Verificar y actualizar datos de contacto',
                fecha_limite=date.today() + timedelta(days=15),
                completada=True
            )
            self.stdout.write(self.style.SUCCESS(f'   ✅ Tarea creada: {tarea2.titulo}'))
        else:
            self.stdout.write(self.style.WARNING(f'⚠️  Persona natural ya existe: {persona2.quien_diligencia}'))
        
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
            self.stdout.write(self.style.SUCCESS(f'✅ Persona jurídica creada: {persona3.razon_social}'))
        else:
            self.stdout.write(self.style.WARNING(f'⚠️  Persona jurídica ya existe: {persona3.razon_social}'))
        
        # Resumen
        total_personas = Persona.objects.count()
        total_tareas = Tarea.objects.count()
        
        self.stdout.write(self.style.SUCCESS('\n' + '='*50))
        self.stdout.write(self.style.SUCCESS(f'📊 Resumen:'))
        self.stdout.write(self.style.SUCCESS(f'   Total Personas: {total_personas}'))
        self.stdout.write(self.style.SUCCESS(f'   Total Tareas: {total_tareas}'))
        self.stdout.write(self.style.SUCCESS('='*50))
        self.stdout.write(self.style.SUCCESS('\n✅ Datos de prueba listos!'))
        self.stdout.write(self.style.SUCCESS('\n📝 Puedes probar buscar:'))
        self.stdout.write(self.style.SUCCESS('   - Documento: 900123456'))
        self.stdout.write(self.style.SUCCESS('   - Documento: 1234567890'))
        self.stdout.write(self.style.SUCCESS('   - Documento: 800987654'))

