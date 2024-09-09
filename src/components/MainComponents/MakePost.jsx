import React, { useState } from "react";
import { uploadPost } from "../../firebase/firebaseFunctions";
import "./MakePost.css";
export default function MakePost({ userData }) {
  const [postText, setPostText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    console.log(userData);
      const userId = userData.id;
      await uploadPost(userId, postText, photo);
      setSuccess(true);
      setPostText("");
      setPhoto(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="makepost">
      <form
        className="bg-black p-6 rounded shadow-md  mx-auto mt-8 w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4">Crear Post</h2>
        <textarea
          className="w-full h-32 p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="¿Qué estás pensando?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          required
        />
        <label className="block mb-4">
          <span className="block mb-2">Añadir foto:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full text-gray-700"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Publicar
        </button>
        {success && (
          <p className="mt-4 text-green-500">¡Post publicado con éxito!</p>
        )}
        {error && (
          <p className="mt-4 text-red-500">Error al publicar: {error}</p>
        )}
      </form>
    </div>
  );
}
