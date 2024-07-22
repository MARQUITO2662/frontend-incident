// src/pages/EditIncidentForm.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

const EditIncidentForm = () => {
  const [formData, setFormData] = useState({
    asunto: '',
    tipo: '',
    descripcion: '',
    imagen: '',
    estado: 'pendiente',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/incidents/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al obtener la incidencia:', error);
      }
    };

    fetchIncident();
  }, [id]);

  const mutation = useMutation({
    mutationFn: async (updatedIncident) => {
      const response = await axios.put(`http://localhost:3000/api/incidents/${id}`, updatedIncident, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Error al actualizar la incidencia:', error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Editar Incidencia</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="asunto">Asunto</label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="tipo">Tipo</label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="imagen">Imagen</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="resuelto">Resuelto</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIncidentForm;
