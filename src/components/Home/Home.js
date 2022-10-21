import React from "react";
import MovieList from "../MovieList/MovieList";
import MovieCard from "../MovieCard/MovieCard";

const Home = (props) => {

	return (
		<div className="home">
			<h1>Upcoming</h1>
			<div className="upcoming-movies">
				{
					props.upcomingMovies && props.upcomingMovies.map((movie, index) => {
						if (index <= 4) {
							return <MovieCard movie={movie} key={index} genres={props.genres} favouriteMovies={props.favouriteMovies} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage} />
						}
					})
				}
			</div>
			<h1>Explore movies</h1>
			{props.movies && <MovieList movies={props.movies} genres={props.genres} favouriteMovies={props.favouriteMovies} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage} />}
		</div>
	)
}

export default Home;