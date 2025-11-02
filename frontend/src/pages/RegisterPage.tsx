import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import UserIdentificationForm from '../components/forms/UserIdentificationForm';
import UserInfoForm from '../components/forms/UserInfoForm';
import SuccessModal from '../components/modals/SuccessModal';
import ErrorModal from '../components/modals/ErrorModal';
import InfoModal from '../components/modals/InfoModal';
import { Persona } from '../types/persona';
import { personasApi } from '../services/api';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [foundPersona, setFoundPersona] = useState<Persona | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchData, setSearchData] = useState<{ tipo_persona: string; tipo_documento: string; numero_documento: string } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSearch = useCallback(async (searchDataInput: { tipo_persona: string; tipo_documento: string; numero_documento: string }) => {
    try {
      setSearchError(null);
      setFoundPersona(null); // Limpiar persona anterior
      
      // Validar que el número de documento no esté vacío
      if (!searchDataInput.numero_documento || searchDataInput.numero_documento.trim() === '') {
        setSearchError('Por favor, ingresa un número de documento para buscar.');
        return;
      }
      
      // Guardar datos de búsqueda SIEMPRE, incluso si no se encuentra la persona
      // Esto es importante para poder crear una nueva persona
      setSearchData(searchDataInput);
      
      const response = await personasApi.getAll({ documento: searchDataInput.numero_documento });
      const personasData = Array.isArray(response.data) ? response.data : [];
      if (personasData.length > 0) {
        setFoundPersona(personasData[0]);
        // Actualizar URL sin recargar la página
        window.history.replaceState({}, '', `/registro?documento=${searchDataInput.numero_documento}`);
      } else {
        setFoundPersona(null);
        // IMPORTANTE: Mantener searchData aunque no se encuentre la persona
        // Esto permite crear una nueva persona con ese documento
        setSearchError(`No existe ninguna persona registrada con este ${searchDataInput.tipo_documento}. Puedes crear una nueva persona.`);
        // Mantener parámetro de URL para referencia
        window.history.replaceState({}, '', `/registro?documento=${searchDataInput.numero_documento}`);
      }
    } catch (error: any) {
      setFoundPersona(null);
      // Aún así, guardar los datos de búsqueda si el número de documento es válido
      if (searchDataInput.numero_documento && searchDataInput.numero_documento.trim() !== '') {
        setSearchData(searchDataInput);
      }
      setSearchError('Error al buscar la persona. Verifica que el backend esté corriendo.');
      window.history.replaceState({}, '', '/registro');
    }
  }, []);

  // Buscar persona automáticamente si hay parámetro documento en la URL
  useEffect(() => {
    const documentoParam = searchParams.get('documento');
    if (documentoParam) {
      handleSearch({
        tipo_persona: 'JURIDICA',
        tipo_documento: 'NIT',
        numero_documento: documentoParam,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSave = async (data: Persona) => {
    try {
      // Validar que los correos y teléfonos coincidan
      if (data.correo_electronico !== data.confirmar_correo_electronico) {
        setModalMessage('Los correos electrónicos no coinciden');
        setShowErrorModal(true);
        return;
      }
      if (data.numero_celular !== data.confirmar_numero_celular) {
        setModalMessage('Los números de celular no coinciden');
        setShowErrorModal(true);
        return;
      }

      // Combinar datos: Priorizar searchData (búsqueda) si existe, sino usar los del formulario
      const personaDataToSend: Persona = {
        ...data,
        // Si hay datos de búsqueda, usarlos (prioridad)
        // Si no, usar los del formulario de información
        tipo_persona: searchData?.tipo_persona 
          ? (searchData.tipo_persona as 'JURIDICA' | 'NATURAL')
          : data.tipo_persona,
        tipo_documento: searchData?.tipo_documento
          ? (searchData.tipo_documento as 'CC' | 'NIT' | 'CE' | 'PAS')
          : data.tipo_documento,
        numero_documento: searchData?.numero_documento || data.numero_documento || '',
      };
      
      // Validar que tengamos el número de documento antes de enviar
      if (!personaDataToSend.numero_documento || personaDataToSend.numero_documento.trim() === '') {
        setModalMessage('El número de documento es requerido. Por favor, busca la persona primero o asegúrate de ingresar el número de documento.');
        setShowErrorModal(true);
        return;
      }

      // Remover campos de confirmación antes de enviar
      const { confirmar_correo_electronico, confirmar_numero_celular, ...personaData } = personaDataToSend;
      
      // Log para debugging
      console.log('📤 Enviando datos al backend:', personaData);
      
      await personasApi.create(personaData);
      setModalMessage('Persona registrada exitosamente');
      setShowSuccessModal(true);
      // Limpiar formulario y URL
      setFoundPersona(null);
      setSearchError(null);
      setSearchData(null);
      window.history.replaceState({}, '', '/registro');
    } catch (error: any) {
      console.error('Error al guardar:', error.response?.data);
      // Mostrar error específico del backend
      let errorMessage = 'Error al guardar la persona';
      
      if (error.response?.data) {
        const backendErrors = error.response.data;
        // Si hay errores de campo específicos
        if (typeof backendErrors === 'object') {
          const errorFields = Object.keys(backendErrors);
          if (errorFields.length > 0) {
            const firstError = errorFields[0];
            const firstErrorMsg = Array.isArray(backendErrors[firstError]) 
              ? backendErrors[firstError][0] 
              : backendErrors[firstError];
            errorMessage = `${firstError}: ${firstErrorMsg}`;
          }
        } else if (typeof backendErrors === 'string') {
          errorMessage = backendErrors;
        } else if (backendErrors.detail) {
          errorMessage = backendErrors.detail;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setModalMessage(errorMessage);
      setShowErrorModal(true);
    }
  };

  const handleUpdate = async (data: Persona) => {
    try {
      if (!foundPersona?.id) return;

      if (data.correo_electronico !== data.confirmar_correo_electronico) {
        setModalMessage('Los correos electrónicos no coinciden');
        setShowErrorModal(true);
        return;
      }
      if (data.numero_celular !== data.confirmar_numero_celular) {
        setModalMessage('Los números de celular no coinciden');
        setShowErrorModal(true);
        return;
      }

      const { confirmar_correo_electronico, confirmar_numero_celular, ...personaData } = data;
      
      await personasApi.update(foundPersona.id, personaData);
      setModalMessage('Persona actualizada exitosamente');
      setShowSuccessModal(true);
    } catch (error: any) {
      setModalMessage(error.response?.data?.detail || 'Error al actualizar la persona');
      setShowErrorModal(true);
    }
  };

  return (
    <div className="register-page">
      <Sidebar activeSection="identificacion" />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <UserIdentificationForm 
            onSearch={handleSearch}
            foundPersona={foundPersona}
            error={searchError}
          />
          <UserInfoForm
            initialData={foundPersona}
            searchData={searchData}
            onSave={handleSave}
            onUpdate={handleUpdate}
            setModalMessage={setModalMessage}
            setShowErrorModal={setShowErrorModal}
          />
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onAccept={() => {
          setShowSuccessModal(false);
          setFoundPersona(null);
          setSearchError(null);
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
    </div>
  );
};

export default RegisterPage;
