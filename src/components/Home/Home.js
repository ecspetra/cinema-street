import React from "react";
import MoviesList from "../MoviesList/MoviesList";
import UpcomingMovies from "../UpcomingMovies/UpcomingMovies";
import { DEFAULT_LINK_TO_FETCH_MOVIES } from '../../functions/linksToFetch';
import SearchMovie from "../SearchMovie/SearchMovie";
import Title from "../Title/Title";

const Home = () => {

	return (
		<div className="home">
			<Title title={"Upcoming movies"} />
			<UpcomingMovies />
			<SearchMovie />
			<Title title={"Discover movies"} />
			<MoviesList linkToFetch={DEFAULT_LINK_TO_FETCH_MOVIES} />
		</div>
	)
}

export default Home;