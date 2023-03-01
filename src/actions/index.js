import * as actionTypes from './types';

export const setPersons = (persons) => {
	return {
		type: actionTypes.SET_PERSONS,
		payload: {
			uploadedPersons: persons
		}
	}
}

export const clearPersons = () => {
	return {
		type: actionTypes.CLEAR_PERSONS,
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

export const clearMovies = () => {
	return {
		type: actionTypes.CLEAR_MOVIES,
	}
}

export const setMyReview = (reviews) => {
	return {
		type: actionTypes.SET_MY_REVIEW_FOR_MOVIE,
		payload: {
			uploadedReview: reviews
		}
	}
}

export const removeMyReview = (id) => {
	return {
		type: actionTypes.REMOVE_MY_REVIEW_FOR_MOVIE,
		payload: id
	}
}

export const clearReviews = () => {
	return {
		type: actionTypes.CLEAR_MY_REVIEWS_FOR_MOVIE,
	}
}

export const setMyMark = (marks) => {
	return {
		type: actionTypes.SET_MY_MARK_FOR_MOVIE,
		payload: {
			uploadedMarks: marks
		}
	}
}

export const removeMyMark = (key) => {
	return {
		type: actionTypes.REMOVE_MY_MARK_FOR_MOVIE,
		payload: key
	}
}

export const clearMyMark = () => {
	return {
		type: actionTypes.CLEAR_MY_MARK_FOR_MOVIE,
	}
}

export const setUpcomingMovies = (movies) => {
	return {
		type: actionTypes.SET_UPCOMING_MOVIES,
		payload: {
			upcomingMovies: movies
		}
	}
}

export const setFavoriteMovies = (movies) => {
	return {
		type: actionTypes.SET_FAVORITE_MOVIES,
		payload: {
			favoriteMovies: movies
		}
	}
}

export const clearFavoriteMovies = () => {
	return {
		type: actionTypes.CLEAR_FAVORITE_MOVIES,
	}
}

export const removeFromFavoriteMovies = (id) => {
	return {
		type: actionTypes.REMOVE_FROM_FAVORITE_MOVIES,
		payload: id
	}
}

export const setCurrentMovie = (selectedMovie) => {
	return {
		type: actionTypes.SET_CURRENT_MOVIE,
		payload: selectedMovie
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

export const setCurrentPersonPage = (selectedPerson) => {
	return {
		type: actionTypes.SET_CURRENT_PERSON_PAGE,
		payload: {
			currentPersonInfo: selectedPerson
		}
	}
}

export const clearCurrentPersonPage = () => {
	return {
		type: actionTypes.CLEAR_CURRENT_PERSON_PAGE,
	}
}

export const setFavoritePersons = (person) => {
	return {
		type: actionTypes.SET_FAVORITE_PERSONS,
		payload: {
			favoritePerson: person
		}
	}
}

export const removeFromFavoritePersons = (id) => {
	return {
		type: actionTypes.REMOVE_FROM_FAVORITE_PERSONS,
		payload: id
	}
}

export const clearFavoritePersons = () => {
	return {
		type: actionTypes.CLEAR_FAVORITE_PERSONS,
	}
}

export const setSearchResults = (result) => {
	return {
		type: actionTypes.SET_SEARCH_RESULTS,
		payload: {
			searchResults: result
		}
	}
}

export const clearSearchResults = () => {
	return {
		type: actionTypes.CLEAR_SEARCH_RESULTS,
	}
}

export const setProfilePage = (user) => {
	return {
		type: actionTypes.SET_PROFILE_PAGE,
		payload: user
	}
}

export const clearProfilePage = () => {
	return {
		type: actionTypes.CLEAR_PROFILE_PAGE,
	}
}

export const addToFriends = (user) => {
	return {
		type: actionTypes.SET_FRIENDS,
		payload: user
	}
}

export const removeFromFriends = (key) => {
	return {
		type: actionTypes.REMOVE_FROM_FRIENDS,
		payload: key
	}
}

export const clearFriends = () => {
	return {
		type: actionTypes.CLEAR_FRIENDS,
	}
}