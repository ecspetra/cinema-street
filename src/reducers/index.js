import * as actionTypes from '../actions/types';
import { combineReducers } from "redux";

const initialUserState = {
	currentUser: null,
	isLoading: true
}

const initialMoviesState = {
	uploadedMovies: null,
}

const initialFavouriteMoviesState = {
	favouriteMovies: [],
}

const initialCurrentMoviePageState = {
	currentMovieInfo: null,
	currentMovieCredits: null,
	currentMovieImages: null,
	currentMovieReviews: null,
	currentMovieSimilar: null,
}

const initialPersonsState = {
	uploadedPersons: null,
}

const initialGenresState = {
	uploadedGenres: null,
}

const user_reducer = (state = initialUserState, action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				currentUser: action.payload.currentUser,
				isLoading: false
			}
		case actionTypes.CLEAR_USER:
			return {
				...initialUserState,
				isLoading: false
			}
		default: return state;
	}
}

const movies_reducer = (state = initialMoviesState, action) => {
	switch (action.type) {
		case actionTypes.SET_MOVIES:
			return {
				uploadedMovies: action.payload.uploadedMovies
			}
		default: return state;
	}
}

const favourite_movies_reducer = (state = initialFavouriteMoviesState, action) => {
	switch (action.type) {
		case actionTypes.SET_FAVOURITE_MOVIES:
			const movieAlreadyExistsInState = state.favouriteMovies.some(item => item.data.movie.id === action.payload.favouriteMovies.data.movie.id);
			if (movieAlreadyExistsInState) {
				return state;
			}
			return {
				...state,
				favouriteMovies: [...state.favouriteMovies, action.payload.favouriteMovies],
			}
		case actionTypes.REMOVE_FROM_FAVOURITE_MOVIES:
			return {...state, favouriteMovies: state.favouriteMovies.filter(item => item.data.movie.id !== action.payload)}
		default: return state;
	}
}

const current_movie_page_reducer = (state = initialCurrentMoviePageState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_MOVIE_INFO:
			return {
				...state,
				currentMovieInfo: action.payload.currentMovieInfo
			}
		case actionTypes.SET_CURRENT_MOVIE_CREDITS:
			return {
				...state,
				currentMovieCredits: action.payload.currentMovieCredits
			}
		case actionTypes.SET_CURRENT_MOVIE_IMAGES:
			return {
				...state,
				currentMovieImages: action.payload.currentMovieImages
			}
		case actionTypes.SET_CURRENT_MOVIE_REVIEWS:
			return {
				...state,
				currentMovieReviews: action.payload.currentMovieReviews
			}
		case actionTypes.SET_CURRENT_MOVIE_SIMILAR:
			return {
				...state,
				currentMovieSimilar: action.payload.currentMovieSimilar
			}
		default: return state;
	}
}

const person_reducer = (state = initialPersonsState, action) => {
	switch (action.type) {
		case actionTypes.SET_PERSONS:
			return {
				uploadedPersons: action.payload.uploadedPersons
			}
		default: return state;
	}
}

const genres_reducer = (state = initialGenresState, action) => {
	switch (action.type) {
		case actionTypes.SET_GENRES:
			return {
				uploadedGenres: action.payload.uploadedGenres,
			}
		default: return state;
	}
}

const rootReducer = combineReducers({
	user: user_reducer,
	movies: movies_reducer,
	favouriteMovies: favourite_movies_reducer,
	currentMoviePage: current_movie_page_reducer,
	persons: person_reducer,
	genres: genres_reducer,
});

export default rootReducer;