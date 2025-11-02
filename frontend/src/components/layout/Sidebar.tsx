import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  activeSection?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || activeSection === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-user">
        <div className="user-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#4A90E2"/>
            <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#4A90E2"/>
          </svg>
        </div>
        <p className="user-text">Usuario Interno</p>
        <button className="btn-profile">Perfil</button>
        <button className="btn-logout">Cerrar Sesión</button>
      </div>
      <div className="sidebar-menu">
        <button className="btn-menu-primary">Gestor de Recaudo</button>
        <button 
          className={`btn-menu-secondary ${isActive('/registro') || isActive('identificacion') ? 'active' : ''}`}
          onClick={() => navigate('/registro')}
        >
          Identificación de usuarios recaudadores
        </button>
        <button 
          className={`btn-menu-secondary ${isActive('/listado') || isActive('listado') ? 'active' : ''}`}
          onClick={() => navigate('/listado')}
        >
          Usuarios recaudadores identificados
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
