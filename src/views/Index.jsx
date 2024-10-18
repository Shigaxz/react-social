import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { getUserByEmail } from "../firebase/firebaseFunctions";
import MakePost from "../components/MainComponents/MakePost";
import Modal from "../Modal";
import Navbar from "../components/Navbar";
import FriendsComponent from "../components/MainComponents/FriendsComponent";
import LoadPosts from "../components/MainComponents/LoadPosts"
import "./Index.css";
const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        try {
          const user = await getUserByEmail(currentUser.email);
          setUserData(user);
        } catch (error) {
          console.error("Error obteniendo el usuario:", error);
        }
      }
    };
    fetchUser();
  }, [currentUser]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (!userData) {
    return (<>
        <Navbar />
        <div className="flex items-center justify-center h-screen">

        <div className="anyss">
        <h1 className="text-2xl font-semibold">Por favor antes de ingresar, inicia sesion.</h1>
        </div>
        </div>
        </>);
  }
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 grid-rows-5 gap-4 mt-3 ml-3 mr-3">
        <div className="pf-cont row-span-5 hidden lg:block">1</div>
        <div className="principal pf-cont col-span-5 lg:col-span-3 row-span-5">
          <h1 className="text-2xl font-semibold ml-6 pt-6">Bienvenido de vuelta...</h1>
          {userData ? <MakePost userId={userData.id} /> : "Loading data"}
          {userData ? <LoadPosts user={userData} /> : "Loading data"}
        </div>
        <div className="pf-cont row-span-5 col-start-5 hidden lg:block">
          <FriendsComponent user={userData} />
        </div>
      </div>
    </>
  );
};

export default Index;
