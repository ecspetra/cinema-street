import React from "react";
import MovieCard from "../MovieCard/MovieCard";

const MoviesList = (props) => {

	return (
		<div className="movie-list">
			{props.movies.map((movie, index) => {
				return <MovieCard movie={movie} key={index} genres={props.genres} favouriteMovies={props.favouriteMovies} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage} />
			})
			}
		</div>
	)
}

export default MoviesList;