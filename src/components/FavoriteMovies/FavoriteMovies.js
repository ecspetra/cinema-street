import React, { useContext } from "react";
import MoviesList from "../MoviesList/MoviesList";
import UserContext from "../UserContext/UserContext";
import Title from "../Title/Title";

const FavoriteMovies = () => {

	const { currentUser } = useContext(UserContext);

	return (
		<>
			{
				currentUser ? (
					<>
						<Title title={"Favorite movies"} />
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