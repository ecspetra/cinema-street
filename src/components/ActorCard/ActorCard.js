import React from 'react';
import { Link } from "react-router-dom";
import default_user_icon from "../App/assets/icons/default-user.svg";

const ActorCard = (props) => {

	const isMovieCharacter = props.isMovieCharacter;

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	return (
		<div className="person-card">
			<Link to="/movie/ + props.movie.poster_path" className="person-card__link">
				<div className="person-card__content">
					<img className="person-card__image" onError={addDefaultSrc} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.person.profile_path} alt="person-photo" />
					<h3 className="person-card__title">{props.person.name}</h3>
				</div>
			</Link>
			{
				(isMovieCharacter && (props.person.character !== "")) && <span className="person-card__character">{props.person.character}</span>
			}
			{/*<p className="person-card__rating">{props.person.popularity}</p>*/}
		</div>
	)
}

export default ActorCard;