import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({id ,title , desc}) {
  return (
    <div className='Card'>
        <h2 className="titulo">{title}</h2>
        <Link to={id}>
        <p className="descripcion">{desc}</p>
        </Link>
    </div>
  )
}

export default Card