import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getUserByEmail } from "../firebase/firebaseFunctions";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        try {
          const user = await getUserByEmail(currentUser.email);
          setUserData(user);
          console.log("Usuario encontrado:", user);
        } catch (error) {
          console.error("Error obteniendo el usuario:", error);
        }
      }
    };

    fetchUser();
  }, [currentUser]); // Dependencia: se vuelve a ejecutar cuando currentUser cambia

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar">
      <div className="main">
        <Link to="/">
          <h1>SM-RC</h1>
        </Link>
      </div>
      <div className="login">
        {currentUser ? (
          <>
          <Link to="/myprofile">
            <span>Hola, {userData ? userData.nombre : "Cargando..."}</span>
          </Link>
            <button onClick={handleLogout} className="logout">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/register">
            <h2>Iniciar Sesión</h2>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
