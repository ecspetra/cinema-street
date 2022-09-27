import * as actionTypes from '../actions/types';
import { combineReducers } from "redux";

const initialUserState = {
	currentUser: null,
	isLoading: true
}

const initialMoviesState = {
	uploadedMovies: null,
	isLoading: true
}

const initialFavouriteMoviesState = {
	favouriteMovies: [],
};

const initialPersonsState = {
	uploadedPersons: null,
	isLoading: true
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
				uploadedMovies: action.payload.uploadedMovies,
				isLoading: false
			}
		default: return state;
	}
}

const favourite_movies_reducer = (state = initialFavouriteMoviesState, action) => {
	switch (action.type) {
		case actionTypes.SET_FAVOURITE_MOVIES:
			return {
				...state,
				favouriteMovies: [...state.favouriteMovies, action.payload.favouriteMovies],
			}
		case actionTypes.REMOVE_FROM_FAVOURITE_MOVIES:
			return {...state, favouriteMovies: state.favouriteMovies.filter(item => item.data.movie.id !== action.payload)}
		default: return state;
	}
}

const person_reducer = (state = initialPersonsState, action) => {
	switch (action.type) {
		case actionTypes.SET_PERSONS:
			return {
				uploadedPersons: action.payload.uploadedPersons,
				isLoading: false
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
	persons: person_reducer,
	genres: genres_reducer,
});

export default rootReducer;