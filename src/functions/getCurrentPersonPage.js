import axios from "axios";
import { API_KEY } from "./linksToFetch";

const getCurrentPersonPage = async (selectedPerson, setCurrentPersonPageFunction, clearCurrentPersonPageFunction) => {
	clearCurrentPersonPageFunction();

	const response = await axios.get(
		'https://api.themoviedb.org/3/person/' + selectedPerson + '?api_key=' + API_KEY
	);

	setCurrentPersonPageFunction(response.data);
}

export default getCurrentPersonPage;