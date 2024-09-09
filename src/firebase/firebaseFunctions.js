import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, getDoc, getFirestore, query, where } from 'firebase/firestore';
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
  } catch (error) {
    console.error("Error obteniendo usuario por email: ", error);
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
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

export const editProfile = async (userId, updatedData) => {
  try {
    const userDocRef = doc(db, 'user', userId);
    await updateDoc(userDocRef, updatedData);
    
  } catch (error) {
    console.error("Error al actualizar los datos del perfil:", error);
    throw error;
  }
};