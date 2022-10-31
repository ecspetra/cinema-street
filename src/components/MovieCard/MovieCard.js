import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Rating from "../Rating/Rating";
import default_user_icon from "../App/assets/icons/default-user.svg";
import classNames from "classnames";

import getMovieGenresIDs from '../../functions/getMovieGenresIDs';
import getComparedGenresIDs from '../../functions/getComparedGenresIDs';

const MovieCard = (props) => {

	const [movieGenresIDs, setMovieGenresIDs] = useState([]);
	const [movieGenresNames, setMovieGenresNames] = useState([]);

	useEffect(() => {
		const movieGenresIDsArray = getMovieGenresIDs(props.genres, props.movie);
		setMovieGenresIDs(movieGenresIDsArray);
	}, []);

	useEffect(() => {
		const comparedGenresNames = getComparedGenresIDs(props.genres, movieGenresIDs);
		setMovieGenresNames(comparedGenresNames);
	}, [movieGenresIDs]);

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	const movieCardImageWrapClassNames = classNames('movie-card__image-wrap', {
		'movie-card__image-wrap--loading': !isImageLoaded,
	});

	return (
		<div className="movie-card">
			<Link to={"/movie/" + props.movie.id} className="movie-card__link" onClick={() => {
				props.handleSetCurrentMoviePage(props.movie)
			}}>
				<div className={movieCardImageWrapClassNames}>
					<img className="movie-card__image" onError={addDefaultSrc} onLoad={() => {setIsImageLoaded(true)}} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.movie.poster_path} alt="movie-poster" />
				</div>
				<span className="movie-card__release-date">{(new Date(props.movie.release_date).getFullYear())}</span>
				<span className="movie-card__title-wrap">
					<h3 className="movie-card__title">{props.movie.title}</h3>
					<Rating movie={props.movie} />
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
			<Button favouriteMovies={props.favouriteMovies} movie={props.movie} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} />
		</div>
	)
}

export default MovieCard;