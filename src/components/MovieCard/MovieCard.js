import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Rating from "../Rating/Rating";
import {useParams} from "react-router";

const MovieCard = (props) => {

	const [movieGenresIDs, setMovieGenresIDs] = useState([]);
	const [movieGenresNames, setMovieGenresNames] = useState([]);

	const favouriteMovies = props.favouriteMovies;

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

	return (
		<div className="movie-card">
			<Link to={"/movie/" + props.movie.id} className="movie-card__link" onClick={() => {
				props.handleSetCurrentMoviePage(props.movie)
			}}>
				<img className="movie-card__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.movie.poster_path} alt="movie-poster" />
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