import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import CollectionButton from "../CollectionButton/CollectionButton";
import Rating from "../Rating/Rating";
import getMovieGenresIDs from '../../functions/getMovieGenresIDs';
import getComparedGenresIDs from '../../functions/getComparedGenresIDs';
import MyMark from "../MyMark/MyMark";
import { getDatabase, ref } from "firebase/database";
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
import DeleteMovieFromCollectionPopup from "../Popups/DeleteMovieFromCollectionPopup/DeleteMovieFromCollectionPopup";
import './assets/index.scss';
import md5 from "md5";
import Genre from "../Genre/Genre";
import UserContext from "../UserContext/UserContext";

const MovieCard = (props) => {

	const database = getDatabase();
	const postListRef = ref(database, 'movies');

	const { currentUser } = useContext(UserContext);

	const { isFavoriteMoviesList, genres, movie, handleSetCurrentMoviePage, handleClearCurrentMoviePage, handleRemoveFromFavoriteMovies, handleFillFavoriteMoviesList } = props;

	const [isMounted, setIsMounted] = useState(false);
	const [movieGenresIDs, setMovieGenresIDs] = useState([]);
	const [movieGenresNames, setMovieGenresNames] = useState([]);
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [isShowModal, setIsShowModal] = useState(false);
	const [isMovieFromCollection, setIsMovieFromCollection] = useState(false);

	const handleAddMovieToMyCollection = async () => {
		await postMovieToDataBase(database, movie, currentUser);
		checkIfMovieExistsInCollection(postListRef, movie.id, currentUser).then(data => setIsMovieFromCollection(data));
	}

	const handleRemoveMovieFromCollection = async () => {
		setIsShowModal(false);
		setIsMounted(false);

		setTimeout(async () => {
			await removeMovieFromCollection(postListRef, movie, currentUser, handleRemoveFromFavoriteMovies, setIsMounted);
			checkIfMovieExistsInCollection(postListRef, movie.id, currentUser).then(data => setIsMovieFromCollection(data));
		}, 750);

		if (isFavoriteMoviesList === true) {
			handleFillFavoriteMoviesList();
		}
	};

	useEffect(() => {
		setIsMounted(true);
		const movieGenresIDsArray = getMovieGenresIDs(genres, movie);
		setMovieGenresIDs(movieGenresIDsArray);
	}, []);

	useEffect(() => {
		checkIfMovieExistsInCollection(postListRef, movie.id, currentUser).then(data => setIsMovieFromCollection(data));
	}, []);

	useEffect(() => {
		const comparedGenresNames = getComparedGenresIDs(genres, movieGenresIDs);
		setMovieGenresNames(comparedGenresNames);
	}, [movieGenresIDs]);

	const handleIsShowModal = () => {
		setIsShowModal(true);
	}

	const collectionButtonOnClickFunction = isMovieFromCollection ? handleIsShowModal : handleAddMovieToMyCollection;

	return (
		<>
			<CSSTransition
				in={isMounted}
				appear={true}
				timeout={0}
				classNames="movie-card-wrap"
			>
				<div className="movie-card">
					<Link to={`/movie/${movie.id}`} className="movie-card__link" onClick={() => {
						handleChooseCurrentMoviePage(movie, handleClearCurrentMoviePage).then((data) => {handleSetCurrentMoviePage(data)})
					}}>
						<span className="movie-card__image-wrap">
							<img className="movie-card__image" onError={event => addDefaultImage(event, defaultMovieImage)} onLoad={() => {setIsImageLoaded(true)}} src={`https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`} alt="movie-poster" />
							{!isImageLoaded && <Loader>Loading image</Loader>}
							<MyMark movie={movie} />
						</span>
						<span className="movie-card__release-date">{(new Date(movie.release_date).getFullYear()).toString()}</span>
						<span className="movie-card__title-wrap">
							<span className="movie-card__title">{movie.title}</span>
							<Rating movie={movie} />
						</span>
					</Link>
					<div className="movie-card__genres-wrap">
						{
							movieGenresNames.map((genre, index) => {
								if (index <= 2) {
									return <Genre key={md5(genre)}>{genre}</Genre>
								}
							})
						}
					</div>
					<CollectionButton isExistsInCollection={isMovieFromCollection} collectionButtonOnClickFunction={collectionButtonOnClickFunction}>{isMovieFromCollection ? 'Remove from favorite' : 'Add to favorite'}</CollectionButton>
				</div>
			</CSSTransition>
			<DeleteMovieFromCollectionPopup isShowModal={isShowModal} setIsShowModal={setIsShowModal} handleRemoveMovieFromCollection={handleRemoveMovieFromCollection} />
		</>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetCurrentMoviePage: (selectedMovie) => dispatch(setCurrentMovie(selectedMovie)),
		handleClearCurrentMoviePage: () => dispatch(clearCurrentMoviePage()),
		handleRemoveFromFavoriteMovies: (key) => dispatch(removeFromFavoriteMovies(key)),
	}
}

export default connect(null, mapDispatchToProps)(MovieCard);
