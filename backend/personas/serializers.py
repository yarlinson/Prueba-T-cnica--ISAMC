import logging
from rest_framework import serializers

from .models import Persona, Tarea

logger = logging.getLogger(__name__)


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = [
            'id', 'persona', 'titulo', 'descripcion', 'fecha_limite',
            'completada', 'created_at', 'updated_at'
        ]


class PersonaSerializer(serializers.ModelSerializer):
    tareas = TareaSerializer(many=True, read_only=True)

    confirmar_correo_electronico = serializers.EmailField(write_only=True, required=False)
    confirmar_numero_celular = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Persona
        fields = [
            'id', 'tipo_persona', 'tipo_documento', 'numero_documento',
            'digito_verificacion', 'pais', 'departamento', 'municipio',
            'direccion', 'razon_social', 'nombre_comercial', 'tipo_empresa_cacaotera',
            'correo_electronico', 'numero_celular', 'quien_diligencia',
            'cargo', 'area', 'created_at', 'updated_at',
            'tareas', 'confirmar_correo_electronico', 'confirmar_numero_celular'
        ]

    def validate(self, attrs):
        logger.error(f"🔍 Validando datos recibidos:")
        logger.error(f"   attrs: {attrs}")
        logger.error(f"   initial_data: {self.initial_data}")
        
        # Verificar campos requeridos
        campos_requeridos = ['tipo_persona', 'tipo_documento', 'numero_documento', 
                             'pais', 'departamento', 'municipio', 'direccion',
                             'correo_electronico', 'numero_celular']
        campos_faltantes = [campo for campo in campos_requeridos if not attrs.get(campo)]
        if campos_faltantes:
            logger.error(f"❌ Campos faltantes: {campos_faltantes}")
        
        correo = attrs.get('correo_electronico')
        correo_conf = self.initial_data.get('confirmar_correo_electronico')
        if correo_conf is not None and correo != correo_conf:
            raise serializers.ValidationError({'confirmar_correo_electronico': 'El correo no coincide.'})

        celular = attrs.get('numero_celular')
        celular_conf = self.initial_data.get('confirmar_numero_celular')
        if celular_conf is not None and celular != celular_conf:
            raise serializers.ValidationError({'confirmar_numero_celular': 'El celular no coincide.'})
        return attrs

    def create(self, validated_data):
        # Remover campos de confirmación antes de crear
        validated_data.pop('confirmar_correo_electronico', None)
        validated_data.pop('confirmar_numero_celular', None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Remover campos de confirmación antes de actualizar
        validated_data.pop('confirmar_correo_electronico', None)
        validated_data.pop('confirmar_numero_celular', None)
        return super().update(instance, validated_data)


