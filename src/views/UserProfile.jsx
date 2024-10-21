import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { getUserByEmail, sendFriendRequest } from "../firebase/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Profile from "../components/MainComponents/Profile";
import UserPost from "../components/MainComponents/UserPost";
import FriendsComponent from "../components/MainComponents/FriendsComponent";

const UserProfile = ({ user }) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        try {
          const userData = await getUserByEmail(currentUser.email);
          if (userData && userData.id == user.id) {
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
  const FriendDetect = async () => {
    const HandleClickAdd =  async () => {
      try {
        const res = await sendFriendRequest(userData.id, user.id);
      } catch (e) {
        console.error("Ocurrio un erro al enviar la solicitud de amistad", e);
      }
    }; 
    if (userData.friendList.includes(user.id)) {
      // SON AMIGOS
      return (
        <>
        <button className="ml-9 p-1 border border-white rounded-lg" >Amigo/a</button>
        </>
      );
    } else {
      return (
        <>
        <button className="ml-9 p-1 border border-white rounded-lg" onClick={HandleClickAdd}>Agregar Amigo</button>
        </>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 grid-rows-5 gap-4 mt-3 ml-3 mr-3">
        <div className="pf-cont row-span-5 hidden lg:block">1</div>
        <div className="principal pf-cont col-span-5 lg:col-span-3 row-span-5">
          <Profile user={user} />
          {user ? <UserPost user={user} /> : "Loading data"}
          <FriendDetect />
        </div>
        <div className="pf-cont row-span-5 col-start-5 hidden lg:block">
          {userData ? <FriendsComponent user={userData}/> : "Loading data"}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
