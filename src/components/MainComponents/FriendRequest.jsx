import React, { useState, useEffect } from "react";
import { getFriendRequests, getUserById, respondFriendRequest } from "../../firebase/firebaseFunctions";


const FriendRequest = ({ userId }) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchFriendRequests = async () => {
        try {
          console.log(userId);
          const requests = await getFriendRequests(userId);
          const requestsUserData = await Promise.all(
            requests.map(async (request) => {
              try {
                const senderData = await getUserById(request.senderId);
                return {
                  ...request,
                  senderName: senderData.nombre,
                  senderPhotoURL: senderData.photoURL,
                };
              } catch (error) {
                console.error("Error al obtener datos del usuario");
                return request;
              }
            })
          );
          setFriendRequests(requestsUserData);
        } catch (error) {
          setError("Error al obtener solicitudes de amistad.");
        }
      };
  
      fetchFriendRequests();
    }, [userId]);

    const handleRespond = async (request, respond) => {
      try {
        const { senderName, senderPhotoURL, ...newData } = request;
        newData.accepted = respond;
        await respondFriendRequest(newData);
        setFriendRequests((prevRequests) =>
          prevRequests.filter((req) => req.id !== request.id)
        );
      } catch (error) {
        console.error(error);
      };
    };

    const formatDate = (firebaseTimestamp) => {
      const date = firebaseTimestamp.toDate();
      return date.toLocaleDateString();
    };

    return (
      <div className="friend-requests">
      <h2 className="text-xl font-semibold mt-4 text-center">Solicitudes de amistad</h2>
      {friendRequests.length > 0 ? (
        <ul>
          {friendRequests.map((request) => (
            <li className="flex items-center justify-start ml-1.5 mb-1.5" key={request.id}>
              <img
                  className="rounded-full w-9 h-9"
                  src={request.senderName}
                  alt={`${request.senderPhotoURL}'s profile`}
                />
              <p className="ml-1 font-semibold">{request.senderName}</p>
              <button
                className="bg-blue-500 font-semibold text-white px-2 py-1 rounded ml-2"
                onClick={() => handleRespond(request, true)}
              >
                Aceptar
              </button>
              <button
                className="bg-red-500 font-semibold text-white px-2 py-1 rounded ml-2"
                onClick={() => handleRespond(request, false)}
              >
                Rechazar
              </button>
              <p className="ml-1.5">{formatDate(request.date)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No tienes solicitudes de amistad pendientes.</p>
      )}
    </div>
  );
};

export default FriendRequest;