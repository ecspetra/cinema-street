import React from "react";
import MovieCard from "../MovieCard/MovieCard";

const FavouriteMovies = (props) => {

	const favouriteMovies = props.favouriteMovies;

	return (
		<>
			<h1>My collection</h1>
			<div className="favourite-movie-list">
				{
					favouriteMovies
						?
						<>
							{favouriteMovies.map((item, index) => {
									return <MovieCard movie={item.data.movie} key={index} genres={props.genres} favouriteMovies={props.favouriteMovies} favouriteMovieInfo={item} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage}/>
								}
							)}
						</>
						: 'You don\'t have favourite movies'
				}
			</div>
		</>
	)
}

export default FavouriteMovies;