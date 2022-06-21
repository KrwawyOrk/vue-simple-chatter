import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASEKEY,
  authDomain: "vue-firebase-chatter.firebaseapp.com",
  databaseURL:
    "https://vue-firebase-chatter-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "vue-firebase-chatter",
  storageBucket: "vue-firebase-chatter.appspot.com",
  messagingSenderId: "821315837688",
  appId: "1:821315837688:web:3780afdcd9e6925069650d",
  measurementId: "G-6W79E1FE1N",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const firebasePlatform = {
  app,
  database,
};
