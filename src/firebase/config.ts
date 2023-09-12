import { initializeApp } from "firebase/app";
import { getAuth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, set, getDatabase } from "firebase/database";
import {useRouter} from "next/router";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
export { auth };

export interface AuthContextType {
    currentUser: User | null;
}

export const addUserToRealtimeDatabase = async (userCredential: object) => {
    const newUser = userCredential.user;
    const newUserRef = ref(database, `users/${newUser.uid}`);

    const newUserData = {
        id: newUser.uid,
        email: newUser.email,
        photoURL: `https://api.dicebear.com/5.x/thumbs/svg?seed=${newUser.uid}`,
    }

    await set(newUserRef, newUserData);
}

export async function signUp(email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await signInWithEmailAndPassword(auth, email, password);
        await addUserToRealtimeDatabase(userCredential)
    } catch (error) {
        throw error;
    }
}

export async function signIn(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw error;
    }
}

export async function signOutUser() {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
}
