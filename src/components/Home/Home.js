import React from "react";
import MovieList from "../MovieList/MovieList";
import MovieCard from "../MovieCard/MovieCard";
import UpcomingMovies from "../UpcomingMovies/UpcomingMovies";


const Home = (props) => {

	return (
		<div className="home">
			<h1>Upcoming</h1>
			{props.upcomingMovies && <UpcomingMovies movies={props.upcomingMovies}/>}
			<h1>Explore movies</h1>
			{props.movies && <MovieList getMovies={props.getMovies} isMovieListLoading={props.isMovieListLoading} movies={props.movies} genres={props.genres} favouriteMovies={props.favouriteMovies} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage} />}
		</div>
	)
}

export default Home;