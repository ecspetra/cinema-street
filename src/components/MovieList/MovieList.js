import React, {useRef} from "react";
import MovieCard from "../MovieCard/MovieCard";

const MoviesList = (props) => {

	const getMoreMovies = () => {
		props.getMovies();
	}

	return (
		<div className="movie-list">
			{props.genres && props.movies && props.movies.map((movie, index) => {
				return <MovieCard movie={movie} key={index} genres={props.genres} favouriteMovies={props.favouriteMovies} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage} />
			})}
			<button className="main-button main-button--more-results" onClick={() => {getMoreMovies()}}>Show more movies</button>
			{props.isMovieListLoading && <div style={{fontSize: '200px', color: 'red'}}>...Loading</div>}
		</div>
	)
}

export default MoviesList;