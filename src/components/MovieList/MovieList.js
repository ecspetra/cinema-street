import React, { useRef, useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import fetchMoreResults from "../../functions/fetchMoreResults";
import { clearFavoriteMovies, clearMovies, setFavoriteMovies, setGenres, setMovies } from "../../actions";
import { connect } from "react-redux";
import getMyMoviesFromDatabase from "../../functions/getMoviesFromDatabase";
import { getDatabase, ref } from "firebase/database";
import MoreButton from "../MoreButton/MoreButton";
import Loader from "../Loader/Loader";
import getGenres from "../../functions/getGenres";


const MoviesList = (props) => {

	const { currentUser, isFavoriteMoviesList, handleSetFavoriteMovies, handleClearFavoriteMovies, genres, movies, favoriteMovies, linkToFetch, handleClearMovies, handleSetMovies, handleChooseCurrentMoviePage, handleSetGenres } = props;

	const moviesList = isFavoriteMoviesList ? favoriteMovies : movies;

	const onMovieListUnmount = useRef();
	onMovieListUnmount.current = () => {
		if (isFavoriteMoviesList) {
			handleClearFavoriteMovies();
		} else handleClearMovies();
	}

	useEffect(() => {
		return () => onMovieListUnmount.current();
	}, []);

	const [currentResultsPage, setCurrentResultsPage] = useState(1);
	const [isMovieListLoaded, setIsMovieListLoaded] = useState(true);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
	const [isResultsExist, setIsResultsExist] = useState(true);
	const maxListLength = 20;

	const database = getDatabase();
	const postListRef = ref(database, 'movies');

	const getMovies = async () => {
		setIsMovieListLoaded(false);

		if (isFavoriteMoviesList) {
			let receivedFavoriteMoviesKeys = [];
			if (favoriteMovies.length > 0) {
				receivedFavoriteMoviesKeys = favoriteMovies.map((movie) => {
					return movie.key;
				})
			}
			await getMyMoviesFromDatabase(postListRef, receivedFavoriteMoviesKeys, handleSetFavoriteMovies, currentUser.uid);
		} else setIsResultsExist(await fetchMoreResults(linkToFetch, currentResultsPage, handleSetMovies));

		setPrevResultsPage(currentResultsPage);
		setCurrentResultsPage(currentResultsPage + 1);
		setIsMovieListLoaded(true);
	}

	const isShowMoreButton = isResultsExist && isMovieListLoaded && moviesList.length >= maxListLength;

	useEffect(() => {
	    if (isResultsExist && prevResultsPage !== currentResultsPage) {
			getMovies();
		}
	}, []);

	useEffect(() => {
		getGenres().then((data) => {handleSetGenres(data)});
	}, []);

	return (
		<>
			{
				moviesList.length > 0
					? <>
						<div className="movie-list">
							{genres && moviesList && moviesList.map((movie, index) => {
								return <MovieCard movie={isFavoriteMoviesList ? movie.data.movie : movie} key={index} genres={genres} />
							})}
							{!isMovieListLoaded && <Loader>Loading movies</Loader>}
						</div>
						{
							(isShowMoreButton && isMovieListLoaded) && <MoreButton isFetchResultsButton moreButtonOnClickFunction={getMovies} />
						}
					</>
					: <p className="movie-list-empty">Movie list is empty</p>
			}
		</>
	)
}

const mapStateToProps = state => ({
	movies: state.movies.uploadedMovies,
	genres: state.genres.uploadedGenres,
	favoriteMovies: state.favoriteMovies.favoriteMovies,
	currentUser: state.user.currentUser,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetMovies: (movies) => dispatch(setMovies(movies)),
		handleClearMovies: () => dispatch(clearMovies()),
		handleSetGenres: (genres) => dispatch(setGenres(genres)),
		handleSetFavoriteMovies: (selectedMovie) => dispatch(setFavoriteMovies(selectedMovie)),
		handleClearFavoriteMovies: () => dispatch(clearFavoriteMovies()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
