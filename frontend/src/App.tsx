import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import ListPage from './pages/ListPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/registro" replace />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/listado" element={<ListPage />} />
      </Routes>
    </Router>
  );
}

export default App;