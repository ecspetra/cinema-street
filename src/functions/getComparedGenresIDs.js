const getComparedGenresIDs = (uploadedGenres, movieGenresIDs) => {

	const comparedGenres = [];

	uploadedGenres.map((genre) => {
		if ((!movieGenresIDs.some(movieGenre => movieGenre.id === genre.id)) && (!comparedGenres.includes(genre.name))) {
			comparedGenres.push(genre.name);
		}
	});

	return comparedGenres;
}

export default getComparedGenresIDs;