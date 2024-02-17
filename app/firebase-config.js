import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAl92MvcPaReTvaD80DeX1eK_ZMI5XsBdw",
  authDomain: "school-chat-app-d494d.firebaseapp.com",
  databaseURL: "https://school-chat-app-d494d-default-rtdb.firebaseio.com",
  projectId: "school-chat-app-d494d",
  storageBucket: "school-chat-app-d494d.appspot.com",
  messagingSenderId: "511991162254",
  appId: "1:511991162254:web:78b3759813f073ff8df0df"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const rl = getDatabase(app)