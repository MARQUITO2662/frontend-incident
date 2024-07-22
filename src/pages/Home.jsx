// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Sistema de Gestión de Incidencias</h1>
        <p className="text-lg mb-8 text-gray-600">Bienvenido al sistema de gestión de incidencias. Elige una opción para continuar.</p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleRegisterClick}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M12 4v16"></path></svg> Registrar
          </button>
          <button
            onClick={handleLoginClick}
            className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
          >
            <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M12 4v16"></path></svg> Iniciar Sesión
          </button>
        </div>
        <footer className="mt-8 text-gray-600 text-sm">
          <p>© 2024 Sistema de Gestión de Incidencias. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
