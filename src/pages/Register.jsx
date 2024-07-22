import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    piso: '',
    apartamento: '',
    rol: 'residente',
    telefono: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful!');
    } catch (error) {
      alert('Error registering: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="piso"
            value={formData.piso}
            onChange={handleChange}
            placeholder="Piso"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="apartamento"
            value={formData.apartamento}
            onChange={handleChange}
            placeholder="Apartamento"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="residente">Residente</option>
            <option value="administrador">Administrador</option>
          </select>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            Already registered? Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
