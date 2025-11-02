import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import PersonaTable from '../components/tables/PersonaTable';
import UserIdentificationForm from '../components/forms/UserIdentificationForm';
import SuccessModal from '../components/modals/SuccessModal';
import ErrorModal from '../components/modals/ErrorModal';
import InfoModal from '../components/modals/InfoModal';
import ConfirmModal from '../components/modals/ConfirmModal';
import { Persona } from '../types/persona';
import { personasApi } from '../services/api';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import './ListPage.css';

const ListPage: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [filteredPersonas, setFilteredPersonas] = useState<Persona[]>([]);
  const [foundPersona, setFoundPersona] = useState<Persona | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [personaToDelete, setPersonaToDelete] = useState<{ id: number; nombre: string } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = async () => {
    try {
      const response = await personasApi.getAll();
      const personasData = Array.isArray(response.data) ? response.data : [];
      setPersonas(personasData);
      setFilteredPersonas(personasData);
    } catch (error) {
      console.error('Error loading personas:', error);
      setPersonas([]);
      setFilteredPersonas([]);
    }
  };

  const handleSearch = async (searchData: { tipo_persona: string; tipo_documento: string; numero_documento: string }) => {
    try {
      setSearchError(null);
      const response = await personasApi.getAll({ documento: searchData.numero_documento });
      const personasData = Array.isArray(response.data) ? response.data : [];
      if (personasData.length > 0) {
        setFilteredPersonas(personasData);
        setFoundPersona(personasData[0]);
      } else {
        setFilteredPersonas([]);
        setFoundPersona(null);
        setSearchError(`No existe ninguna persona registrada con este ${searchData.tipo_documento}`);
      }
    } catch (error: any) {
      setFilteredPersonas([]);
      setFoundPersona(null);
      setSearchError('Error al buscar la persona. Verifica que el backend esté corriendo.');
    }
  };

  const handleEdit = (persona: Persona) => {
    // Navegar a página de registro y buscar la persona para cargarla
    // Usando el número de documento para que se cargue automáticamente
    window.location.href = `/registro?documento=${persona.numero_documento}`;
  };

  const handleDelete = (id: number) => {
    const persona = personas.find(p => p.id === id);
    const nombre = persona?.razon_social || persona?.numero_documento || 'esta persona';
    
    // Guardar datos y mostrar modal de confirmación
    setPersonaToDelete({ id, nombre });
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!personaToDelete) return;
    
    try {
      await personasApi.delete(personaToDelete.id);
      setModalMessage(`Persona "${personaToDelete.nombre}" eliminada exitosamente`);
      setShowSuccessModal(true);
      setShowConfirmModal(false);
      setPersonaToDelete(null);
      loadPersonas();
    } catch (error: any) {
      setModalMessage(error.response?.data?.detail || 'Error al eliminar la persona');
      setShowErrorModal(true);
      setShowConfirmModal(false);
      setPersonaToDelete(null);
    }
  };

  const handleApprove = async (id: number) => {
    // Lógica de aprobación
    setModalMessage('Persona aprobada exitosamente');
    setShowSuccessModal(true);
  };

  const handlePreRegister = () => {
    // Redirigir a página de registro o abrir modal
    setModalMessage('Funcionalidad de pre-registro');
    setShowInfoModal(true);
  };

  const handleExportPDF = () => {
    try {
      if (filteredPersonas.length === 0) {
        setModalMessage('No hay datos para exportar. Por favor, asegúrate de tener personas registradas.');
        setShowInfoModal(true);
        return;
      }
      
      setIsExporting(true);
      // Pequeño delay para mejorar UX
      setTimeout(() => {
        exportToPDF(filteredPersonas);
        setIsExporting(false);
        setModalMessage(`Se exportaron ${filteredPersonas.length} registros a PDF exitosamente.`);
        setShowSuccessModal(true);
      }, 100);
    } catch (error) {
      console.error('Error al exportar PDF:', error);
      setIsExporting(false);
      setModalMessage('Error al exportar el archivo PDF. Por favor, inténtalo nuevamente.');
      setShowErrorModal(true);
    }
  };

  const handleExportExcel = () => {
    try {
      if (filteredPersonas.length === 0) {
        setModalMessage('No hay datos para exportar. Por favor, asegúrate de tener personas registradas.');
        setShowInfoModal(true);
        return;
      }
      
      setIsExporting(true);
      // Pequeño delay para mejorar UX
      setTimeout(() => {
        exportToExcel(filteredPersonas);
        setIsExporting(false);
        setModalMessage(`Se exportaron ${filteredPersonas.length} registros a Excel exitosamente.`);
        setShowSuccessModal(true);
      }, 100);
    } catch (error) {
      console.error('Error al exportar Excel:', error);
      setIsExporting(false);
      setModalMessage('Error al exportar el archivo Excel. Por favor, inténtalo nuevamente.');
      setShowErrorModal(true);
    }
  };

  return (
    <div className="list-page">
      <Sidebar activeSection="listado" />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <div className="search-section">
            
            <UserIdentificationForm 
              onSearch={handleSearch}
              foundPersona={foundPersona}
              error={searchError}
            />
          </div>

          <div className="table-section">
            <div className="section-header">
              <h2>Usuarios recaudadores identificados</h2>
              <div className="section-actions">
                <button className="btn-pre-register" onClick={handlePreRegister}>
                  + Pre - registrar
                </button>
                <button 
                  className="btn-export pdf" 
                  onClick={handleExportPDF} 
                  title="Exportar PDF"
                  disabled={isExporting || filteredPersonas.length === 0}
                >
                  {isExporting ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spinning">
                      <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
                      <path d="M12 2 A10 10 0 0 1 22 12" strokeLinecap="round"></path>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  )}
                </button>
                <button 
                  className="btn-export excel" 
                  onClick={handleExportExcel} 
                  title="Exportar Excel"
                  disabled={isExporting || filteredPersonas.length === 0}
                >
                  {isExporting ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spinning">
                      <circle cx="12" cy="12" r="10" opacity="0.25"></circle>
                      <path d="M12 2 A10 10 0 0 1 22 12" strokeLinecap="round"></path>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="3" width="20" height="18" rx="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                      <line x1="7" y1="8" x2="17" y2="8"></line>
                      <line x1="7" y1="12" x2="17" y2="12"></line>
                      <line x1="7" y1="16" x2="17" y2="16"></line>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <PersonaTable
              personas={filteredPersonas}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onApprove={handleApprove}
            />
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onAccept={() => {
          setShowSuccessModal(false);
          loadPersonas();
        }}
        message={modalMessage}
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        onAccept={() => setShowErrorModal(false)}
        message={modalMessage}
      />

      <InfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        onAccept={() => setShowInfoModal(false)}
        message={modalMessage}
      />

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setPersonaToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="¿Estás seguro?"
        message={personaToDelete 
          ? `¿Estás seguro de que deseas eliminar "${personaToDelete.nombre}"?\n\nEsta acción no se puede deshacer.`
          : '¿Estás seguro de realizar esta acción?'
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default ListPage;
