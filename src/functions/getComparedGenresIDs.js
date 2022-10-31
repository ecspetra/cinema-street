const getComparedGenresIDs = (uploadedGenres, movieGenresIDs) => {

	const comparedGenres = [];

	uploadedGenres.genres && uploadedGenres.genres.map((genre) => {
		if ((movieGenresIDs.includes(genre.id)) && (!comparedGenres.includes(genre.name))) {
			comparedGenres.push(genre.name);
		}
	});
	return comparedGenres;
}

export default getComparedGenresIDs;