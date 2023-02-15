import React, { useContext } from "react";
import MoviesList from "../MoviesList/MoviesList";
import UserContext from "../UserContext/UserContext";

const FavoriteMovies = () => {

	const { currentUser } = useContext(UserContext);

	return (
		<>
			{
				currentUser ? (
					<>
						<h1>Favorite movies</h1>
						<div className="favorite-movie-list">
							<MoviesList isFavoriteMoviesList />
						</div>
					</>
				) : 'Loading'
			}

		</>
	)
}

export default FavoriteMovies;