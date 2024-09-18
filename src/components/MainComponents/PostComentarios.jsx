import React, { useState, useEffect } from "react";
import { addComment } from "../../firebase/firebaseFunctions";
import { getPostComments, getUserById } from "../../firebase/firebaseFunctions";

const PostComentarios = ({ postId, userId }) => {
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getPostComments(postId);
        const commentsWithUserData = await Promise.all(
          // Se obtienen los datos del usuario cada vez al cargar los comentarios
          // Debido a que si se guardaran en el comentario el usuario podria cambiar
          // Tanto de nombre como de foto
          fetchedComments.map(async (comment) => {
            try {
              const user = await getUserById(comment.userId);
              return {
                ...comment,
                userNombre: user.nombre,
                userPhotoURL: user.photoURL,
              };
            } catch (error) {
              console.error(
                `Error al obtener data del ${comment.userId}`,
                error
              );
              return { ...comment };
            }
          })
        );
        setComments(commentsWithUserData);
      } catch (error) {
        setError("Error al cargar comentarios.");
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await addComment(postId, userId, comment, photo);
      setComments([...comments, newComment]);
      setComment("");
      setPhoto(null);
    } catch (error) {
      setError("Error al añadir comentario.");
    }
  };

  return (
    <div className="comment-section">
      <h3>Comentarios</h3>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          className="border p-2 rounded"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escribe un comentario..."
          required
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button className="bg-blue-500 text-white py-2 rounded" type="submit">
          Enviar comentario
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}

      <div className="comments-list mt-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment mb-4">
              <div className="flex items-center justify-start">
                <img className="size-9 rounded-full" src={comment.userPhotoURL} />
                <h1 className="font-semibold ml-1.5">{comment.userNombre}</h1>
              </div>
              <p className="text-white ml-1.5">{comment.comment}</p>
              {comment.photoURL && (
                <div className="flex justify-center">
                <img
                  src={comment.photoURL}
                  alt="Comment"
                  className="max-w-xs"
                />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>
    </div>
  );
};

export default PostComentarios;
