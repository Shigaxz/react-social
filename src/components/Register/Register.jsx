import React, { useState } from 'react'
import './Register.css'

function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        username: '',
        contrasena: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // Aquí puedes agregar lógica para enviar los datos del formulario.
      };
    
  return (
      <>
        <form onSubmit={handleSubmit} className='form-r'>
        <h1 className='ti-r'>Regístrate</h1>
          <label className='lbl-r'>
            Nombre:
            <input className='inp-r'
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
          <label className='lbl-r'>
            Apellido:
            <input className='inp-r'
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </label>
          <label className='lbl-r'>
            Nombre de Usuario:
            <input className='inp-r'
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label className='lbl-r'>
            Contraseña:
            <input className='inp-r'
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              required
            />
          </label>
          <button className='btn-r' type="submit">Registrar</button>
        </form>
      </>
    );
}

export default Register