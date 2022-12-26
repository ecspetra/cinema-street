import { get } from "firebase/database";

export const getTotalFavoriteMovies = (postListRef, userID) => {
	return new Promise((resolve) => {
		get(postListRef).then((snapshot) => {
			const totalFavoriteMovies = [];

			snapshot.forEach((childSnapshot) => {
				const favoriteMovie = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (favoriteMovie.data.movie.userID === userID) {
					totalFavoriteMovies.push(favoriteMovie);
				}
			});

			resolve(totalFavoriteMovies);
		});
	})
}

export const getMyMoviesFromDatabase = (postListRef, receivedFavoriteMoviesKeys, userID) => {

	return new Promise((resolve) => {

		get(postListRef).then((snapshot) => {

			getTotalFavoriteMovies(postListRef, userID).then((data) => {

				const initialListLength = 20;
				const maxResponseLength = 20;
				const isFirstRenderForList = receivedFavoriteMoviesKeys.length === 0;
				const isShortList = data.length <= initialListLength;

				const response = {
					dataFromResponse: [],
					isLastData: false,
				}

				snapshot.forEach((childSnapshot) => {

					const favoriteMovie = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					if (isFirstRenderForList) {
						if (response.dataFromResponse.length < maxResponseLength && favoriteMovie.data.movie.userID === userID) {
							response.dataFromResponse.push(favoriteMovie);
						}
					} else {
						if (response.dataFromResponse.length < maxResponseLength && !receivedFavoriteMoviesKeys.includes(favoriteMovie.key) && favoriteMovie.data.movie.userID === userID) {
							response.dataFromResponse.push(favoriteMovie);
						}
					}
				});

				const isMoreResultsAvailable = response.dataFromResponse.length + receivedFavoriteMoviesKeys.length < data.length;

				if (isShortList) {
					response.isLastData = true;
				} else {
					if (isFirstRenderForList) {
						if (isMoreResultsAvailable) {
							response.isLastData = false;
						}
					} else {
						if (isMoreResultsAvailable) {
							response.isLastData = false;
						} else {
							response.isLastData = true;
						}
					}
				}

				resolve(response);
			})
		});

	})
}

export const fillFavoriteMoviesList = (postListRef, receivedFavoriteMoviesKeys, userID) => {
	return new Promise(async (resolve) => {
		get(postListRef).then((snapshot) => {

			getTotalFavoriteMovies(postListRef, userID).then((data) => {

				const response = {
					dataFromResponse: [],
				}

				snapshot.forEach((childSnapshot) => {

					const favoriteMovie = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					if (!receivedFavoriteMoviesKeys.includes(favoriteMovie.key) && favoriteMovie.data.movie.userID === userID) {
						response.dataFromResponse.push(favoriteMovie);
					}
				});

				resolve(response);
			})
		});
	})
}