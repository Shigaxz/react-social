import React, { useState, useEffect } from "react";
import { getUserFriends } from "../../firebase/firebaseFunctions";
const ChatComponent = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [chatId, setChatId] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

  const FriendList = ({ friends }) => {
    return (
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
                <button onClick={() => setChatId(friend.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                  </svg>
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-base">No tienes amigos agregados.</p>
          )}
        </ul>
      </div>
    );
  };

  const ChatRoom = ({ member1, member2 }) => {

  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4 text-center">Chat</h2>
      <div>
        {friends ? <FriendList friends={friends} /> : "Loading Friends"}
        {chatId ? <h1> Hola</h1> : <h1>Adios</h1>}
      </div>
    </div>
  );
};
export default ChatComponent;
