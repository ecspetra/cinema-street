import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCdEwk5zrUqvL9z4d7-umzVyhfh6MYMSRA",
    authDomain: "movie-base-3f941.firebaseapp.com",
    databaseURL: "https://movie-base-3f941-default-rtdb.firebaseio.com",
    projectId: "movie-base-3f941",
    storageBucket: "movie-base-3f941.appspot.com",
    messagingSenderId: "240355948",
    appId: "1:240355948:web:ca952cbd9fcd1fb08f6649"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const database = getDatabase(app);