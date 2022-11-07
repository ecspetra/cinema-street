import React, { useRef, useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import axios from "axios";

const MoviesList = (props) => {

	const onMovieListUnmount = useRef();
	onMovieListUnmount.current = () => {
		props.handleClearMovies();
	}

	useEffect(() => {
		return () => onMovieListUnmount.current();
	}, []);

	const [currentResultsPage, setCurrentResultsPage] = useState(1);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
	const [wasLastList, setWasLastList] = useState(false);
	const [isMovieListLoading, setIsMovieListLoading] = useState(false);

	const getMovies = async (linkToFetch) => {

		console.log(linkToFetch);

		setIsMovieListLoading(true);
		const response = await axios.get(
			linkToFetch + '&page=' + currentResultsPage
		);
		if (!response.data.results.length) {
			setWasLastList(true);
			return;
		}
		setPrevResultsPage(currentResultsPage);
		setCurrentResultsPage(currentResultsPage + 1);
		props.handleSetMovies(response.data.results);
		setIsMovieListLoading(false);
	};

	useEffect(() => {
	    if (!wasLastList && prevResultsPage !== currentResultsPage) {
	        getMovies(props.linkToFetch);
	    }
	}, []);

	return (
		<div className="movie-list">
			{props.genres && props.movies && props.movies.map((movie, index) => {
				return <MovieCard movie={movie} key={index} genres={props.genres} favouriteMovies={props.favouriteMovies} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage} />
			})}
			<button className="main-button main-button--more-results" onClick={() => {getMovies(props.linkToFetch)}}>Show more movies</button>
			{props.isMovieListLoading && <div style={{fontSize: '200px', color: 'red'}}>...Loading</div>}
		</div>
	)
}

export default MoviesList;