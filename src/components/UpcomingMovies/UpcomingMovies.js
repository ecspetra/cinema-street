import React, { useEffect, useState } from "react";
import UpcomingMovieItem from "../UpcomingMovieItem/UpcomingMovieItem";
import axios from "axios";
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { connect } from "react-redux";
import { setUpcomingMovies } from "../../actions";
import {API_KEY} from "../../functions/linksToFetch";

const UpcomingMovies = (props) => {

	const { upcomingMovies, handleSetUpcomingMovies } = props;

	const [moviePreview, setMoviePreview] = useState({});
	const [isMoviePreviewSelected, setIsMoviePreviewSelected] = useState();
	const [moviesSortedByReleaseDate, setMoviesSortedByReleaseDate] = useState([]);

	const getUpcomingMovies = async () => {
		const response = await axios.get(
			'https://api.themoviedb.org/3/movie/upcoming?api_key=' + API_KEY
		);
		handleSetUpcomingMovies(response.data.results);
	}

	const getMoviesSortedByReleaseDate = () => {
		setMoviesSortedByReleaseDate(upcomingMovies.sort((a, b) => {
			return new Date(a.release_date).getTime() -
				new Date(b.release_date).getTime();
		}));
	}

	const getUpcomingMovieVideo = async (selectedMovie) => {
		const response = await axios.get(
			'https://api.themoviedb.org/3/movie/' + selectedMovie.id + '/videos?api_key=' + API_KEY
		);
		if (response.data.results.length) {
			const trailer = response.data.results.find(video => video.type === "Trailer");
			return trailer.key;
		}
	}

	const getInitialPreviewState = async () => {

		const defaultMovie = moviesSortedByReleaseDate[0];

		const defaultTrailerKey = await getUpcomingMovieVideo(defaultMovie);

		setMoviePreview(
			{
				moviePosterPath: defaultMovie.poster_path,
				movieTitle: defaultMovie.title,
				movieReleaseDate: defaultMovie.release_date,
				movieTrailer: defaultTrailerKey,
			}
		);
		setIsMoviePreviewSelected(defaultMovie.id);
	}

	const handleSetMoviePreview = async (movie) => {

		const selectedMovieTrailerKey = await getUpcomingMovieVideo(movie);

		setMoviePreview(
			{
				moviePosterPath: movie.poster_path,
				movieTitle: movie.title,
				movieReleaseDate: movie.release_date,
				movieTrailer: selectedMovieTrailerKey,
			}
		);
		setIsMoviePreviewSelected(movie.id);
	}

	useEffect(() => {
		getUpcomingMovies();
	}, []);

	useEffect( () => {
		if (upcomingMovies.length > 0) {
			getMoviesSortedByReleaseDate();
		}
	}, [upcomingMovies]);

	useEffect(() => {
		if (moviesSortedByReleaseDate.length > 0) {
			getInitialPreviewState();
		}
	}, [moviesSortedByReleaseDate]);

	const videoSrc = {
		type: "video",
		sources: [
			{
				src: moviePreview.movieTrailer,
				provider: "youtube",
			}
		]
	};

	const videoOptions = {
		// debug: true,
		controls: [
			'restart', // Restart playback
			'play', // Play/pause playback
			'progress', // The progress bar and scrubber for playback and buffering
			'current-time', // The current time of playback
			'duration', // The full duration of the media
			'mute', // Toggle mute
			'volume', // Volume control
			'captions', // Toggle captions
			'settings', // Settings menus
			'fullscreen', // Toggle fullscreen
		],
		// youtube: {
		// 	modestbranding: 1,
		// }
	};

	return (
		<div className="upcoming-movies">
			<div className="upcoming-movies__preview">
				{
					moviePreview.movieTrailer
						? <div className="upcoming-movies__video-player"><Plyr source={videoSrc} options={videoOptions} /></div>
						: (<>
							<img className="upcoming-movies__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + moviePreview.moviePosterPath} alt="movie-poster" />
							<div className="upcoming-movies__info">
								<h1 className="upcoming-movies__title">{moviePreview.movieTitle}</h1>
							</div>
						</>)
				}
			</div>
			<div className="upcoming-movies__list">
				{
					moviesSortedByReleaseDate.map((movie, index) => {
						return <UpcomingMovieItem handleSetMoviePreview={handleSetMoviePreview} isMoviePreviewSelected={isMoviePreviewSelected} movie={movie} key={index} />
					})
				}
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	upcomingMovies: state.upcomingMovies.upcomingMovies,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetUpcomingMovies: (movies) => dispatch(setUpcomingMovies(movies)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovies);