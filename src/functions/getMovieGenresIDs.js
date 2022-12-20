const getMovieGenresIDs = (uploadedGenres, movie) => {

	const movieGenresIDs = [];

	movie.genre_ids.map((movieGenre) => {
		const equalGenre = uploadedGenres.find(genre => movieGenre === genre.id);
		movieGenresIDs.push(equalGenre);
	});

	return movieGenresIDs;
}

export default getMovieGenresIDs;