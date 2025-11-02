import React, { useState, useEffect } from 'react';
import './FormSection.css';
import { Persona } from '../../types/persona';

interface UserInfoFormProps {
  initialData?: Persona | null;
  searchData?: { tipo_persona: string; tipo_documento: string; numero_documento: string } | null;
  onSave: (data: Persona) => void;
  onUpdate: (data: Persona) => void;
  setModalMessage?: (message: string) => void;
  setShowErrorModal?: (show: boolean) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ initialData, searchData, onSave, onUpdate, setModalMessage, setShowErrorModal }) => {
  const [formData, setFormData] = useState<Persona>({
    tipo_persona: 'JURIDICA',
    tipo_documento: 'NIT',
    numero_documento: '',
    digito_verificacion: '',
    pais: 'CO',
    departamento: 'ATL',
    municipio: 'BOG',
    direccion: '',
    razon_social: '',
    nombre_comercial: '',
    tipo_empresa_cacaotera: 'COM',
    correo_electronico: '',
    confirmar_correo_electronico: '',
    numero_celular: '',
    confirmar_numero_celular: '',
    quien_diligencia: '',
    cargo: '',
    area: '',
  });

  useEffect(() => {
    if (initialData) {
      // Si hay datos iniciales (persona encontrada), usarlos
      setFormData({
        ...initialData,
        confirmar_correo_electronico: initialData.correo_electronico,
        confirmar_numero_celular: initialData.numero_celular,
      });
    } else if (searchData && !initialData) {
      // Si hay datos de búsqueda pero no se encontró persona, usar esos datos para crear nueva
      setFormData(prev => ({
        ...prev,
        tipo_persona: searchData.tipo_persona as 'NATURAL' | 'JURIDICA',
        tipo_documento: searchData.tipo_documento as 'CC' | 'NIT' | 'CE' | 'PAS',
        numero_documento: searchData.numero_documento,
      }));
    }
  }, [initialData, searchData]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos requeridos antes de crear
    if (!initialData?.id) {
      if (!formData.numero_documento || formData.numero_documento.trim() === '') {
        setModalMessage?.('El número de documento es requerido.');
        setShowErrorModal?.(true);
        return;
      }
      if (!formData.tipo_persona) {
        setModalMessage?.('El tipo de persona es requerido.');
        setShowErrorModal?.(true);
        return;
      }
      if (!formData.tipo_documento) {
        setModalMessage?.('El tipo de documento es requerido.');
        setShowErrorModal?.(true);
        return;
      }
    }
    
    if (initialData?.id) {
      onUpdate(formData);
    } else {
      onSave(formData);
    }
  };

  const handleGenerateAddress = () => {
    // Lógica para generar dirección automáticamente
    const address = `${formData.direccion || ''}`;
    setFormData({ ...formData, direccion: address });
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Información de usuarios recaudadores</h2>
      </div>
      {/* Mostrar información de documento si está disponible */}
      {formData.numero_documento && (
        <div className="alert alert-info" style={{ marginBottom: '20px', backgroundColor: '#dbeafe', color: '#1e40af', border: '1px solid #3b82f6', padding: '12px', borderRadius: '8px' }}>
          <strong>Documento a registrar:</strong> {formData.tipo_documento} - {formData.numero_documento}
          {formData.tipo_persona && ` (${formData.tipo_persona === 'JURIDICA' ? 'Jurídica' : 'Natural'})`}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pais">País *</label>
            <select
              id="pais"
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              required
            >
              <option value="CO">Colombia</option>
              <option value="EC">Ecuador</option>
              <option value="PE">Perú</option>
              <option value="BO">Bolivia</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="departamento">Departamento *</label>
            <select
              id="departamento"
              name="departamento"
              value={formData.departamento}
              onChange={handleChange}
              required
            >
              <option value="ATL">Atlántico</option>
              <option value="BOL">Bolívar</option>
              <option value="CES">Cesar</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="municipio">Municipio *</label>
            <select
              id="municipio"
              name="municipio"
              value={formData.municipio}
              onChange={handleChange}
              required
            >
              <option value="BOG">Bogotá D. C.</option>
              <option value="MED">Medellín</option>
              <option value="CLO">Cali</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="digito_verificacion">Dígito de verificación *</label>
            <input
              type="text"
              id="digito_verificacion"
              name="digito_verificacion"
              value={formData.digito_verificacion}
              onChange={handleChange}
              maxLength={2}
            />
          </div>
          <div className="form-group">
            <label htmlFor="razon_social">Razón Social</label>
            <input
              type="text"
              id="razon_social"
              name="razon_social"
              value={formData.razon_social}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre_comercial">Nombre Comercial</label>
            <input
              type="text"
              id="nombre_comercial"
              name="nombre_comercial"
              value={formData.nombre_comercial}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="direccion">Dirección *</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipo_empresa_cacaotera">Tipo de empresa cacaotera</label>
            <select
              id="tipo_empresa_cacaotera"
              name="tipo_empresa_cacaotera"
              value={formData.tipo_empresa_cacaotera}
              onChange={handleChange}
            >
              <option value="COM">Comercializador</option>
              <option value="TRA">Transformador</option>
              <option value="EXP">Exportador</option>
            </select>
          </div>
          <button type="button" className="btn-generate-address" onClick={handleGenerateAddress}>
            Generar Dirección
          </button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="correo_electronico">Correo Electrónico *</label>
            <input
              type="email"
              id="correo_electronico"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmar_correo_electronico">Confirmar correo electrónico *</label>
            <input
              type="email"
              id="confirmar_correo_electronico"
              name="confirmar_correo_electronico"
              value={formData.confirmar_correo_electronico}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="numero_celular">Número de Celular *</label>
            <input
              type="tel"
              id="numero_celular"
              name="numero_celular"
              value={formData.numero_celular}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmar_numero_celular">Confirmar número de celular *</label>
            <input
              type="tel"
              id="confirmar_numero_celular"
              name="confirmar_numero_celular"
              value={formData.confirmar_numero_celular}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quien_diligencia">Quien diligencia el formulario *</label>
            <input
              type="text"
              id="quien_diligencia"
              name="quien_diligencia"
              value={formData.quien_diligencia}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cargo">Cargo *</label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="area">Área *</label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-update" onClick={() => initialData && onUpdate(formData)}>
            Actualizar
          </button>
          <button type="submit" className="btn-save">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
