import React, { useState, useEffect } from "react";

const FriendSearch = ({ friends }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState(friends);
  
  useEffect(() => {
    if (searchTerm !== "") {
      const filtered = friends.filter((friend) =>
        friend.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFriends(filtered);
    }

  }, [searchTerm, friends]);

  return (
    <div className="friend-list mt-3">
        <div className="flex justify-center">
      <input
        type="text"
        placeholder="Buscar amigos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 rounded"
        />
        </div>
        {searchTerm !== "" ? (
      <ul>
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => (
            <li
              key={friend.id}
              className="border border-white rounded p-1 flex items-center justify-start ml-1.5 mb-1.5"
            >
              <img
                src={friend.photoURL}
                alt={friend.name}
                className="rounded-full w-8 h-8"
              />
              <span className="ml-1">{friend.nombre}</span>
            </li>
          ))
        ) : (
            ""
        )}
      </ul>
        ) : ""}
    </div>
  );
};

export default FriendSearch;
