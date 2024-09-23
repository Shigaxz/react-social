import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { registerUser } from "../../firebase/firebaseAuth";
import { addDocument } from "../../firebase/firebaseFunctions";

import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerUser(email, password);
      const photoURL = "/default-user.jpg";
      const newUser = {
        nombre,
        apellido,
        email,
        photoURL
      };
      if (newUser && user) {
        addDocument("user", newUser);
        toast.success("Cuenta creada correctamente");
        setNombre("");
        setApellido("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-r">
        <h1 className="ti-r">Regístrate</h1>
        <label className="lbl-r">
          Nombre:
          <input
            className="inp-r"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <label className="lbl-r">
          Apellido:
          <input
            className="inp-r"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </label>
        <label className="lbl-r">
          Correo:
          <input
            className="inp-r"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="lbl-r">
          Contraseña:
          <input
            className="inp-r"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="btn-r" type="submit">
          Registrar
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default Register;
