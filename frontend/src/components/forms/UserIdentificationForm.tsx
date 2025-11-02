import React, { useState } from 'react';
import './FormSection.css';
import { Persona } from '../../types/persona';

interface UserIdentificationFormProps {
  onSearch: (data: { tipo_persona: string; tipo_documento: string; numero_documento: string }) => void;
  foundPersona?: Persona | null;
  error?: string | null;
}

const UserIdentificationForm: React.FC<UserIdentificationFormProps> = ({ 
  onSearch,
  foundPersona,
  error
}) => {
  const [formData, setFormData] = useState({
    tipo_persona: 'JURIDICA',
    tipo_documento: 'NIT',
    numero_documento: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div className="form-section">
      <div className="form-header">
        <h2>Identificación de usuarios recaudadores</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tipo_persona">Tipo de persona: *</label>
            <select
              id="tipo_persona"
              name="tipo_persona"
              value={formData.tipo_persona}
              onChange={handleChange}
              required
            >
              <option value="NATURAL">Persona Natural</option>
              <option value="JURIDICA">Persona Jurídica</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tipo_documento">Tipo de documento: *</label>
            <select
              id="tipo_documento"
              name="tipo_documento"
              value={formData.tipo_documento}
              onChange={handleChange}
              required
            >
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="NIT">NIT</option>
              <option value="CE">Cédula de Extranjería</option>
              <option value="PAS">Pasaporte</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="numero_documento">Número de documento: *</label>
            <input
              type="text"
              id="numero_documento"
              name="numero_documento"
              value={formData.numero_documento}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            Buscar
          </button>
        </div>
        
        {foundPersona && (
          <div className="alert alert-success">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Se ha encontrado la persona {foundPersona.tipo_persona === 'JURIDICA' ? 'jurídica' : 'natural'}</span>
          </div>
        )}
        
        {error && (
          <div className="alert alert-error">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserIdentificationForm;
