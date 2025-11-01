from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Persona, Tarea
from .serializers import PersonaSerializer, TareaSerializer


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


class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.select_related('persona').all()
    serializer_class = TareaSerializer

