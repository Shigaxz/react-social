import React, { useState } from 'react'
import './Login.css'

function Login() {
    const [formData, setFormData] = useState({
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
        <h1 className='ti-l'>Inicia sesión</h1>
          <label className='lbl-l'>
            Nombre de Usuario:
            <input className='inp-l'
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label className='lbl-l'>
            Contraseña:
            <input className='inp-l'
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              required
            />
          </label>
          <button className='btn-l' type="submit">Iniciar</button>
        </form>
      </>
    );
}

export default Login