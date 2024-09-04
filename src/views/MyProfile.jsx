import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { getUserByEmail } from "../firebase/firebaseFunctions";
import Modal from "../Modal";
import EditProfile from "../components/EditProfile";
import Navbar from "../components/Navbar";
import Profile from "../components/MainComponents/Profile";
import "./MyProfile.css";

const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();
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
  }, [currentUser]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />

      <div className="grid grid-cols-5 grid-rows-5 gap-4 mt-3 ml-3 mr-3">
        <div className="pf-cont row-span-5">1</div>
        <div className="pf-cont col-span-3 row-span-5">
          <Profile user={userData}/>
          <button className="edit ml-9 p-1" onClick={openModal}>Editar Perfil</button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <EditProfile user={userData}/>
          </Modal>
        </div>
        <div className="pf-cont row-span-5 col-start-5">3</div>
      </div>
    </>
  );
};

export default MyProfile;
