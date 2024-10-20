import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { getUserByEmail } from "../firebase/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Navbar from "../components/Navbar";
import Profile from "../components/MainComponents/Profile";
import UserPost from "../components/MainComponents/UserPost";
const UserProfile = ({ user }) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        try {
          const userData = await getUserByEmail(currentUser.email);
          if (user.id == userData) {
            navigate("/myprofile")
          }
          setUserData(userData);
        } catch (error) {
          console.error("Error obteniendo el usuario:", error);
        }
      }
    };
    fetchUser();
  }, [currentUser]);

  //AGREGAR BOTON DE AGREGAR AMIGO / ELIMINAR

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 grid-rows-5 gap-4 mt-3 ml-3 mr-3">
        <div className="pf-cont row-span-5 hidden lg:block">1</div>
        <div className="principal pf-cont col-span-5 lg:col-span-3 row-span-5">
          <Profile user={user} />
          {user ? <UserPost user={user} /> : "Loading data"}
        </div>
        <div className="pf-cont row-span-5 col-start-5 hidden lg:block">
          <FriendsComponent user={userData} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
