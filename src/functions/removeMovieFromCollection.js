import checkIfMovieExistsInCollection from "./checkIfMovieExistsInCollection";
import { ref, getDatabase, remove } from "firebase/database";

const removeMovieFromCollection = async (postListRef, movie, currentUser, removeFromFavoriteMoviesFunction) => {

	const database = getDatabase();

	let movieFromCollection = await checkIfMovieExistsInCollection(postListRef, movie.id, currentUser, true);

	removeFromFavoriteMoviesFunction(movie.id);

	const dbRef = ref(database, "/movies/" + movieFromCollection.key);

	remove(dbRef);
}

export default removeMovieFromCollection;