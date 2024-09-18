import React, { useState } from "react";
import { likePost, unlikePost } from "../../firebase/firebaseFunctions";
import PostComentarios from "./PostComentarios";

function Post({ post, user }) {
  const [likeCd, setLikeCd] = useState(false);

  const handleLike = async (post) => {
    if (likeCd) return;
    setLikeCd(true);
    try {
      const hasLiked =
        post.likedBy &&
        Array.isArray(post.likedBy) &&
        post.likedBy.includes(user.id);
      if (hasLiked) {
        await unlikePost(post.id, user.id);
        setPosts(
          posts.map((p) =>
            p.id === post.id
              ? {
                  ...p,
                  likesCount: p.likesCount - 1,
                  likedBy: p.likedBy.filter((id) => id !== user.id),
                }
              : p
          )
        );
      } else {
        await likePost(post.id, user.id);
        setPosts(
          posts.map((p) =>
            p.id === post.id
              ? {
                  ...p,
                  likesCount: p.likesCount + 1,
                  likedBy: [...(p.likedBy || []), user.id],
                }
              : p
          )
        );
      }
    } catch (error) {
      console.error("Error al manejar el like:", error);
    }
    setTimeout(() => setLikeCd(false), 2000);
  };

  return (
    <div className="post border border-white rounded p-3 bg-black">
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

      <div className="flex items-center mt-2">
        <button onClick={() => handleLike(post)}>
          {post.likedBy && post.likedBy.includes(user.id) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-red-500 hover:text-red-600"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-red-500 hover:text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          )}
        </button>
        <span className="ml-2">{post.likesCount} likes</span>
      </div>
      <PostComentarios postId={post.id} userId={user.id}/>
    </div>
  );
}

export default Post;
