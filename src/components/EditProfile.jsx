import React, { useState } from "react";
import { editProfile } from "../firebase/firebaseFunctions";
import './EditProfile.css'
function EditProfile({ user }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [biography, setBiography] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        nombre,
        apellido,
        biography,
      };

      await editProfile(user.id , updatedData, photo);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="edit-profile" onSubmit={handleSubmit}>
        <h1>Editar Perfil</h1>
      <label>
        Nombre:
        <input className="input-text"
          type="text"
          value={nombre}
          placeholder={user.nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>
      <label>
        Apellido:
        <input className="input-text"
          type="text"
          value={apellido}
          placeholder={user.apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </label>
      <label>
        Biografía:
        <input className="input-text"
          type="text"
          value={biography}
          placeholder={user.biography}
          onChange={(e) => setBiography(e.target.value)}
        />
      </label>
      <label>
        Foto de perfil:
        <input type="file" accept="image/png, image/jpeg" onChange={(e) => setPhoto(e.target.files[0])} />
      </label>
      <button type="submit">Actualizar Perfil</button>
      {success && <p>Perfil actualizado correctamente.</p>}
      {error && <p> Ocurrio un error inesperado, lo sentimos...</p>}
    </form>
  );
}

export default EditProfile;
