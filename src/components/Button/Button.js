import React from "react";

const Button = (props) => {

	const favouriteMovies = props.favouriteMovies;

	const removeMovieFromCollection = () => {
		const favouriteMovieItem = favouriteMovies.find(item => item.data.movie.id === props.movie.id);
		const key = favouriteMovieItem.key;
		props.handleRemoveFromFavouriteMovies(props.movie.id, key);
	}

	return (
		<>
			{
				favouriteMovies && favouriteMovies.some(item => item.data.movie.id === props.movie.id)
					? (<button className="main-button main-button--remove" onClick={() => {removeMovieFromCollection()}}>Remove from collection</button>)
					: (<button className="main-button" onClick={() => {props.addMovieToMyCollection(props.movie)}}>Add to collection</button>)
			}
		</>
	)
}

export default Button;