import React from "react";
import MovieCard from "../MovieCard/MovieCard";

const FavouriteMovies = (props) => {

	const favouriteMovies = props.favouriteMovies;

	return (
		<div className="favourite-movie-list">
			{
				favouriteMovies
					?
					<>
						{favouriteMovies.map((item, index) => {
							return <MovieCard movie={item.data.movie} key={index} genres={props.genres} favouriteMovieInfo={item} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage}/>
						}
					)}
					</>
					: 'You don\'t have favourite movies'
			}
		</div>
	)
}

export default FavouriteMovies;