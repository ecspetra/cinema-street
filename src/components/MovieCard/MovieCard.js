import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Rating from "../Rating/Rating";
import default_user_icon from "../App/assets/icons/default-user.svg";
import classNames from "classnames";

const MovieCard = (props) => {

	const [movieGenresIDs, setMovieGenresIDs] = useState([]);
	const [movieGenresNames, setMovieGenresNames] = useState([]);

	const getMovieGenresIDs = () => {
		props.movie.genre_ids.map((genre) => {
			if (!movieGenresIDs.includes(genre)) {
				setMovieGenresIDs(prevState => [...prevState, genre]);
			}
		});
	}

	const findGenres = () => {
		const genresObject = props.genres;
		Object.keys(genresObject.genres).map((genre) => {
			if ((movieGenresIDs.includes(genresObject.genres[genre].id)) && (!movieGenresNames.includes(genresObject.genres[genre].name))) {
				setMovieGenresNames(prevState => [...prevState, genresObject.genres[genre].name]);
			}
		});
	}

	useEffect(() => {
		getMovieGenresIDs();
	}, []);

	useEffect(() => {
		findGenres();
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