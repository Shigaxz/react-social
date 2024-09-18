import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc, getFirestore, query, where, arrayUnion, arrayRemove, increment, Timestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebaseConfig';

export const addDocument = async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { id: docRef.id, ...data };
    } catch (e) {
        console.error("error: ", e);
      throw e;
    }
};

export const updateDocument = async (collectionName, id, data) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
      return { id, ...data };
    } catch (e) {
        console.error("error: ", e);
      throw e;
    }
};

export const deleteDocument = async (collectionName, id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      return { id };
    } catch (e) {
        console.error("error: ", e);
      throw e;
    }
};

export const getCollection = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return data;
    } catch (e) {
        console.error("error: ", e);
      throw e;
    }
};

export const getDocumentById = async (collectionName, id) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("No such document!");
      }
    } catch (e) {
      console.error("error: ", e);
      throw e;
    }
};

export const getUserByEmail = async (email) => {
  const usersRef = collection(db, 'user');
  const q = query(usersRef, where('email', '==', email));

  try {
    const querySnapshot = await getDocs(q);
    let userData = null;

    querySnapshot.forEach((doc) => {
      userData = { id: doc.id, ...doc.data() };
    });

    return userData;
  } catch (e) {
    console.error("Error obteniendo usuario por email: ", e);
    return null;
  }
};

export const editProfilePhoto = async (userId, updatedData, file) => {
  try {
    const userDocRef = doc(db, 'user', userId);

    let photoURL = null;
    // Si no se actualiza la foto recibe un null
    if (file !== null) {
      const storageRef = ref(storage, `profilePictures/${file.name}`);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);

      const updatedUserData = {
        ...updatedData,
        photoURL,
      };
      await updateDoc(userDocRef, updatedUserData);
    }
    /* Si recibe null deberia actualizar los otros datos, no photoURL
    if (file === null) {
      await updateDoc(userDocRef, updatedData);
    }
    */
  } catch (e) {
    console.error("Error al actualizar el usuario:", e);
    throw e;
  }
};

export const editProfile = async (userId, updatedData) => {
  try {
    const userDocRef = doc(db, 'user', userId);
    await updateDoc(userDocRef, updatedData);
    
  } catch (e) {
    console.error("Error al actualizar los datos del perfil:", e);
    throw e;
  }
};

export const uploadPost = async (userId, postText, photo) => {
  try {
    let photoURL = null;

    if (photo) {
      const storageRef = ref(storage, `posts/${photo.name}`);
      await uploadBytes(storageRef, photo);
      photoURL = await getDownloadURL(storageRef);
    }
    const postDay = new Date();
    const formattedDate = postDay.toISOString().split('T')[0];

    const postRef = collection(db, 'posts');
    await addDoc(postRef, {
      userId,
      text: postText,
      photo: photoURL,
      createdAt: formattedDate,
      likesCount: 0,
      likedBy: []
    });
  } catch (e) {
    console.error("Error al subir el post con foto:", e);
    throw e;
  }
};

export const getPostsById = async (userId) => {
  try {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return posts;
  } catch (e) {
    console.error("Error obteniendo los posts:", e);
    throw e;
  }
};

export const likePost = async (postId, userId) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
      const postData = postSnapshot.data();
      // Verifica si el usuario ya ha dado "like"
      if (!postData.likedBy.includes(userId)) {
        await updateDoc(postRef, {
          likedBy: arrayUnion(userId),
          likesCount: increment(1)
        });
      } else {
        console.log("El usuario ya dio like a este post.");
      }
    } else {
      console.log("El post no existe.");
    }
  } catch (error) {
    console.error("Error al dar like:", error);
    throw error;
  }
};

export const unlikePost = async (postId, userId) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      likedBy: arrayRemove(userId),
      likesCount: increment(-1)
    });
  } catch (e) {
    console.error("error:", e);
  }
};

export const addComment = async (postId, userId, comment, file = null) => {
  try {
    let photoURL = null;

    if (file) {
      const storageRef = ref(storage, `comments/${file.name}`);
      await uploadBytes(storageRef, file);
      photoURL = await getDownloadURL(storageRef);
    }
    const newComment = {
      userId,
      postId,
      comment,
      photoURL,
      createdAt: Timestamp.now()
    };

    const postRef = doc(db, "posts", postId);
    await addDoc(collection(postRef, "comments"), newComment);

    return newComment;
  } catch (error) {
    console.error("Error al añadir comentario");
    throw error;
  }
};

export const getPostComments = async (postId) => {
  const postRef = doc(db, "posts", postId);
  const commentsRef = collection(postRef, "comments");
  const querySnapshot = await getDocs(commentsRef);

  const comments = [];
  querySnapshot.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() });
  });

  return comments;
};

export const getUserById = async (userId) => {
  try {
    const userDocRef = doc(db, 'user', userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    }
    throw new Error('Usuario no encontrado');
  } catch (e) {
    console.error(`Error al obtener datos del usuario ${userId}:`, e);
    throw e;
  }
};