import React, {useEffect, useState} from "react";
import UpcomingMovieItem from "../UpcomingMovieItem/UpcomingMovieItem";
import axios from "axios";

const UpcomingMovies = (props) => {

	const getUpcomingMovieVideo = async (selectedMovie) => {
		const response = await axios.get(
			'https://api.themoviedb.org/3/movie/' + selectedMovie.id + '/videos?api_key=1fdbb7205b3bf878ede960ab5c9bc7ce'
		);
		if (response.data.results.length) {
			const videoTrailer = response.data.results[0];
			return videoTrailer.key;
		}
	}

	const getInitialPreviewState = async () => {

		const defaultMovie = props.movies[0];

		const defaultMovieVideoKey = await getUpcomingMovieVideo(defaultMovie);

		setMoviePreview(
			{
				moviePosterPath: defaultMovie.poster_path,
				movieTitle: defaultMovie.title,
				movieReleaseDate: defaultMovie.release_date,
				movieVideo: defaultMovieVideoKey,
			}
		);
	}

	const [moviePreview, setMoviePreview] = useState({});
	const [isMoviePreviewSelected, setIsMoviePreviewSelected] = useState(props.movies[0].id);

	const handleSetMoviePreview = async (movie) => {

		const trailerKey = await getUpcomingMovieVideo(movie);

		setMoviePreview(
			{
				moviePosterPath: movie.poster_path,
				movieTitle: movie.title,
				movieReleaseDate: movie.release_date,
				movieVideo: trailerKey,
			}
		);
		setIsMoviePreviewSelected(movie.id);
	}

	const moviesSortedByReleaseDate = props.movies.sort((a,b) => {
		return new Date(a.release_date).getTime() -
			new Date(b.release_date).getTime();
	});

	useEffect(() => {
		getInitialPreviewState();
	}, []);

	return (
		<div className="upcoming-movies">
			<div className="upcoming-movies__preview">
				{
					moviePreview.movieVideo ? (
						<video controls>
							<source src={'https://www.youtube.com/watch?v=' + moviePreview.movieVideo} type="video/mp4" />
						</video>
					) : (<img className="upcoming-movies__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + moviePreview.moviePosterPath} alt="movie-poster" />)
				}
				<div className="upcoming-movies__info">
					<h1 className="upcoming-movies__title">{moviePreview.movieTitle}</h1>
					<p className="upcoming-movies__release-date">{moviePreview.movieReleaseDate}</p>
				</div>
			</div>
			<div className="upcoming-movies__list">
				{
					moviesSortedByReleaseDate && moviesSortedByReleaseDate.map((movie, index) => {
						return <UpcomingMovieItem handleSetMoviePreview={handleSetMoviePreview} isMoviePreviewSelected={isMoviePreviewSelected} movie={movie} key={index} genres={props.genres} />
					})
				}
			</div>
		</div>
	)
}

export default UpcomingMovies;