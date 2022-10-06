import React from "react";
import MovieCard from "../MovieCard/MovieCard";

const MoviesList = (props) => {
	return (
		<>
			Filter
			<div className="movie-list">
				{props.movies.map((movie, index) => {
					return <MovieCard movie={movie} key={index} genres={props.genres} addMovieToMyCollection={props.addMovieToMyCollection} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage} />
				})
				}
			</div>
		</>
	)
}

export default MoviesList;