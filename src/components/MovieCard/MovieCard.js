import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import RatingIcon from "../App/assets/icons/Rating";

const MovieCard = (props) => {

	const [movieGenresIDs, setMovieGenresIDs] = useState([]);
	const [movieGenresNames, setMovieGenresNames] = useState([]);

	const favouriteMovies = props.favouriteMovies;

	console.log(props.favouriteMovieInfo);

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
			<Link to={'/movie' + '/' + props.movie.id} className="movie-card__link" onClick={() => {
				props.handleSetCurrentMoviePage(props.movie)
			}}>
				<img className="movie-card__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.movie.poster_path} />
				<span className="movie-card__title-wrap">
					<h3 className="movie-card__title">{props.movie.title}</h3>
					<span className="movie-card__rating">
						<RatingIcon className="movie-card__rating-icon" />
						<span className="movie-card__rating-text">{props.movie.vote_average}</span>
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
				favouriteMovies.some(item => item.data.movie.id === props.movie.id)
					? (<button className="movie-card__button movie-card__button--remove" onClick={() => {const favouriteMovieItem = favouriteMovies.find(item => item.data.movie.id === props.movie.id); const key = favouriteMovieItem.key; props.handleRemoveFromFavouriteMovies(props.movie.id, key)}}>Remove from collection</button>)
					: (<button className="movie-card__button" onClick={() => {props.addMovieToMyCollection(props.movie)}}>Add to collection</button>)
			}
		</div>
	)
}

export default MovieCard;