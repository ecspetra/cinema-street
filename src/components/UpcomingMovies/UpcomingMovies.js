import React, {useState} from "react";

const UpcomingMovies = (props) => {

	const getInitialPreviewState = () => {

		const defaultMovie = props.movies[0];

		return {
			moviePosterPath: defaultMovie.poster_path,
			movieTitle: defaultMovie.title,
			movieReleaseDate: defaultMovie.release_date,
		}
	}

	const [moviePreview, setMoviePreview] = useState(getInitialPreviewState());

	const handleSetMoviePreview = (movie) => {
		setMoviePreview(
			{
				moviePosterPath: movie.poster_path,
				movieTitle: movie.title,
				movieReleaseDate: movie.release_date,
			}
		);
		console.log(moviePreview);
	}

	return (
		<div className="upcoming-movies">
			<div className="upcoming-movies__preview">
				<img className="movie-card__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + moviePreview.moviePosterPath} alt="movie-poster" />
				<span>{moviePreview.movieTitle}</span>
				<span>{moviePreview.movieReleaseDate}</span>
			</div>
			<div className="upcoming-movies__list">
				{
					props.movies && props.movies.map((movie, index) => {
						return <div key={index} onClick={() => {handleSetMoviePreview(movie)}}>{movie.title}</div>
					})
				}
			</div>
		</div>
	)
}

export default UpcomingMovies;