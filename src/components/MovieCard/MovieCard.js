import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import classNames from "classnames";
import RatingIcon from "../App/assets/icons/Rating";
import {useLocation} from "react-router";

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

	const { pathname } = useLocation();

	const movie_rating = props.movie.vote_average;

	const movieRatingClassNames = classNames('movie-card__rating', {
		'movie-card__rating--low': movie_rating <= 3,
		'movie-card__rating--middle': movie_rating > 3 && movie_rating < 7,
		'movie-card__rating--high': movie_rating >= 7,
	});

	return (
		<div className="movie-card">
			<Link to={'/movie' + '/' + props.movie.id} className="movie-card__link" onClick={() => {
				props.handleSetCurrentMoviePage(props.movie)
			}}>
				<img className="movie-card__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.movie.poster_path} />
				<span className="movie-card__title-wrap">
					<h3 className="movie-card__title">{props.movie.title}</h3>
					<span className={movieRatingClassNames}>
						<RatingIcon className="movie-card__rating-icon" />
						<span className="movie-card__rating-text">{movie_rating}</span>
					</span>
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
			{
				pathname === '/favourite-movies' ? <button className="movie-card__button" onClick={() => {
					props.handleRemoveFromFavouriteMovies(props.favouriteMovieInfo)
				}}>Remove from my collection</button> : <button className="movie-card__button" onClick={() => {
					props.addMovieToMyCollection(props.movie)
				}}>Add to my collection</button>
			}
		</div>
	)
}

export default MovieCard;