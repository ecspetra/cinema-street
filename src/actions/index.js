import * as actionTypes from './types';

export const setPersons = (persons) => {
	return {
		type: actionTypes.SET_PERSONS,
		payload: {
			uploadedPersons: persons
		}
	}
}

export const setMovies = (movies) => {
	return {
		type: actionTypes.SET_MOVIES,
		payload: {
			uploadedMovies: movies
		}
	}
}

export const setFavouriteMovies = (movies) => {
	return {
		type: actionTypes.SET_FAVOURITE_MOVIES,
		payload: {
			favouriteMovies: movies
		}
	}
}

export const removeFromFavouriteMovies = (id) => {
	return {
		type: actionTypes.REMOVE_FROM_FAVOURITE_MOVIES,
		payload: id
	}
}

export const setCurrentMovieInfo = (selectedMovie) => {
	return {
		type: actionTypes.SET_CURRENT_MOVIE_INFO,
		payload: {
			currentMovieInfo: selectedMovie,
		}
	}
}

export const setCurrentMovieCredits = (movieCredits) => {
	return {
		type: actionTypes.SET_CURRENT_MOVIE_CREDITS,
		payload: {
			currentMovieCredits: movieCredits,
		}
	}
}

export const setCurrentMovieImages = (movieImages) => {
	return {
		type: actionTypes.SET_CURRENT_MOVIE_IMAGES,
		payload: {
			currentMovieImages: movieImages,
		}
	}
}

export const setCurrentMovieReviews = (movieReviews) => {
	return {
		type: actionTypes.SET_CURRENT_MOVIE_REVIEWS,
		payload: {
			currentMovieReviews: movieReviews,
		}
	}
}

export const setCurrentMovieSimilar = (movieSimilar) => {
	return {
		type: actionTypes.SET_CURRENT_MOVIE_SIMILAR,
		payload: {
			currentMovieSimilar: movieSimilar,
		}
	}
}

export const clearCurrentMoviePage = () => {
	return {
		type: actionTypes.CLEAR_CURRENT_MOVIE,
	}
}

export const setUser = (user) => {
	return {
		type: actionTypes.SET_USER,
		payload: {
			currentUser: user
		}
	}
}

export const clearUser = () => {
	return {
		type: actionTypes.CLEAR_USER,
	}
}

export const setGenres = (genres) => {
	return {
		type: actionTypes.SET_GENRES,
		payload: {
			uploadedGenres: genres
		}
	}
}

export const setCompany = (company) => {
	return {
		type: actionTypes.SET_COMPANY_PAGE,
		payload: {
			currentCompany: company
		}
	}
}