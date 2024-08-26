import React, { useState } from 'react'

function ShowHide() {
    const [show, setShow] = useState(true);

    const handleClick = (event) => {
        setShow(!show);
    }
  return (
    <div>
        <button className="show" onClick={handleClick}>{show ? "Ocultar" : "Mostrar"}</button>
        {show && <h2 className="mostrar">HIDE ME</h2>}
    </div>
  )
}

export default ShowHide