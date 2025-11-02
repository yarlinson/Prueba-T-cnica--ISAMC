import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Persona } from '../types/persona';

/**
 * Convierte los valores del modelo a etiquetas legibles
 */
const getTipoPersonaLabel = (tipo: string): string => {
  return tipo === 'JURIDICA' ? 'Jurídica' : 'Natural';
};

const getTipoEmpresaLabel = (tipo?: string): string => {
  const labels: { [key: string]: string } = {
    'COM': 'Comercializador',
    'TRA': 'Transformador',
    'EXP': 'Exportador',
  };
  return tipo ? labels[tipo] || tipo : '-';
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO');
};

/**
 * Exporta las personas a PDF
 */
export const exportToPDF = (personas: Persona[], filename?: string): void => {
  try {
    const doc = new jsPDF('landscape', 'mm', 'a4');
    
    // Título
    doc.setFontSize(18);
    doc.setTextColor(30, 30, 30);
    doc.text('Usuarios Recaudadores Identificados', 14, 15);
    
    // Fecha de exportación
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha de exportación: ${new Date().toLocaleDateString('es-CO')}`, 14, 22);
    
    // Total de registros
    doc.setFontSize(10);
    doc.text(`Total de registros: ${personas.length}`, 14, 27);
    
    // Tabla
    const tableData = personas.map(persona => [
      persona.id?.toString() || '-',
      formatDate(persona.created_at),
      persona.numero_documento || '-',
      persona.razon_social || '-',
      getTipoPersonaLabel(persona.tipo_persona),
      getTipoEmpresaLabel(persona.tipo_empresa_cacaotera),
      persona.correo_electronico || '-',
      persona.numero_celular || '-',
      persona.quien_diligencia || '-',
      'Activo'
    ]);

    autoTable(doc, {
      head: [[
        'ID',
        'Fecha',
        'NIT',
        'Razón Social',
        'Naturaleza',
        'Tipo Empresa Cacaotera',
        'Correo',
        'Celular',
        'Representante Legal',
        'Estado'
      ]],
      body: tableData,
      startY: 32,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        textColor: [30, 30, 30],
      },
      headStyles: {
        fillColor: [255, 107, 53],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
      margin: { top: 32, right: 14, bottom: 20, left: 14 },
    });

    // Guardar PDF
    const finalFilename = filename || `usuarios_recaudadores_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(finalFilename);
  } catch (error) {
    console.error('Error al generar PDF:', error);
    throw new Error('Error al generar el archivo PDF');
  }
};

/**
 * Exporta las personas a Excel
 */
export const exportToExcel = (personas: Persona[], filename?: string): void => {
  try {
    // Preparar datos para Excel
    const excelData = personas.map(persona => ({
      'ID': persona.id || '',
      'Fecha': formatDate(persona.created_at),
      'NIT': persona.numero_documento || '',
      'Razón Social': persona.razon_social || '',
      'Naturaleza de la Empresa': getTipoPersonaLabel(persona.tipo_persona),
      'Tipo de Empresa Cacaotera': getTipoEmpresaLabel(persona.tipo_empresa_cacaotera),
      'Correo Electrónico': persona.correo_electronico || '',
      'Número de Celular': persona.numero_celular || '',
      'Nombre de Representante Legal': persona.quien_diligencia || '',
      'Cargo': persona.cargo || '',
      'Área': persona.area || '',
      'Dirección': persona.direccion || '',
      'País': persona.pais || '',
      'Departamento': persona.departamento || '',
      'Municipio': persona.municipio || '',
      'Estado': 'Activo',
    }));

    // Crear workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios Recaudadores');

    // Configurar ancho de columnas
    const columnWidths = [
      { wch: 5 },  // ID
      { wch: 12 }, // Fecha
      { wch: 15 }, // NIT
      { wch: 30 }, // Razón Social
      { wch: 20 }, // Naturaleza
      { wch: 25 }, // Tipo Empresa
      { wch: 25 }, // Correo
      { wch: 15 }, // Celular
      { wch: 30 }, // Representante
      { wch: 15 }, // Cargo
      { wch: 20 }, // Área
      { wch: 35 }, // Dirección
      { wch: 12 }, // País
      { wch: 15 }, // Departamento
      { wch: 15 }, // Municipio
      { wch: 10 }, // Estado
    ];
    worksheet['!cols'] = columnWidths;

    // Guardar archivo
    const finalFilename = filename || `usuarios_recaudadores_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, finalFilename);
  } catch (error) {
    console.error('Error al generar Excel:', error);
    throw new Error('Error al generar el archivo Excel');
  }
};

