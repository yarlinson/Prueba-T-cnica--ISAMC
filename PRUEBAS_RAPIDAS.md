# ⚡ Pruebas Rápidas - Guía Express

## 🚀 Inicio Rápido

### 1. Crear Datos de Prueba

```bash
cd backend
.\venv\Scripts\Activate.ps1
python manage.py create_test_data
```

**Resultado:** Crea 3 personas de ejemplo con datos completos.

---

## ✅ Checklist de Pruebas (15 minutos)

### Prueba 1: Crear Persona ✅
- [ ] Ir a `/registro`
- [ ] Llenar formulario completo
- [ ] Click "Guardar"
- [ ] ✅ Ver modal de éxito
- [ ] ✅ Persona aparece en `/listado`

### Prueba 2: Buscar Persona ✅
- [ ] En `/registro`, buscar documento `900123456`
- [ ] ✅ Ver mensaje verde "Se ha encontrado..."
- [ ] ✅ Formulario se llena automáticamente

### Prueba 3: Actualizar Persona ✅
- [ ] Buscar persona existente
- [ ] Modificar algunos campos
- [ ] Click "Actualizar"
- [ ] ✅ Ver modal de éxito
- [ ] ✅ Cambios se guardan

### Prueba 4: Eliminar Persona ✅
- [ ] Ir a `/listado`
- [ ] Click botón rojo (eliminar) en una persona
- [ ] ✅ Confirmar eliminación
- [ ] ✅ Ver modal de éxito
- [ ] ✅ Persona desaparece de tabla

### Prueba 5: Modales ✅
- [ ] Crear persona → ✅ Modal éxito verde
- [ ] Correos diferentes → ✅ Modal error rojo
- [ ] Teléfonos diferentes → ✅ Modal error rojo

### Prueba 6: Validaciones ✅
- [ ] Dejar campos requeridos vacíos → ✅ Validación
- [ ] Email inválido → ✅ Validación
- [ ] Documento duplicado → ✅ Error del backend

---

## 🎯 Datos de Prueba Disponibles

Después de ejecutar `create_test_data`:

| Documento | Tipo | Nombre |
|-----------|------|--------|
| 900123456 | NIT | Empresa Ejemplo S.A.S. |
| 1234567890 | CC | María García |
| 800987654 | NIT | Cacao del Valle S.A. |

---

## 📝 Resultado Esperado

Si todas las pruebas pasan:
- ✅ Sistema funcional y listo
- ✅ Puedes documentar que todo funciona
- ✅ Listo para entregar

---

**Tiempo estimado:** 15-20 minutos

¡A probar! 🚀

