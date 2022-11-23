import * as actionTypes from '../actions/types';
import { combineReducers } from "redux";

const initialUserState = {
	currentUser: null,
	isLoading: true
}

const initialMoviesState = {
	uploadedMovies: [],
}

const initialMarksState = {
	uploadedMarks: [],
}

const initialReviewsState = {
	uploadedReviews: [],
}

const initialUpcomingMoviesState = {
	upcomingMovies: null,
}

const initialFavouriteMoviesState = {
	favouriteMovies: [],
}

const initialCurrentMoviePageState = {
	currentMovieInfo: null,
	currentMovieCredits: null,
	currentMovieImages: null,
	currentMovieReviews: null,
	currentMovieVideos: null,
}

const initialPersonsState = {
	uploadedPersons: null,
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
			return {...state, uploadedMarks: state.uploadedMarks.filter(item => item.key !== action.payload)}
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
			return {...state, uploadedReviews: state.uploadedReviews.filter(item => item.id !== action.payload)}
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
				currentMovieInfo: action.payload.currentMovieInfo,
			}
		case actionTypes.SET_CURRENT_MOVIE_CREDITS:
			return {
				...state,
				currentMovieCredits: action.payload.currentMovieCredits,
			}
		case actionTypes.SET_CURRENT_MOVIE_IMAGES:
			return {
				...state,
				currentMovieImages: action.payload.currentMovieImages,
			}
		case actionTypes.SET_CURRENT_MOVIE_REVIEWS:
			return {
				...state,
				currentMovieReviews: action.payload.currentMovieReviews,
			}
		case actionTypes.SET_CURRENT_MOVIE_VIDEOS:
			return {
				...state,
				currentMovieVideos: action.payload.currentMovieVideos,
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
				uploadedPersons: action.payload.uploadedPersons,
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
	favouriteMovies: favourite_movies_reducer,
	currentMoviePage: current_movie_page_reducer,
	persons: person_reducer,
	genres: genres_reducer,
	myMarks: marks_reducer,
	reviews: reviews_reducer,
});

export default rootReducer;