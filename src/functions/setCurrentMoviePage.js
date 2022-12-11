import axios from "axios";
import { API_KEY } from "./linksToFetch";

const getCurrentMoviePage = (selectedMovie) => {

	return new Promise(async function(resolve) {

		let currentMoviePage = {
			currentMovieInfo: null,
			currentMovieCredits: null,
			currentMovieImages: null,
			currentMovieReviews: null,
			currentMovieVideos: null,
		};

		const currentMovieInfoResponse = await axios.get(
			'https://api.themoviedb.org/3/movie/' + selectedMovie.id + '?api_key=' + API_KEY
		);

		const currentMovieCreditsResponse = await axios.get(
			'https://api.themoviedb.org/3/movie/' + selectedMovie.id + '/credits?api_key=' + API_KEY
		);

		const currentMovieImagesResponse = await axios.get(
			'https://api.themoviedb.org/3/movie/' + selectedMovie.id + '/images?api_key=' + API_KEY
		);

		const currentMovieReviewsResponse = await axios.get(
			'https://api.themoviedb.org/3/movie/' + selectedMovie.id + '/reviews?api_key=' + API_KEY
		);

		const currentMovieVideosResponse = await axios.get(
			'https://api.themoviedb.org/3/movie/' + selectedMovie.id + '/videos?api_key=' + API_KEY
		);

		resolve(currentMoviePage = {
			currentMovieInfo: currentMovieInfoResponse.data,
			currentMovieCredits: currentMovieCreditsResponse.data,
			currentMovieImages: currentMovieImagesResponse.data,
			currentMovieReviews: currentMovieReviewsResponse.data,
			currentMovieVideos: currentMovieVideosResponse.data.results,
		});
	})
}

const handleChooseCurrentMoviePage = (selectedMovie, setCurrentMoviePageFunction, clearCurrentMoviePageFunction) => {
	clearCurrentMoviePageFunction();
	getCurrentMoviePage(selectedMovie).then(data => setCurrentMoviePageFunction(data));
}

export default handleChooseCurrentMoviePage;