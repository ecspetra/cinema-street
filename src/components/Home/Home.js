import React from "react";
import MovieList from "../MovieList/MovieList";

const Home = (props) => {

	return (
		<div className="home">
			<h1>Explore movies</h1>
			{props.movies && <MovieList movies={props.movies} genres={props.genres} favouriteMovies={props.favouriteMovies} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage} />}
		</div>
	)
}

export default Home;