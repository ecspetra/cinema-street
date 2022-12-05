import React, { useRef, useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import fetchMoreResults from "../../functions/fetchMoreResults";

const MoviesList = (props) => {

	const { genres, movies, favouriteMovies, linkToFetch, handleClearMovies, handleSetMovies, addMovieToMyCollection, handleRemoveFromFavouriteMovies, handleSetCurrentMoviePage } = props;

	const onMovieListUnmount = useRef();
	onMovieListUnmount.current = () => {
		handleClearMovies();
	}

	useEffect(() => {
		return () => onMovieListUnmount.current();
	}, []);

	const [currentResultsPage, setCurrentResultsPage] = useState(1);
	const [isMovieListLoading, setIsMovieListLoading] = useState(false);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
	const [wasLastList, setWasLastList] = useState(false);
	const [isShowLastListInfo, setIsShowLastListInfo] = useState(false);

	const getMovies = () => {
		setWasLastList(fetchMoreResults(linkToFetch, currentResultsPage, handleSetMovies));
		setPrevResultsPage(currentResultsPage);
		setCurrentResultsPage(currentResultsPage + 1);

		if (wasLastList) {
			setIsShowLastListInfo(true);
		}
	}

	useEffect(() => {
	    if (!wasLastList && prevResultsPage !== currentResultsPage) {
	        getMovies();
		}
	}, []);

	return (
		<div className="movie-list">
			{genres && movies && movies.map((movie, index) => {
				return <MovieCard movie={movie} key={index} genres={genres} favouriteMovies={favouriteMovies} addMovieToMyCollection={addMovieToMyCollection} handleRemoveFromFavouriteMovies={handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={handleSetCurrentMoviePage} />
			})}
			{isShowLastListInfo && !isMovieListLoading ? <p>No more results</p> : <button className="main-button main-button--filled" onClick={() => {getMovies()}}>Show more movies</button>
			}
			{isMovieListLoading && <div style={{fontSize: '200px', color: 'red'}}>...Loading</div>}
		</div>
	)
}

export default MoviesList;