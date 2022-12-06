import React from "react";
import MovieList from "../MovieList/MovieList";
import UpcomingMovies from "../UpcomingMovies/UpcomingMovies";
import { DEFAULT_LINK_TO_FETCH_MOVIES } from '../../functions/linksToFetch';

const Home = (props) => {

	return (
		<div className="home">
			<h1>Upcoming movies</h1>
			{props.upcomingMovies && <UpcomingMovies upcomingMovieVideo={props.upcomingMovieVideo} movies={props.upcomingMovies} />}
			<h1>Explore movies</h1>
			<MovieList linkToFetch={DEFAULT_LINK_TO_FETCH_MOVIES} isMovieListLoading={props.isMovieListLoading} genres={props.genres} favouriteMovies={props.favouriteMovies} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage} />
		</div>
	)
}

export default Home;