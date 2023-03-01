import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {formUserObject, removeUserFromLocalStorage, saveUserToLocalStorage} from "./userLocalStorageManager";

const useAuthListener = (handleSetUser, handleClearUser) => {
	const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('user') || null));

	const auth = getAuth();

	const history = useNavigate();

	useEffect(() => {

		const listener = onAuthStateChanged(auth, (user) => {

			if (user) {
				const userToSave = formUserObject(user);
				saveUserToLocalStorage(userToSave);
				setCurrentUser(userToSave);
				handleSetUser(userToSave);
				history('/');
			} else {
				removeUserFromLocalStorage();
				setCurrentUser(null);
				handleClearUser();
				history('/login');
			}
		});

		return () => listener?.();
	}, [firebase]);

	return { currentUser, setCurrentUser };
}

export default useAuthListener;