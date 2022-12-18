export const API_KEY = '1fdbb7205b3bf878ede960ab5c9bc7ce';

export const DEFAULT_LINK_TO_FETCH_MOVIES = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY;
export const LINK_TO_FETCH_SIMILAR_MOVIES = 'https://api.themoviedb.org/3/movie/{movieID}/similar?api_key=' + API_KEY;
export const LINK_TO_FETCH_SEARCH_MOVIES_BY_TITLE = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query={movieTitle}';
export const LINK_TO_FETCH_SEARCH_MOVIES_BY_GENRE = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY + '&with_genres={genreID}';
export const LINK_TO_FETCH_PERSONS = 'https://api.themoviedb.org/3/person/popular/?api_key=' + API_KEY;
