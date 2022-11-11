const getMyMarks = (movieID, myMarks) => {

	const movieMark = myMarks.find(item => item.data.movie.id === movieID);

	return movieMark;
}

export default getMyMarks;