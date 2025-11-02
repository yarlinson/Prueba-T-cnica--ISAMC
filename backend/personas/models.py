from django.db import models


class Persona(models.Model):
    NATURAL = 'NATURAL'
    JURIDICA = 'JURIDICA'
    TIPO_PERSONA_CHOICES = [
        (NATURAL, 'Persona natural'),
        (JURIDICA, 'Persona jurídica'),
    ]

    CC = 'CC'
    NIT = 'NIT'
    CE = 'CE'
    PAS = 'PAS'
    TIPO_DOCUMENTO_CHOICES = [
        (CC, 'Cédula de ciudadanía'),
        (NIT, 'NIT'),
        (CE, 'Cédula de extranjería'),
        (PAS, 'Pasaporte'),
    ]

    tipo_persona = models.CharField(max_length=20, choices=TIPO_PERSONA_CHOICES)
    tipo_documento = models.CharField(max_length=10, choices=TIPO_DOCUMENTO_CHOICES)
    numero_documento = models.CharField(max_length=30, unique=True)
    digito_verificacion = models.CharField(max_length=2, blank=True)

    # Geografía según mockup
    COLOMBIA = 'CO'
    ECUADOR = 'EC'
    PERU = 'PE'
    BOLIVIA = 'BO'
    PAISES_CHOICES = [
        (COLOMBIA, 'Colombia'),
        (ECUADOR, 'Ecuador'),
        (PERU, 'Perú'),
        (BOLIVIA, 'Bolivia'),
    ]

    ATLANTICO = 'ATL'
    BOLIVAR = 'BOL'
    CESAR = 'CES'
    DEPARTAMENTOS_CHOICES = [
        (ATLANTICO, 'Atlántico'),
        (BOLIVAR, 'Bolívar'),
        (CESAR, 'Cesar'),
    ]

    BOGOTA = 'BOG'
    MEDELLIN = 'MED'
    CALI = 'CLO'
    MUNICIPIOS_CHOICES = [
        (BOGOTA, 'Bogotá D. C.'),
        (MEDELLIN, 'Medellín'),
        (CALI, 'Cali'),
    ]

    pais = models.CharField(max_length=2, choices=PAISES_CHOICES)
    departamento = models.CharField(max_length=3, choices=DEPARTAMENTOS_CHOICES)
    municipio = models.CharField(max_length=3, choices=MUNICIPIOS_CHOICES)
    direccion = models.CharField(max_length=200)

    razon_social = models.CharField(max_length=150, blank=True)
    nombre_comercial = models.CharField(max_length=150, blank=True)
    # Tipo de empresa cacaotera
    COMERCIALIZADOR = 'COM'
    TRANSFORMADOR = 'TRA'
    EXPORTADOR = 'EXP'
    TIPO_EMPRESA_CACAOTERA_CHOICES = [
        (COMERCIALIZADOR, 'Comercializador'),
        (TRANSFORMADOR, 'Transformador'),
        (EXPORTADOR, 'Exportador'),
    ]
    tipo_empresa_cacaotera = models.CharField(
        max_length=3,
        choices=TIPO_EMPRESA_CACAOTERA_CHOICES,
        blank=True,
    )

    correo_electronico = models.EmailField()
    numero_celular = models.CharField(max_length=20)

    quien_diligencia = models.CharField(max_length=120, blank=True)
    cargo = models.CharField(max_length=120, blank=True)
    area = models.CharField(max_length=120, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:  # pragma: no cover
        return f"{self.numero_documento} - {self.razon_social or self.tipo_persona}"


class Tarea(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='tareas')
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    fecha_limite = models.DateField()
    completada = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['completada', 'fecha_limite']

    def __str__(self) -> str:  # pragma: no cover
        return f"{self.titulo} ({'✔' if self.completada else '✗'})"
