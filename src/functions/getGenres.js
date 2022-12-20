import axios from "axios";
import { API_KEY } from "./linksToFetch";

const getGenres = async () => {
	return new Promise(async (resolve) => {
		const response = await axios.get(
			'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY
		);
		resolve(response.data.genres);
	})
}

export default getGenres;