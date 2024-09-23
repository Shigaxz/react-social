import React, { useState } from "react";
import { searchUsers, addDocument } from "../../firebase/firebaseFunctions";
import FriendAddButton from "./FriendAddButton";
const FriendAdd = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);

  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const users = await searchUsers(searchTerm);
    console.log(users);
    if (users) {
      const foundUser = users.filter((item) => item.id !== user.id);
      setFoundUsers(foundUser);
    }
  };

  const FriendCheck = ({ userId, user }) => {
    const isFriend = user.friendList.includes(userId);
    return (
      <>
        {isFriend ? (
          <div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        ) : (
          <FriendAddButton senderId={user.id} receiverId={userId} />
        )}
      </>
    );
  };

  return (
    <div className="add-friend-section mt-3">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Buscar usuarios"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-4 rounded"
        />
        <button onClick={handleSearch} className="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-stone-50 mb-3"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {foundUsers.length > 0 && (
        <ul>
          {foundUsers.map((usuario) => (
            <li
              key={usuario.id}
              className="border border-white rounded p-1 flex items-center justify-start ml-1.5 mb-1.5"
            >
              <img
                src={usuario.photoURL}
                alt={usuario.nombre}
                className="rounded-full w-8 h-8"
              />
              <span className="ml-1">
                {usuario.nombre} {usuario.apellido}
              </span>
              <FriendCheck userId={usuario.id} user={user}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default FriendAdd;
