import React, { useEffect, useState } from "react";
import { getPostsById } from "../../firebase/firebaseFunctions";

const UserPost = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userPosts = await getPostsById(user.id);
        setPosts(userPosts);
        setLoading(false);
      } catch (e) {
        console.error("Error obteniendo los posts");
        setError("Error obteniendo los posts");
        setLoading(false);
      }
    };

    if (user.id) {
      fetchPosts();
    }
  }, [user.id]);

  if (loading) return <p>Cargando posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-posts p-6 mx-auto w-full">
      <h2 className="text-2xl font-semibold mb-4">Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className="post border border-white rounded mb-2 p-3">
            <div className="flex items-center justify-start">
              <img className="size-11 rounded-full" src={user.photoURL} />
              <h1 className="font-semibold ml-1.5">{user.nombre}</h1>
            </div>
            <h1 className="text-xl">{post.text}</h1>
            <h2 className="text-base">{post.createdAt}</h2>
            {post.photo ? (
              <div className="flex justify-center"> 
              <img
                className="max-w-[512px] max-h-[512px]"
                src={post.photo}
                alt="Post photo"
              />
              </div>
            ) : (
              ""
            )}
          </div>
        ))
      ) : (
        <p>No hay posts.</p>
      )}
    </div>
  );
};

export default UserPost;
