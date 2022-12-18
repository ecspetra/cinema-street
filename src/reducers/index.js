import * as actionTypes from '../actions/types';
import { combineReducers } from "redux";

const initialUserState = {
	currentUser: null,
	isLoading: true
}

const initialMoviesState = {
	uploadedMovies: [],
}

const initialSearchResultsState = {
	searchResults: [],
}

const initialMarksState = {
	uploadedMarks: [],
}

const initialReviewsState = {
	uploadedReviews: [],
}

const initialUpcomingMoviesState = {
	upcomingMovies: [],
}

const initialFavoriteMoviesState = {
	favoriteMovies: [],
}

const initialCurrentMoviePageState = {
	currentMoviePage: null,
}

const initialPersonsState = {
	uploadedPersons: [],
	favoritePersons: [],
	currentPersonInfo: null,
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
				...state,
				uploadedMovies: [...state.uploadedMovies, ...action.payload.uploadedMovies],
			}
		case actionTypes.CLEAR_MOVIES:
			return {
				...initialMoviesState,
			}
		default: return state;
	}
}

const search_results_reducer = (state = initialSearchResultsState, action) => {
	switch (action.type) {
		case actionTypes.SET_SEARCH_RESULTS:
			return {
				...state,
				searchResults: [...state.searchResults, ...action.payload.searchResults],
			}
		case actionTypes.CLEAR_SEARCH_RESULTS:
			return {
				...initialSearchResultsState,
			}
		default: return state;
	}
}

const marks_reducer = (state = initialMarksState, action) => {
	switch (action.type) {
		case actionTypes.SET_MY_MARK_FOR_MOVIE:
			const markAlreadyExistsInState = state.uploadedMarks.some(item => item.key === action.payload.uploadedMarks.key);
				if (markAlreadyExistsInState) {
					return state;
				}
				return {
					...state,
					uploadedMarks: [...state.uploadedMarks, action.payload.uploadedMarks],
				}
		case actionTypes.REMOVE_MY_MARK_FOR_MOVIE:
			return {
				...state,
				uploadedMarks: state.uploadedMarks.filter(item => item.key !== action.payload)
			}
		default: return state;
	}
}

const reviews_reducer = (state = initialReviewsState, action) => {
	switch (action.type) {
		case actionTypes.SET_MY_REVIEW_FOR_MOVIE:

			let reviews = state.uploadedReviews;
			let incomingReview = action.payload.uploadedReview;

			const reviewAlreadyExistsInState = state.uploadedReviews.find(item => item.data.review.id === action.payload.uploadedReview.data.review.id);

			if (reviewAlreadyExistsInState) {
				reviews = reviews.map((review) => {
					if (review.data.review.id === incomingReview.data.review.id) {
						return incomingReview;
					} else {
						return review;
					}
				});
			} else {
				reviews.push(incomingReview);
			}

			return {
				...state,
				uploadedReviews: [...reviews],
			}
		case actionTypes.REMOVE_MY_REVIEW_FOR_MOVIE:
			return {
				...state,
				uploadedReviews: state.uploadedReviews.filter(item => item.data.review.id !== action.payload)
			}
		default: return state;
	}
}

const upcoming_movies_reducer = (state = initialUpcomingMoviesState, action) => {
	switch (action.type) {
		case actionTypes.SET_UPCOMING_MOVIES:
			return {
				upcomingMovies: action.payload.upcomingMovies
			}
		default: return state;
	}
}

const favorite_movies_reducer = (state = initialFavoriteMoviesState, action) => {
	switch (action.type) {
		case actionTypes.SET_FAVORITE_MOVIES:
			const movieAlreadyExistsInState = state.favoriteMovies.some(item => item.key === action.payload.favoriteMovies.key);
			if (movieAlreadyExistsInState) {
				return state;
			}
			return {
				...state,
				favoriteMovies: [...state.favoriteMovies, ...action.payload.favoriteMovies],
			}
		case actionTypes.CLEAR_FAVORITE_MOVIES:
			return {
				...initialFavoriteMoviesState
			}
		case actionTypes.REMOVE_FROM_FAVORITE_MOVIES:
			return {
				...state,
				favoriteMovies: state.favoriteMovies.filter(item => item.data.movie.id !== action.payload)
			}
		default: return state;
	}
}

const current_movie_page_reducer = (state = initialCurrentMoviePageState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_MOVIE:
			return {
				...state,
				currentMoviePage: action.payload,
			}
		case actionTypes.CLEAR_CURRENT_MOVIE:
			return {
				...initialCurrentMoviePageState
			}
		default: return state;
	}
}

const person_reducer = (state = initialPersonsState, action) => {
	switch (action.type) {
		case actionTypes.SET_PERSONS:
			return {
				...state,
				uploadedPersons: [...state.uploadedPersons, ...action.payload.uploadedPersons],
			}
		case actionTypes.CLEAR_PERSONS:
			return {
				...state,
				uploadedPersons: [],
			}
		case actionTypes.SET_CURRENT_PERSON_PAGE:
			return {
				...state,
				currentPersonInfo: action.payload.currentPersonInfo,
			}
		case actionTypes.CLEAR_CURRENT_PERSON_PAGE:
			return {
				...state,
				currentPersonInfo: null,
			}
		case actionTypes.SET_FAVORITE_PERSONS:
			const personAlreadyExistsInState = state.favoritePersons.some(item => item.key === action.payload.favoritePerson.key);
			if (personAlreadyExistsInState) {
				return state;
			}
			return {
				...state,
				favoritePersons: [...state.favoritePersons, ...action.payload.favoritePerson],
			}
		case actionTypes.CLEAR_FAVORITE_PERSONS:
			return {
				...state,
				favoritePersons: [],
			}
		case actionTypes.REMOVE_FROM_FAVORITE_PERSONS:
			return {
				...state,
				favoritePersons: state.favoritePersons.filter(item => item.data.person.id !== action.payload)
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
	upcomingMovies: upcoming_movies_reducer,
	favoriteMovies: favorite_movies_reducer,
	currentMoviePage: current_movie_page_reducer,
	persons: person_reducer,
	genres: genres_reducer,
	myMarks: marks_reducer,
	reviews: reviews_reducer,
	searchResults: search_results_reducer,
});

export default rootReducer;