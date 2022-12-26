import { push, ref, set } from "firebase/database";
import checkIfMovieExistsInCollection from "./checkIfMovieExistsInCollection";

const postMovieToDataBase = async (database, movie, userID) => {

	const postListRef = ref(database, 'movies');
	const newPostRef = push(postListRef);

	let movieFromCollection = await checkIfMovieExistsInCollection(postListRef, movie.id);

	if (movieFromCollection === false) {
		set(newPostRef, {
			movie: {
				userID: userID,
				poster_path: 'https://image.tmdb.org/t/p/w440_and_h660_face' + movie.poster_path,
				title: movie.title,
				release_date: movie.release_date,
				id: movie.id,
				vote_average: movie.vote_average,
				genre_ids: movie.genre_ids ?? movie.genres.map((genre) => {
					return genre.id;
				}),
			},
		})
	}
}

export default postMovieToDataBase;