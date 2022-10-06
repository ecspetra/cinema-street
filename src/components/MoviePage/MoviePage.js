import React from "react";
import RatingIcon from "../App/assets/icons/Rating";

const MoviePage = (props) => {

	return (
		<div className="movie-page">
			<h1>{props.currentMoviePage.title}</h1>
			<img className="movie-card__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.currentMoviePage.poster_path} />
		</div>
	)
}

export default MoviePage;