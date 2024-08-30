import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
        <div className='main'>
          <Link to="/">
        <h1>SM-RC</h1>
          </Link>
        </div>
        <div className="login">
          <Link to="/register">
          <h2>Iniciar sesion</h2>
          </Link>
        </div>
    </div>
  )
}

export default Navbar