// src/pages/CreateIncidentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const CreateIncidentForm = () => {
  const [formData, setFormData] = useState({
    asunto: '',
    tipo: '',
    descripcion: '',
    imagen: '',
    estado: 'pendiente',
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (newIncident) => {
      const response = await axios.post('http://localhost:3000/api/incidents', newIncident, {
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
      console.error('Error al crear la incidencia:', error);
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
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Crear Nueva Incidencia</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="asunto" className="block text-sm font-medium text-gray-700">Asunto</label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">Imagen (URL)</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="pendiente">Pendiente</option>
              <option value="resuelto">Resuelto</option>
              <option value="en-proceso">En Proceso</option>
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {mutation.isLoading ? 'Creando...' : 'Crear Incidencia'}
          </button>
          {mutation.isError && <div className="mt-4 text-red-600">Error: {mutation.error.message}</div>}
          {mutation.isSuccess && <div className="mt-4 text-green-600">Incidencia creada con éxito!</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateIncidentForm;
