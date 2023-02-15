import { get } from "firebase/database";

const checkIfMovieExistsInCollection = (postListRef, movieID, currentUser, isMovieNeeded = false) => {
	return new Promise((resolve) => {
		get(postListRef).then((snapshot) => {

			let movie = false;

			snapshot.forEach((childSnapshot) => {
				const favoriteMovie = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (movieID === favoriteMovie.data.movie.id && favoriteMovie.data.movie.userID === currentUser.uid && isMovieNeeded === true) {
					movie = favoriteMovie;
				} else if (movieID === favoriteMovie.data.movie.id && favoriteMovie.data.movie.userID === currentUser.uid && isMovieNeeded === false) {
					movie = true;
				}
			});

			resolve(movie)
		});
	});
}

export default checkIfMovieExistsInCollection;