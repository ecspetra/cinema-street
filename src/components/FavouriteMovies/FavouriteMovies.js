import React from "react";
import MovieList from "../MovieList/MovieList";

const FavouriteMovies = (props) => {

	return (
		<>
			<h1>My collection</h1>
			<div className="favourite-movie-list">
				<MovieList isFavouriteMoviesList />
			</div>
		</>
	)
}

export default FavouriteMovies;