import axios from "axios";
import { API_KEY } from "./linksToFetch";

const getCurrentPersonPage = async (selectedPerson, clearCurrentPersonPageFunction) => {
	clearCurrentPersonPageFunction();

	return new Promise(async (resolve) => {
		const response = await axios.get(
			'https://api.themoviedb.org/3/person/' + selectedPerson + '?api_key=' + API_KEY
		);

		resolve(response.data);
	})
}

export default getCurrentPersonPage;