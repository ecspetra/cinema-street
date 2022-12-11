import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Rating from "../Rating/Rating";
import default_movie_icon from "../App/assets/icons/default-movie.svg";
import classNames from "classnames";

import getMovieGenresIDs from '../../functions/getMovieGenresIDs';
import getComparedGenresIDs from '../../functions/getComparedGenresIDs';
import MyMark from "../MyMark/MyMark";
import { getDatabase, onValue, ref } from "firebase/database";
import checkIfMovieExistsInCollection from "../../functions/checkIfMovieExistsInCollection";
import { clearCurrentMoviePage, setCurrentMovie } from "../../actions";
import { connect } from "react-redux";
import handleChooseCurrentMoviePage from "../../functions/setCurrentMoviePage";

const MovieCard = (props) => {

	const database = getDatabase();
	const postListRef = ref(database, 'movies');

	const { genres, movie, handleSetCurrentMoviePage, handleClearCurrentMoviePage } = props;

	const [movieGenresIDs, setMovieGenresIDs] = useState([]);
	const [movieGenresNames, setMovieGenresNames] = useState([]);
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [isMovieFromCollection, setIsMovieFromCollection] = useState(false);

	const addDefaultSrc = (event) => {
		event.target.src = default_movie_icon;
	}

	useEffect(() => {
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

	const movieCardImageWrapClassNames = classNames('movie-card__image-wrap', {
		'movie-card__image-wrap--loading': !isImageLoaded,
	});

	return (
		<div className="movie-card">
			<Link to={"/movie/" + movie.id} className="movie-card__link" onClick={() => {
				handleChooseCurrentMoviePage(movie, handleSetCurrentMoviePage, handleClearCurrentMoviePage)
			}}>
				<div className={movieCardImageWrapClassNames}>
					<img className="movie-card__image" onError={addDefaultSrc} onLoad={() => {setIsImageLoaded(true)}} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + movie.poster_path} alt="movie-poster" />
				</div>
				<span className="movie-card__release-date">{(new Date(movie.release_date).getFullYear())}</span>
				<span className="movie-card__title-wrap">
					<h3 className="movie-card__title">{movie.title}</h3>
					<Rating movie={movie} />
					<MyMark movie={movie} />
				</span>
			</Link>
			<div className="movie-card__genres-wrap">
				{
					movieGenresNames.map((item, key) => {
						if (key <= 2) {
							return <span key={key} className="movie-card__genre">{item}</span>
						}
					})
				}
			</div>
			<Button movie={movie} isMovieFromCollection={isMovieFromCollection} setIsMovieFromCollection={setIsMovieFromCollection} />
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetCurrentMoviePage: (selectedMovie) => dispatch(setCurrentMovie(selectedMovie)),
		handleClearCurrentMoviePage: () => dispatch(clearCurrentMoviePage()),
	}
}

export default connect(null, mapDispatchToProps)(MovieCard);
