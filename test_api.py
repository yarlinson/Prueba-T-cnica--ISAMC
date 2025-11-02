"""
Script de prueba rápida para verificar que la API funciona correctamente.
Ejecutar: python test_api.py
"""
import requests
import json

BASE_URL = "http://localhost:8000/api"

def print_response(title, response):
    """Imprime la respuesta de forma legible"""
    print(f"\n{'='*50}")
    print(f"📋 {title}")
    print(f"{'='*50}")
    print(f"Status: {response.status_code}")
    try:
        print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
    except:
        print(f"Response: {response.text}")
    print()

def test_api():
    """Ejecuta pruebas básicas de la API"""
    
    print("🚀 Iniciando pruebas de API...")
    print(f"URL Base: {BASE_URL}\n")
    
    # Datos de prueba
    persona_data = {
        "tipo_persona": "JURIDICA",
        "tipo_documento": "NIT",
        "numero_documento": "900123456",
        "digito_verificacion": "1",
        "pais": "CO",
        "departamento": "ATL",
        "municipio": "BOG",
        "direccion": "Calle 123 #45-67",
        "razon_social": "Empresa Test S.A.S.",
        "nombre_comercial": "Test Company",
        "tipo_empresa_cacaotera": "COM",
        "correo_electronico": "test@example.com",
        "numero_celular": "3001234567",
        "quien_diligencia": "Juan Pérez",
        "cargo": "Gerente",
        "area": "Administración"
    }
    
    try:
        # 1. GET - Listar personas (debería estar vacío o con datos)
        print("1️⃣ Probando GET /api/personas/")
        response = requests.get(f"{BASE_URL}/personas/")
        print_response("GET /personas/", response)
        
        # 2. POST - Crear persona
        print("2️⃣ Probando POST /api/personas/")
        response = requests.post(
            f"{BASE_URL}/personas/",
            json=persona_data,
            headers={"Content-Type": "application/json"}
        )
        print_response("POST /personas/", response)
        
        if response.status_code == 201:
            persona_id = response.json().get('id')
            
            # 3. GET - Obtener persona específica
            print(f"3️⃣ Probando GET /api/personas/{persona_id}/")
            response = requests.get(f"{BASE_URL}/personas/{persona_id}/")
            print_response(f"GET /personas/{persona_id}/", response)
            
            # 4. GET - Filtrar por documento
            print("4️⃣ Probando GET /api/personas/?documento=900123456")
            response = requests.get(f"{BASE_URL}/personas/?documento=900123456")
            print_response("GET /personas/?documento=900123456", response)
            
            # 5. PUT - Actualizar persona
            print(f"5️⃣ Probando PUT /api/personas/{persona_id}/")
            persona_data_updated = persona_data.copy()
            persona_data_updated["razon_social"] = "Empresa Actualizada S.A.S."
            response = requests.put(
                f"{BASE_URL}/personas/{persona_id}/",
                json=persona_data_updated,
                headers={"Content-Type": "application/json"}
            )
            print_response(f"PUT /personas/{persona_id}/", response)
            
            # 6. DELETE - Eliminar persona
            print(f"6️⃣ Probando DELETE /api/personas/{persona_id}/")
            response = requests.delete(f"{BASE_URL}/personas/{persona_id}/")
            print_response(f"DELETE /personas/{persona_id}/", response)
            
            if response.status_code == 204:
                print("✅ Persona eliminada correctamente")
            
        else:
            print(f"❌ Error al crear persona: {response.status_code}")
            print(response.text)
        
        # 7. GET - Verificar que fue eliminada
        print("\n7️⃣ Verificando que la persona fue eliminada")
        response = requests.get(f"{BASE_URL}/personas/?documento=900123456")
        print_response("GET /personas/?documento=900123456", response)
        
        print("\n" + "="*50)
        print("✅ PRUEBAS COMPLETADAS")
        print("="*50)
        
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: No se puede conectar al servidor")
        print("   Asegúrate de que el servidor Django esté corriendo:")
        print("   cd backend")
        print("   .\\venv\\Scripts\\Activate.ps1")
        print("   python manage.py runserver")
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")

if __name__ == "__main__":
    test_api()

