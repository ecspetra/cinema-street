import React from "react";
import MoviesList from "../MoviesList/MoviesList";
import UpcomingMovies from "../UpcomingMovies/UpcomingMovies";
import { DEFAULT_LINK_TO_FETCH_MOVIES } from '../../functions/linksToFetch';
import SearchMovie from "../SearchMovie/SearchMovie";

const Home = () => {

	return (
		<div className="home">
			<h1>Upcoming movies</h1>
			<UpcomingMovies />
			<SearchMovie />
			<h1>Discover movies</h1>
			<MoviesList linkToFetch={DEFAULT_LINK_TO_FETCH_MOVIES} />
		</div>
	)
}

export default Home;