import React from "react";


function Profile({ user }) {
  if (!user) {
    return <h1>No user data available</h1>;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="perfil flex flex-wrap">
      <div>
        {user.photoURL ? (
          <img
            className="size-36 rounded-full m-3"
            src={user.photoURL}
            alt="User Profile"
          />
        ) : (
          <img
            className="size-36 rounded-full m-3"
            src="/default-user.jpg"
            alt="User Profile"
          />
        )}
      </div>
      <div className="datos flex items-center justify-start">
        <div className="text-left">    
        <h1 className="text-lg font-semibold">{user.nombre + " " + user.apellido}</h1>

        {user.biography ? (
          <p className="text-base ">{user.biography}</p>
        ) : (
          ""
        )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
