export interface Persona {
  id?: number;
  tipo_persona: 'NATURAL' | 'JURIDICA';
  tipo_documento: 'CC' | 'NIT' | 'CE' | 'PAS';
  numero_documento: string;
  digito_verificacion?: string;
  pais: 'CO' | 'EC' | 'PE' | 'BO';
  departamento: 'ATL' | 'BOL' | 'CES';
  municipio: 'BOG' | 'MED' | 'CLO';
  direccion: string;
  razon_social?: string;
  nombre_comercial?: string;
  tipo_empresa_cacaotera?: 'COM' | 'TRA' | 'EXP';
  correo_electronico: string;
  confirmar_correo_electronico?: string;
  numero_celular: string;
  confirmar_numero_celular?: string;
  quien_diligencia?: string;
  cargo?: string;
  area?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Tarea {
  id?: number;
  persona: number;
  titulo: string;
  descripcion?: string;
  fecha_limite: string;
  completada: boolean;
  created_at?: string;
  updated_at?: string;
}
