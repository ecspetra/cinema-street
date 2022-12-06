import axios from "axios";

const fetchMoreResults = async (linkToFetch, currentResultsPage, handleSetResults) => {

	let isResultsExist = true;

	const response = await axios.get(
		linkToFetch + '&page=' + currentResultsPage
	);

	if (!response.data.results.length) {
		isResultsExist = false;
		return;
	} else {
		handleSetResults(response.data.results);
		return isResultsExist;
	}
};

export default fetchMoreResults;