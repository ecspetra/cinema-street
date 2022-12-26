import React, { useRef, useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import fetchMoreResults from "../../functions/fetchMoreResults";
import { clearFavoriteMovies, clearMovies, setFavoriteMovies, setGenres, setMovies } from "../../actions";
import { connect } from "react-redux";
import { getMyMoviesFromDatabase } from "../../functions/getMoviesFromDatabase";
import { getDatabase, ref } from "firebase/database";
import MoreButton from "../MoreButton/MoreButton";
import Loader from "../Loader/Loader";
import getGenres from "../../functions/getGenres";
import InfoText from "../InfoText/InfoText";

const MoviesList = (props) => {

	const { currentUser, isFavoriteMoviesList, handleSetFavoriteMovies, handleClearFavoriteMovies, genres, movies, favoriteMovies, linkToFetch, handleClearMovies, handleSetMovies, handleSetGenres } = props;

	const onMovieListUnmount = useRef();
	onMovieListUnmount.current = () => {
		if (isFavoriteMoviesList) {
			handleClearFavoriteMovies();
		} else handleClearMovies();
	}

	useEffect(() => {
		return () => onMovieListUnmount.current();
	}, []);

	const initialListLength = 20;
	const [currentResultsPage, setCurrentResultsPage] = useState(1);
	const [isMovieListLoaded, setIsMovieListLoaded] = useState(true);
	const [isShowMoreButton, setIsShowMoreButton] = useState(false);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
	const [isLastData, setIsLastData] = useState(false);
	const [maxListLength, setMaxListLength] = useState(initialListLength);
	const [moviesList, setMoviesList] = useState([]);

	const database = getDatabase();
	const postListRef = ref(database, 'movies');

	const getMovies = async () => {

		return new Promise(async (resolve) => {
			let isPersonsListLoaded = false;

			if (isFavoriteMoviesList) {
				let receivedFavoriteMoviesKeys = [];
				if (favoriteMovies.length > 0) {
					receivedFavoriteMoviesKeys = favoriteMovies.map((movie) => {
						return movie.key;
					})
				}
				await getMyMoviesFromDatabase(postListRef, receivedFavoriteMoviesKeys, currentUser.uid).then((data) => {

					const isEmptyResult = !data.dataFromResponse.length;

					if (isEmptyResult) {
						setMaxListLength(favoriteMovies.length);
						setIsLastData(true);
					} else {
						if (maxListLength === initialListLength) {
							setMaxListLength(moviesList.length + data.dataFromResponse.length);
						} else setMaxListLength(prevState => (prevState + data.dataFromResponse.length));
						if (data.isLastData === true) {
							setIsLastData(true);
						}
						handleSetFavoriteMovies(data.dataFromResponse);
					}
				})
			} else {
				await fetchMoreResults(linkToFetch, currentResultsPage).then((data) => {
					const isEmptyResult = !data.dataFromResponse.data.results.length;

					if (isEmptyResult) {
						return false;
					} else {
						if (data.isLastData === true) {
							setIsLastData(true);
						}
						handleSetMovies(data.dataFromResponse.data.results);
					}
				})
				setPrevResultsPage(currentResultsPage);
				setCurrentResultsPage(currentResultsPage + 1);
			}

			isPersonsListLoaded = true;

			resolve(isPersonsListLoaded);
		})
	}

	const getMoviesList = () => {

		let movies;

		movies = moviesList && moviesList.map((movie) => {
			return <MovieCard movie={isFavoriteMoviesList ? movie.data.movie : movie} key={isFavoriteMoviesList ? movie.data.movie.id : movie.id} genres={genres} />
		})

		return movies;
	}

	const handleIsShowMoreButton = () => {

		console.log(isMovieListLoaded, moviesList.length !== 0, isLastData);


		if (isMovieListLoaded === true && moviesList.length !== 0 && isLastData === false) {
			return true;
		} else return false;
	}

	useEffect(() => {
	    if (!isLastData && prevResultsPage !== currentResultsPage && !isFavoriteMoviesList) {
			getMovies().then((data) => {
				setIsMovieListLoaded(data);
			})
		} else if (isFavoriteMoviesList) {

			let receivedFavoriteMoviesKeys = [];

			getMyMoviesFromDatabase(postListRef, receivedFavoriteMoviesKeys, currentUser.uid).then((data) => {

				const isEmptyResult = !data.dataFromResponse.length;

				if (isEmptyResult) {
					setIsLastData(true);
				} else {
					handleSetFavoriteMovies(data.dataFromResponse);
					if (data.isLastData === true) {
						setIsLastData(true);
					}
				}
			}).then(() => {
				setIsMovieListLoaded(true);
			})
		}
	}, []);

	useEffect(() => {
		getGenres().then((data) => {handleSetGenres(data)});
	}, []);

	useEffect(() => {
		setMoviesList(isFavoriteMoviesList ? favoriteMovies : movies);
	}, [favoriteMovies, movies]);

	useEffect(() => {
		console.log('handleIsShowMoreButton', isLastData);

		setIsShowMoreButton(handleIsShowMoreButton());
	}, [moviesList, isLastData]);

	return (
		<>
			{
				moviesList.length === 0 && isMovieListLoaded
					? <InfoText>{isFavoriteMoviesList ? 'Movies you add to favorites will be displayed here' : 'Movie list is empty'}</InfoText>
					: <>
						<div className="movie-list">
							{getMoviesList()}
							{!isMovieListLoaded && <Loader>Loading movies</Loader>}
						</div>
						{
							isShowMoreButton && <MoreButton isFetchResultsButton moreButtonOnClickFunction={getMovies} />
						}
					</>
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
