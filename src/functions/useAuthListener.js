import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useAuthListener = (handleSetUser, handleClearUser) => {
	const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('user') || null));

	const auth = getAuth();

	const history = useNavigate();

	useEffect(() => {

		const listener = onAuthStateChanged(auth, (user) => {
			if (user) {
				localStorage.setItem('user', JSON.stringify(user));
				setCurrentUser(user);
				handleSetUser(user);
				history('/');
			} else {
				localStorage.removeItem('user');
				setCurrentUser(null);
				handleClearUser();
				history('/login');
			}
		});

		return () => listener?.();
	}, [firebase]);

	return { currentUser };
}

export default useAuthListener;