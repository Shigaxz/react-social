import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Register from '../components/Register/Register';
import Login from '../components/Register/Login';

import './Register.css'

function RegisterPage() {
  const [show, setShow] = useState(true);

    const handleClick = (event) => {
        setShow(!show);
    }
  return (
    <>
    <Navbar />
    <div className='RegisterPage'>
    {show ? <Register /> : <Login />}
    <button className="btn-change" onClick={handleClick}>{show ? "¿Ya tienes una cuenta?" : "Crea una cuenta"}</button>
    </div>
    </>
  )
}

export default RegisterPage