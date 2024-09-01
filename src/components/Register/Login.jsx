import React, { useState } from "react";
import { loginUser } from "../../firebase/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      navigate("/");
    } catch (error) {
      toast.error("No se ha podido iniciar sesion");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="form-r">
        <h1 className="ti-l">Inicia sesión</h1>
        <label className="lbl-l">
          Correo:
          <input
            className="inp-l"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="lbl-l">
          Contraseña:
          <input
            className="inp-l"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="btn-l" type="submit">
          Iniciar
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default Login;
