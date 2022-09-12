import React from "react";
import { Link } from "react-router-dom";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
// import {useEffect, useState} from "react";

const Menu = () => {

	const auth = getAuth();

	const handleSignOut = () => {
	    signOut(auth).then(() => {
	        console.log('Signed Out');
	    })
	}

	// const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	//
	// useEffect(() => {
	// 	onAuthStateChanged(auth, (user) => {
	// 		if (user) {
	// 			setIsUserLoggedIn(true);
	// 		}
	// 		else {
	// 			setIsUserLoggedIn(false);
	// 		}
	// 	});
	// }, [onAuthStateChanged]);

	return (
		<div className="project-menu">
			<Link className="project-menu__item" to="/">Main</Link>
			<Link className="project-menu__item" to="/actors">Actors</Link>
			<Link className="project-menu__item" to="/genres">Genres</Link>
			<Link className="project-menu__item" to="/profile">Profile</Link>
			{/*{*/}
			{/*	isUserLoggedIn*/}
			{/*		? <button className="project-menu__item project-menu__item--auth" onClick={handleSignOut}>Sign Out</button>*/}
			{/*		: <Link className="project-menu__item project-menu__item--auth" to="/login">Log In</Link>*/}
			{/*}*/}
			<button className="project-menu__item project-menu__item--auth" onClick={handleSignOut}>Sign Out</button>
		</div>
	)
}

export default Menu;