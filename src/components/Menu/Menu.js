import React from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useLocation } from "react-router";
import classNames from 'classnames';

const Menu = (props) => {

	const location = useLocation();

	const auth = getAuth();

	const handleSignOut = () => {
	    signOut(auth).then(() => {
	        console.log('Signed Out');
	    })
	}

	const projectMenuClassNames = classNames('project-menu', {
		'project-menu--hidden': location.pathname === '/login' || location.pathname === '/register',
	})

	return (
		<div className={projectMenuClassNames}>
			<Link className="project-menu__item" to="/">Main</Link>
			<Link className="project-menu__item" to="/favourite-movies">Favourite movies</Link>
			<Link className="project-menu__item" to="/actors">Actors</Link>
			<Link className="project-menu__item" to="/genres">Genres</Link>
			<Link className="project-menu__item" to="/profile">Profile</Link>
			{
				props.auth.currentUser !== null
					? <button className="project-menu__item project-menu__item--auth" onClick={handleSignOut}>Sign Out</button>
					: <Link className="project-menu__item project-menu__item--auth" to="/login">Log In</Link>
			}
		</div>
	)
}

export default Menu;