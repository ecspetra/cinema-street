import * as actionTypes from './types';
import {REMOVE_FROM_FAVOURITE_MOVIES} from "./types";

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