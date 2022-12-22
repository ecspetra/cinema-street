import { get } from "firebase/database";

const checkIfMovieExistsInCollection = (postListRef, movieID, isMovieNeeded = false) => {
	return new Promise((resolve) => {
		get(postListRef).then((snapshot) => {

			let movie = false;

			snapshot.forEach((childSnapshot) => {
				const favoriteMovie = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (movieID === favoriteMovie.data.movie.id && isMovieNeeded === true) {
					movie = favoriteMovie;
				} else if (movieID === favoriteMovie.data.movie.id && isMovieNeeded === false) {
					movie = true;
				}
			});

			resolve(movie)
		});
	});
}

export default checkIfMovieExistsInCollection;