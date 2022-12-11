import React, { useRef, useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import fetchMoreResults from "../../functions/fetchMoreResults";
import {clearFavouriteMovies, clearMovies, setFavouriteMovies, setGenres, setMovies} from "../../actions";
import { connect } from "react-redux";

import getMyMoviesFromDatabase from "../../functions/getMoviesFromMyCollection";
import { getDatabase, ref } from "firebase/database";
import {API_KEY} from "../../functions/linksToFetch";
import axios from "axios";


const MoviesList = (props) => {

	const { isFavouriteMoviesList, handleSetFavouriteMovies, handleClearFavouriteMovies, genres, movies, favouriteMovies, linkToFetch, handleClearMovies, handleSetMovies, handleChooseCurrentMoviePage, handleSetGenres } = props;

	const moviesList = isFavouriteMoviesList ? favouriteMovies : movies;

	const onMovieListUnmount = useRef();
	onMovieListUnmount.current = () => {
		if (isFavouriteMoviesList) {
			handleClearFavouriteMovies();
		} else handleClearMovies();
	}

	useEffect(() => {
		return () => onMovieListUnmount.current();
	}, []);

	const [currentResultsPage, setCurrentResultsPage] = useState(1);
	const [isMovieListLoaded, setIsMovieListLoaded] = useState(true);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
	const [isResultsExist, setIsResultsExist] = useState(true);

	const database = getDatabase();
	const postListRef = ref(database, 'movies');

	const getMovies = () => {
		setIsMovieListLoaded(false);

		if (isFavouriteMoviesList) {
			let receivedFavouriteMoviesKeys = [];
			if (favouriteMovies.length > 0) {
				receivedFavouriteMoviesKeys = favouriteMovies.map((movie) => {
					return movie.key;
				})
			}
			getMyMoviesFromDatabase(postListRef, receivedFavouriteMoviesKeys, handleSetFavouriteMovies);
		} else setIsResultsExist(fetchMoreResults(linkToFetch, currentResultsPage, handleSetMovies));

		setPrevResultsPage(currentResultsPage);
		setCurrentResultsPage(currentResultsPage + 1);
		setIsMovieListLoaded(true);
	}

	const getGenres = async () => {

		const response = await axios.get(
			'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY
		);

		handleSetGenres(response.data);
	}

	const isShowMoreButton = isResultsExist && isMovieListLoaded;

	useEffect(() => {
	    if (isResultsExist && prevResultsPage !== currentResultsPage) {
			getMovies();
		}
		getGenres();
	}, []);

	return (
		<div className="movie-list">
			{
				moviesList.length > 0
					? <>
						{genres && moviesList && moviesList.map((movie, index) => {
							return <MovieCard movie={isFavouriteMoviesList ? movie.data.movie : movie} key={index} genres={genres} />
						})}
						{
							isShowMoreButton && <button className="main-button main-button--more" onClick={() => {getMovies()}}>Show more</button>
						}
						{!isMovieListLoaded && <div style={{fontSize: '200px', color: 'red'}}>...Loading</div>}
					</>
					: 'Movie list is empty'
			}

		</div>
	)
}

const mapStateToProps = state => ({
	movies: state.movies.uploadedMovies,
	genres: state.genres.uploadedGenres,
	favouriteMovies: state.favouriteMovies.favouriteMovies,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetMovies: (movies) => dispatch(setMovies(movies)),
		handleClearMovies: () => dispatch(clearMovies()),
		handleSetGenres: (genres) => dispatch(setGenres(genres)),
		handleSetFavouriteMovies: (selectedMovie) => dispatch(setFavouriteMovies(selectedMovie)),
		handleClearFavouriteMovies: () => dispatch(clearFavouriteMovies()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
