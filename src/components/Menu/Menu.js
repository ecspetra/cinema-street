import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useLocation } from "react-router";
import classNames from 'classnames';
import './assets/index.scss';

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
			<div className="project-menu__content">
				<div className="project-menu__item-wrap">
					<Link className="project-menu__item" to="/">Main</Link>
				</div>
				<div className="project-menu__item-wrap">
					<Link className="project-menu__item" to="/favorite-movies">Favorite movies</Link>
				</div>
				<div className="project-menu__item-wrap">
					<Link className="project-menu__item" to="/persons">Persons</Link>
				</div>
				<div className="project-menu__item-wrap">
					<Link className="project-menu__item" to="/genres">Genres</Link>
				</div>
				<div className="project-menu__item-wrap">
					<Link className="project-menu__item" to="/profile">Profile</Link>
				</div>
				<div className="project-menu__item-wrap">
					{
						props.auth.currentUser !== null
							? <button className="project-menu__item project-menu__item--auth" onClick={handleSignOut}>Sign Out</button>
							: <Link className="project-menu__item project-menu__item--auth" to="/login">Log In</Link>
					}
				</div>
			</div>
		</div>
	)
}

export default Menu;