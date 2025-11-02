import logging
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Persona, Tarea
from .serializers import PersonaSerializer, TareaSerializer

logger = logging.getLogger(__name__)


class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['numero_documento', 'razon_social', 'correo_electronico']

    def get_queryset(self):
        queryset = super().get_queryset()
        documento = self.request.query_params.get('documento')
        if documento:
            queryset = queryset.filter(numero_documento=documento)
        return queryset

    def create(self, request, *args, **kwargs):
        logger.error(f"📥 Datos recibidos en POST /api/personas/: {request.data}")
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            logger.error(f"❌ Error al crear persona: {str(e)}")
            logger.error(f"📋 Datos que causaron el error: {request.data}")
            raise


class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.select_related('persona').all()
    serializer_class = TareaSerializer

