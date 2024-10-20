import React, { useEffect, useState, useRef } from "react";
import {
  getPostsWithLimitById,
  likePost,
  unlikePost,
} from "../../firebase/firebaseFunctions";
import Modal from "../../Modal";
import Post from "./Post";

const LoadPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);
  const [likeCd, setLikeCd] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { posts: newPosts, lastVisible: newLastVisible } =
          await getPostsWithLimitById(user.friendList, lastVisible);
        setPosts((prevPosts) => {
          const combinedPosts = [...prevPosts, ...newPosts];
          const uniquePosts = Array.from(
            new Map(combinedPosts.map((post) => [post.id, post])).values()
          );

          return uniquePosts;
        });
        setLastVisible(newLastVisible);
        setLoading(false);
      } catch (e) {
        console.error("Ocurrio un error inesperado al obtener los posts");
        setLoading(false);
      }
    };

    const observer = new IntersectionObserver(
      // uso de IntersectionObserver para hacer el InfiniteScrolling
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("observer")
          // si funciona pero al no tener más post que cargar se llama la funcion fetchPosts() constantemente consumiendo recursos de Firebase
          fetchPosts();
        }
      },
      { threshold: 1.0 } 
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };

  }, [user.friendList, lastVisible]);

  const removePostDuplicated = (posts) => {
    const newPosts = new Set();

    return posts.filter((item) => {
      const duplicatedPosts = newPosts.has(item.id);
      newPosts.add(item.id);
      return !duplicatedPosts;
    });
  };

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

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold ml-6 pt-6">
        No te pierdas las ultimas novedades...
      </h1>
      <div className="p-6 mx-auto w-full">
        {removePostDuplicated(posts) &&
          posts.map((post) => (
            <div key={post.id}>
              <div className="post border border-white rounded mb-2 p-3">
                <div className="flex items-center justify-start">
                  <img className="size-11 rounded-full" src={user.photoURL} />
                  <h1 className="font-semibold ml-1.5">{user.nombre}</h1>
                </div>
                <h1 className="text-xl">{post.text}</h1>
                <h2 className="text-base text-stone-500">{post.createdAt}</h2>
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
                  <button
                    className="comentario"
                    onClick={() => openModal(post)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-blue-500 hover:text-blue-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                  </button>
                  {/* Ventana con el post para comentar*/}
                  {isModalOpen && selectedPost && (
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                      <Post post={selectedPost} user={user} />
                    </Modal>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div ref={sentinelRef} style={{ height: "1px" }}></div>
    </div>
  );
};

export default LoadPosts;
