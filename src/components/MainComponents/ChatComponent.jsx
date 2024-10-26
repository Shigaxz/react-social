import React, { useState, useEffect } from "react";
import {
  getUserFriends,
  startChat,
  sendMessage,
  subscribeChatRoom
} from "../../firebase/firebaseFunctions";

const ChatComponent = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [friendChat, setFriendChat] = useState("");
  const [chat, setChat] = useState(null);
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
                <button onClick={() => setFriendChat(friend)}>
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
    const [chatId, setChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
      const initiateChat = async () => {
        try {
          const id = await startChat(member1.id, member2.id);
          if (id) {
            setChatId(id);
          }
        } catch (e) {
          setError(true);
        }
      };

      const subscribeToChatRoom = (id) => {
        return subscribeChatRoom(id, (messagesData) => {
          setMessages(messagesData);
        });
      };

      initiateChat();

      let unsubscribe;
      if (chatId) {
        unsubscribe = subscribeToChatRoom(chatId);
      }
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }, [member1.id, member2.id, chatId]);

    const closeChat = () => {
      setFriendChat(null);
    };

    const handleSendMessage = async (e) => {
      e.preventDefault();
      if (newMessage.trim() === "") return;

      try {
        await sendMessage(chatId, user.id, newMessage);
        setNewMessage("");
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    };

    const formatDate = (firebaseTimestamp) => {
      const date = firebaseTimestamp.toDate();
      return date.toLocaleDateString();
    };

    if (error) {
      return (
        <div>
          <h1 className="text-xl font-semibold mt-4 text-center">
            Error al iniciar el chat
          </h1>
        </div>
      );
    }

    return chatId ? (
      <div className="bg-black rounded-lg border border-white p-4 shadow m-2">
        <div key={chatId} className="flex justify-between items-center">
          <div className="flex items-center">
            {member2.photoURL ? (
              <img
                className="rounded-full w-11 h-11 ml-3"
                src={member2.photoURL}
                alt={`${member2.nombre}'s profile`}
              />
            ) : (
              ""
            )}
            <h1 className="text-xl font-semibold ml-2">
              {member2.nombre}'s Chat
            </h1>
          </div>
          <div>
            <button onClick={() => setFriendChat(null)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-3"
              >
                <path
                  fillRule="evenodd"
                  d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
        <div className="overflow-y-auto max-h-80 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === user.id ? "justify-end" : "justify-start"
            } mt-2`}
          >
            <p
              className={`${
                message.senderId === user.id ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              } rounded px-3 py-1`}
            >
              {message.message}
            </p>
            {/*<p>
            {formatDate(message.timestamp)}
            </p>*/}
          </div>
        ))}
      </div>
          <form onSubmit={handleSendMessage} className="flex mt-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="border rounded-l px-4 py-2 w-full focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    ) : (
      <div>
        <h1 className="text-xl font-semibold ml-4">Cargando chat...</h1>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-4 text-center">Chat</h2>
      <div>
        {friends && !friendChat ? <FriendList friends={friends} /> : ""}
        {friendChat ? <ChatRoom member1={user} member2={friendChat} /> : ""}
      </div>
    </div>
  );
};
export default ChatComponent;
