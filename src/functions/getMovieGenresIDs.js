const getMovieGenresIDs = (uploadedGenres, movie) => {

	const movieGenresIDs = [];

	movie.genre_ids.map((genre, index) => {
		uploadedGenres.genres.find(genre => genre === uploadedGenres.genres[index].id);
		movieGenresIDs.push(genre);
	});

	return movieGenresIDs;
}

export default getMovieGenresIDs;