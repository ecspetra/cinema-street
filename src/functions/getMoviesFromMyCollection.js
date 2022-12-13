import { get } from "firebase/database";

const getMyMoviesFromDatabase = (postListRef, receivedFavoriteMoviesKeys, handleSetFavoriteMovies) => {
	get(postListRef).then((snapshot) => {
		const receivedMovies = [];

		snapshot.forEach((childSnapshot) => {
			const favoriteMovie = {
				key: childSnapshot.key,
				data: childSnapshot.val(),
			}

			if (receivedMovies.length < 20 && receivedFavoriteMoviesKeys.length === 0) {
				receivedMovies.push(favoriteMovie);
			} else if (receivedFavoriteMoviesKeys.length > 0) {
				if (receivedMovies.length < 20 && !receivedFavoriteMoviesKeys.includes(favoriteMovie.key)) {
					receivedMovies.push(favoriteMovie);
				}
			}
		});

		handleSetFavoriteMovies(receivedMovies);
	});
}

export default getMyMoviesFromDatabase;