import React, {useState} from "react";
import MovieList from "../MovieList/MovieList";

const CompanyPage = (props) => {

	const [companyMovies, setCompanyMovies] = useState([]);

	// const getCompanyMovies = () => {
	// 	props.movies.map((movie) => {
	// 		if (movie.com)
	// 	})
	// }

	return (
		<div>
			<h1>{props.currentCompany.name}</h1>
			<MovieList />
		</div>
	)
}

export default CompanyPage;