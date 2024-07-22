// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Incluye Home si decides usarlo
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateIncidentForm from './pages/CreateIncidentForm';
import EditIncidentForm from './pages/EditIncidentForm';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* O usa <Register /> si prefieres */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-incidencia" element={<CreateIncidentForm />} />
        <Route path="/editar-incidencia/:id" element={<EditIncidentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
