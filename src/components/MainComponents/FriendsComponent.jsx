import React, { useState, useEffect } from "react";
import FriendSearch from "./FriendSearch";
import { getUserFriends } from "../../firebase/firebaseFunctions";
import FriendAdd from "./FriendAdd";
import FriendRequest from "./FriendRequest"
const FriendsComponent = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleAdd, setIsVisibleAdd] = useState(false);
  const [isVisibleReq, setIsVisibleReq] = useState(false);

  useEffect(() => {
    console.log(user)
    const fetchFriends = async () => {
      try {
        const friendsList = await getUserFriends(user.id);
        setFriends(friendsList);
      } catch (error) {
        setError("Error al cargar amigos.");
      }
    };

    fetchFriends();
  }, [user.id]);

  const toggleFriendSearch = () => {
    setIsVisible(!isVisible);
    setIsVisibleAdd(false); // Oculta el otro componente al mostrarse
    setIsVisibleReq(false); // Oculta el otro componente al mostrarse
  };

  const toggleFriendAdd = () => {
    setIsVisibleAdd(!isVisibleAdd);
    setIsVisibleReq(false); // Oculta el otro componente al mostrarse
  };

  const toggleRequest = () => {
    setIsVisibleReq(!isVisibleReq);
    setIsVisible(false); // Oculta el otro componente al mostrarse
    setIsVisibleAdd(false); // Oculta el otro componente al mostrarse
  };

  return (
    <>
      <div className="flex justify-center gap-3">
        <button onClick={toggleFriendSearch} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 mt-4 text-stone-50"
          >
            <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mt-4 text-center">
          Lista de amigos ({friends.length})
        </h2>
        <button onClick={toggleFriendAdd} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 mt-4 text-stone-50"
          >
            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
          </svg>
        </button>
        <button onClick={toggleRequest} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 mt-4 text-stone-50"
          >
            <path
              fillRule="evenodd"
              d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isVisible && <FriendSearch friends={friends} />}
      {isVisibleAdd && <FriendAdd user={user} />}
      {isVisibleReq && <FriendRequest userId={user.id} />}
      <div className="mt-2">
        <ul>
          {friends.length > 0 ? (
            friends.map((friend) => (
              <li
                key={friend.userId}
                className="friend-item flex items-center justify-start ml-1.5 mb-1.5"
              >
                <img
                  className="rounded-full w-11 h-11"
                  src={friend.photoURL}
                  alt={`${friend.nombre}'s profile`}
                />
                <span className="ml-1.5">{friend.nombre}</span>
              </li>
            ))
          ) : (
            <p className="text-center text-base">No tienes amigos agregados.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default FriendsComponent;
