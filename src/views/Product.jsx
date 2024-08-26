import React from 'react'
import Navbar from '../components/Navbar'

function Product({producto}) {
  return (
    <div>
        <Navbar />
        <h1 className="titulo">{producto.nombre}</h1>
        <h3 className="descripcion">{producto.descripcion}</h3>
        <img src={producto.img} className="image" />
    </div>
  )
}

export default Product