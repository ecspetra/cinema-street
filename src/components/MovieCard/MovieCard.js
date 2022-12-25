import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CollectionButton from "../CollectionButton/CollectionButton";
import Rating from "../Rating/Rating";
import getMovieGenresIDs from '../../functions/getMovieGenresIDs';
import getComparedGenresIDs from '../../functions/getComparedGenresIDs';
import MyMark from "../MyMark/MyMark";
import { getDatabase, push, ref } from "firebase/database";
import checkIfMovieExistsInCollection from "../../functions/checkIfMovieExistsInCollection";
import { clearCurrentMoviePage, removeFromFavoriteMovies, setCurrentMovie } from "../../actions";
import { connect } from "react-redux";
import handleChooseCurrentMoviePage from "../../functions/setCurrentMoviePage";
import removeMovieFromCollection from "../../functions/removeMovieFromCollection";
import postMovieToDataBase from "../../functions/postMovieToDataBase";
import Loader from "../Loader/Loader";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultMovieImage from "../App/assets/icons/default-movie.svg";
import { CSSTransition } from "react-transition-group";

const MovieCard = (props) => {

	const database = getDatabase();
	const postListRef = ref(database, 'movies');
	const newPostRef = push(postListRef);

	const { currentUser, genres, movie, handleSetCurrentMoviePage, handleClearCurrentMoviePage, handleRemoveFromFavoriteMovies } = props;

	const [isMounted, setIsMounted] = useState(false);
	const [movieGenresIDs, setMovieGenresIDs] = useState([]);
	const [movieGenresNames, setMovieGenresNames] = useState([]);
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [isMovieFromCollection, setIsMovieFromCollection] = useState(false);

	const handleAddMovieToMyCollection = () => {
		postMovieToDataBase(newPostRef, movie, currentUser.uid);
		checkIfMovieExistsInCollection(postListRef, movie.id).then(data => setIsMovieFromCollection(data));
	}

	const handleRemoveMovieFromCollection = async () => {
		await setIsMounted(false);

		setTimeout(async () => {
			await removeMovieFromCollection(postListRef, movie, handleRemoveFromFavoriteMovies, setIsMounted);
			checkIfMovieExistsInCollection(postListRef, movie.id).then(data => setIsMovieFromCollection(data));
		}, 750);
	}

	useEffect(() => {
		setIsMounted(true);
		const movieGenresIDsArray = getMovieGenresIDs(genres, movie);
		setMovieGenresIDs(movieGenresIDsArray);
	}, []);

	useEffect(() => {
		checkIfMovieExistsInCollection(postListRef, movie.id).then(data => setIsMovieFromCollection(data));
	}, []);

	useEffect(() => {
		const comparedGenresNames = getComparedGenresIDs(genres, movieGenresIDs);
		setMovieGenresNames(comparedGenresNames);
	}, [movieGenresIDs]);

	const collectionButtonOnClickFunction = isMovieFromCollection ? handleRemoveMovieFromCollection : handleAddMovieToMyCollection;

	return (
		<CSSTransition
			in={isMounted}
			appear={true}
			timeout={0}
			classNames="movie-card-wrap"
		>
			<div className="movie-card">
				<Link to={"/movie/" + movie.id} className="movie-card__link" onClick={() => {
					handleChooseCurrentMoviePage(movie, handleClearCurrentMoviePage).then((data) => {handleSetCurrentMoviePage(data)})
				}}>
				<span className="movie-card__image-wrap">
					<img className="movie-card__image" onError={event => addDefaultImage(event, defaultMovieImage)} onLoad={() => {setIsImageLoaded(true)}} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + movie.poster_path} alt="movie-poster" />
					{!isImageLoaded && <Loader>Loading image</Loader>
					}
					<MyMark movie={movie} />
				</span>
					<span className="movie-card__release-date">{(new Date(movie.release_date).getFullYear())}</span>
					<span className="movie-card__title-wrap">
					<h3 className="movie-card__title">{movie.title}</h3>
					<Rating movie={movie} />
				</span>
				</Link>
				<div className="movie-card__genres-wrap">
					{
						movieGenresNames.map((item, key) => {
							if (key <= 2) {
								return <span key={item} className="movie-card__genre">{item}</span>
							}
						})
					}
				</div>
				<CollectionButton isExistsInCollection={isMovieFromCollection} collectionButtonOnClickFunction={collectionButtonOnClickFunction}>{isMovieFromCollection ? 'Remove from favorite' : 'Add to favorite'}</CollectionButton>
			</div>
		</CSSTransition>
	)
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetCurrentMoviePage: (selectedMovie) => dispatch(setCurrentMovie(selectedMovie)),
		handleClearCurrentMoviePage: () => dispatch(clearCurrentMoviePage()),
		handleRemoveFromFavoriteMovies: (key) => dispatch(removeFromFavoriteMovies(key)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
