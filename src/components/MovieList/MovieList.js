import React, { useRef, useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import fetchMoreResults from "../../functions/fetchMoreResults";
import {clearMovies, setMovies } from "../../actions";
import {connect} from "react-redux";

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
	const [isMovieListLoaded, setIsMovieListLoaded] = useState(true);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
	const [isResultsExist, setIsResultsExist] = useState(true);

	const getMovies = () => {
		setIsMovieListLoaded(false);
		setIsResultsExist(fetchMoreResults(linkToFetch, currentResultsPage, handleSetMovies));
		setPrevResultsPage(currentResultsPage);
		setCurrentResultsPage(currentResultsPage + 1);
		setIsMovieListLoaded(true);
	}

	const isShowMoreButton = isResultsExist && isMovieListLoaded;

	useEffect(() => {
	    if (isResultsExist && prevResultsPage !== currentResultsPage) {
			getMovies();
		}
	}, []);

	return (
		<div className="movie-list">
			{genres && movies && movies.map((movie, index) => {
				return <MovieCard movie={movie} key={index} genres={genres} favouriteMovies={favouriteMovies} addMovieToMyCollection={addMovieToMyCollection} handleRemoveFromFavouriteMovies={handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={handleSetCurrentMoviePage} />
			})}
			{
				isShowMoreButton && <button className="main-button main-button--filled" onClick={() => {getMovies()}}>Show more movies</button>
			}
			{!isMovieListLoaded && <div style={{fontSize: '200px', color: 'red'}}>...Loading</div>}
		</div>
	)
}

const mapStateToProps = state => ({
	movies: state.movies.uploadedMovies,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetMovies: (movies) => dispatch(setMovies(movies)),
		handleClearMovies: () => dispatch(clearMovies())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
