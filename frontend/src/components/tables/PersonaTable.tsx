import React from 'react';
import './PersonaTable.css';
import { Persona } from '../../types/persona';

interface PersonaTableProps {
  personas: Persona[];
  onEdit: (persona: Persona) => void;
  onDelete: (id: number) => void;
  onApprove: (id: number) => void;
}

const PersonaTable: React.FC<PersonaTableProps> = ({ 
  personas, 
  onEdit, 
  onDelete,
  onApprove 
}) => {
  const getTipoPersonaLabel = (tipo: string) => {
    return tipo === 'JURIDICA' ? 'Jurídica' : 'Natural';
  };

  const getTipoEmpresaLabel = (tipo?: string) => {
    const labels: { [key: string]: string } = {
      'COM': 'Comercializador',
      'TRA': 'Transformador',
      'EXP': 'Exportador',
    };
    return tipo ? labels[tipo] || tipo : '-';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO');
  };

  return (
    <div className="table-container">
      <table className="persona-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Fecha</th>
            <th>NIT</th>
            <th>Razón Social</th>
            <th>Naturaleza de la empresa</th>
            <th>Tipo de empresa <span className="highlight">cacaotera</span></th>
            <th>Correo Electrónico</th>
            <th>Número de Celular</th>
            <th>Nombre de representante legal</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.length === 0 ? (
            <tr>
              <td colSpan={11} className="empty-state">
                No hay personas registradas
              </td>
            </tr>
          ) : (
            personas.map((persona) => (
              <tr key={persona.id}>
                <td>{persona.id}</td>
                <td>{formatDate(persona.created_at)}</td>
                <td>{persona.numero_documento}</td>
                <td>{persona.razon_social || '-'}</td>
                <td>{getTipoPersonaLabel(persona.tipo_persona)}</td>
                <td>{getTipoEmpresaLabel(persona.tipo_empresa_cacaotera)}</td>
                <td>{persona.correo_electronico}</td>
                <td>{persona.numero_celular}</td>
                <td>{persona.quien_diligencia || '-'}</td>
                <td>
                  <span className="status-badge">Activo</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-action btn-edit"
                      onClick={() => persona.id && onEdit(persona)}
                      title="Editar"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button 
                      className="btn-action btn-approve"
                      onClick={() => persona.id && onApprove(persona.id)}
                      title="Aprobar"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </button>
                    <button 
                      className="btn-action btn-delete"
                      onClick={() => persona.id && onDelete(persona.id)}
                      title="Eliminar"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PersonaTable;
