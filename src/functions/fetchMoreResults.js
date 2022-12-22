import axios from "axios";

const fetchMoreResults = async (linkToFetch, currentResultsPage) => {

	return new Promise(async (resolve) => {

		const response = {
			dataFromResponse: null,
			isLastData: false,
		}

		response.dataFromResponse = await axios.get(
			linkToFetch + '&page=' + currentResultsPage
		);

		response.isLastData = await axios.get(
			linkToFetch + '&page=' + (currentResultsPage + 1)
		);

		if (response.isLastData === undefined) {
			response.isLastData = true;
		}

		resolve(response);
	})
};

export default fetchMoreResults;