import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { getUserByEmail, sendFriendRequest } from "../firebase/firebaseFunctions";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Profile from "../components/MainComponents/Profile";
import UserPost from "../components/MainComponents/UserPost";
import FriendsComponent from "../components/MainComponents/FriendsComponent";
import ProfileFriend from "../components/MainComponents/ProfileFriend";
import ChatComponent from "../components/MainComponents/ChatComponent";
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

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 grid-rows-5 gap-4 mt-3 ml-3 mr-3">
        <div className="pf-cont row-span-5 hidden lg:block">
        {userData ? <ChatComponent user={userData}/> : "Loading Chat"} 
        </div>
        <div className="principal pf-cont col-span-5 lg:col-span-3 row-span-5">
          <Profile user={user} />
          {user && userData ? <ProfileFriend friendList={userData.friendList} userId={user.id} secondUserID={userData.id}/>: "ProfileFriend"}
          {user ? <UserPost user={user} /> : "Loading data"}
        </div>
        <div className="pf-cont row-span-5 col-start-5 hidden lg:block">
          {userData ? <FriendsComponent user={userData}/> : "Loading data"}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
