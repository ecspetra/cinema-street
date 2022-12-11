import { get } from "firebase/database";

const getMyMoviesFromDatabase = (postListRef, receivedFavouriteMoviesKeys, handleSetFavouriteMovies) => {
	get(postListRef).then((snapshot) => {
		const receivedMovies = [];

		snapshot.forEach((childSnapshot) => {
			const favouriteMovie = {
				key: childSnapshot.key,
				data: childSnapshot.val(),
			}

			if (receivedMovies.length < 20 && receivedFavouriteMoviesKeys.length === 0) {
				receivedMovies.push(favouriteMovie);
			} else if (receivedFavouriteMoviesKeys.length > 0) {
				if (receivedMovies.length < 20 && !receivedFavouriteMoviesKeys.includes(favouriteMovie.key)) {
					receivedMovies.push(favouriteMovie);
				}
			}
		});

		handleSetFavouriteMovies(receivedMovies);
	});
}

export default getMyMoviesFromDatabase;