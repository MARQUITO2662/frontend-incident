import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [incidencias, setIncidencias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/incidents');
        setIncidencias(response.data);
      } catch (error) {
        console.error('Error al obtener las incidencias:', error);
      }
    };

    fetchIncidencias();
  }, []);

  const handleCreateNewIncident = () => {
    navigate('/crear-incidencia');
  };

  const handleEditIncident = (id) => {
    navigate(`/editar-incidencia/${id}`);
  };

  const handleDeleteIncident = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/incidents/${id}`);
      setIncidencias(incidencias.filter((incidencia) => incidencia.id !== id));
    } catch (error) {
      console.error('Error al eliminar la incidencia:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <header className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-4xl font-bold">Incidencias</h1>
          <button 
            onClick={handleCreateNewIncident} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Crear Nueva Incidencia
          </button>
        </header>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Asunto</th>
                <th className="py-2 px-4 text-left">Tipo</th>
                <th className="py-2 px-4 text-left">Descripción</th>
                <th className="py-2 px-4 text-left">Imagen</th>
                <th className="py-2 px-4 text-left">Estado</th>
                <th className="py-2 px-4 text-left">Fecha de Creación</th>
                <th className="py-2 px-4 text-left">Fecha de Actualización</th>
                <th className="py-2 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {incidencias.map((incidencia) => (
                <tr key={incidencia.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{incidencia.id}</td>
                  <td className="py-2 px-4">{incidencia.asunto}</td>
                  <td className="py-2 px-4">{incidencia.tipo}</td>
                  <td className="py-2 px-4">{incidencia.descripcion}</td>
                  <td className="py-2 px-4">
                    {incidencia.imagen ? (
                      <img
                        src={incidencia.imagen.startsWith('http') ? incidencia.imagen : `http://localhost:3000/uploads/${incidencia.imagen}`}
                        alt="Imagen de incidencia"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      'Sin imagen'
                    )}
                  </td>
                  <td className="py-2 px-4">{incidencia.estado}</td>
                  <td className="py-2 px-4">{new Date(incidencia.fecha_de_creacion).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{new Date(incidencia.fecha_de_actualizacion).toLocaleDateString()}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button 
                      onClick={() => handleEditIncident(incidencia.id)} 
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDeleteIncident(incidencia.id)} 
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
