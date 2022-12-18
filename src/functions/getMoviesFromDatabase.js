import { get } from "firebase/database";

const getMyMoviesFromDatabase = (postListRef, receivedFavoriteMoviesKeys, handleSetFavoriteMovies, userID = null) => {
	get(postListRef).then((snapshot) => {
		const receivedMovies = [];

		snapshot.forEach((childSnapshot) => {
			const favoriteMovie = {
				key: childSnapshot.key,
				data: childSnapshot.val(),
			}

			if (userID === null) {
				if (receivedMovies.length < 20 && receivedFavoriteMoviesKeys.length === 0) {
					receivedMovies.push(favoriteMovie);
				} else if (receivedFavoriteMoviesKeys.length > 0) {
					if (receivedMovies.length < 20 && !receivedFavoriteMoviesKeys.includes(favoriteMovie.key)) {
						receivedMovies.push(favoriteMovie);
					}
				}
			} else {
				if (receivedMovies.length < 20 && receivedFavoriteMoviesKeys.length === 0 && userID === favoriteMovie.data.movie.userID) {
					receivedMovies.push(favoriteMovie);
				} else if (receivedFavoriteMoviesKeys.length > 0) {
					if (receivedMovies.length < 20 && !receivedFavoriteMoviesKeys.includes(favoriteMovie.key) && userID === favoriteMovie.data.movie.userID) {
						receivedMovies.push(favoriteMovie);
					}
				}
			}
		});

		handleSetFavoriteMovies(receivedMovies);
	});
}

export default getMyMoviesFromDatabase;