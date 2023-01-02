import React from "react";
import MovieList from "../MovieList/MovieList";

const FavoriteMovies = () => {

	return (
		<>
			<h1>Favorite movies</h1>
			<div className="favorite-movie-list">
				<MovieList isFavoriteMoviesList />
			</div>
		</>
	)
}

export default FavoriteMovies;