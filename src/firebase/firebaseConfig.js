import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDO5yO5VcktZdjyg38vuqNpoOS4i86-tE4",
  authDomain: "integracion-d00bf.firebaseapp.com",
  databaseURL: "https://integracion-d00bf-default-rtdb.firebaseio.com",
  projectId: "integracion-d00bf",
  storageBucket: "integracion-d00bf.appspot.com",
  messagingSenderId: "840054051270",
  appId: "1:840054051270:web:60004893b8346d0b37e2c7",
  measurementId: "G-3NG3Q1T6CM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export { db };
export const storage = getStorage(app);