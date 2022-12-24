import React from "react";
import MovieList from "../MovieList/MovieList";
import UpcomingMovies from "../UpcomingMovies/UpcomingMovies";
import { DEFAULT_LINK_TO_FETCH_MOVIES } from '../../functions/linksToFetch';
import SearchMovie from "../SearchMovie/SearchMovie";

const Home = (props) => {

	return (
		<div className="home">
			<h1>Upcoming movies</h1>
			<UpcomingMovies upcomingMovieVideo={props.upcomingMovieVideo} />
			<SearchMovie />
			<h1>Discover movies</h1>
			<MovieList linkToFetch={DEFAULT_LINK_TO_FETCH_MOVIES} />
		</div>
	)
}

export default Home;