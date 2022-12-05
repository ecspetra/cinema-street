import axios from "axios";

const fetchMoreResults = async (linkToFetch, currentResultsPage, handleSetMovies) => {

	let wasLastList = false;

	const response = await axios.get(
		linkToFetch + '&page=' + currentResultsPage
	);

	if (currentResultsPage >= 3) {
		wasLastList = true;
		return;
	} else {
		handleSetMovies(response.data.results);
		return wasLastList;
	}
};

export default fetchMoreResults;