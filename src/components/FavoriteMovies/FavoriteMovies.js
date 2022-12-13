import React from "react";
import MovieList from "../MovieList/MovieList";

const FavoriteMovies = (props) => {

	return (
		<>
			<h1>My collection</h1>
			<div className="favorite-movie-list">
				<MovieList isFavoriteMoviesList />
			</div>
		</>
	)
}

export default FavoriteMovies;