import { get } from "firebase/database";

const checkIfMovieExistsInCollection = (postListRef, movieID, isMovieNeeded = false) => {
	return new Promise(function(resolve) {
		get(postListRef).then((snapshot) => {
			let movie = false;

			snapshot.forEach((childSnapshot) => {
				const favouriteMovie = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (movieID === favouriteMovie.data.movie.id && isMovieNeeded === true) {
					movie = favouriteMovie;
				} else if (movieID === favouriteMovie.data.movie.id && isMovieNeeded === false) {
					movie = true;
				}
			});

			resolve(movie)
		});
	});
}

export default checkIfMovieExistsInCollection;