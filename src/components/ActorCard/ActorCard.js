import React from 'react';
import { Link } from "react-router-dom";

const ActorCard = (props) => {
	return (
		<div className="person-card">
			<Link to="/movie/ + props.movie.poster_path" className="person-card__link">
				<div className="person-card__content">
					<img className="person-card__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.person.profile_path} />
					<h3 className="person-card__title">{props.person.name}</h3>
				</div>
			</Link>
			<p className="person-card__rating">{props.person.popularity}</p>
			{/*<button className="person-card__button" onClick={() => {*/}
			{/*	props.addMovieToMyCollection(props.movie)*/}
			{/*}}>Add to my movies</button>*/}
		</div>
	)
}

export default ActorCard;