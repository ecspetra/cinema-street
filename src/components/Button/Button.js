import React, { useEffect } from "react";
import { removeFromFavouriteMovies } from "../../actions";
import { connect } from "react-redux";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import checkIfMovieExistsInCollection from "../../functions/checkIfMovieExistsInCollection";

const Button = (props) => {

	const { movie, handleRemoveFromFavouriteMovies, isMovieFromCollection, setIsMovieFromCollection } = props;

	const database = getDatabase();
	const postListRef = ref(database, 'movies');
	const newPostRef = push(postListRef);

	const handleCollectionButtonOnClick = () => {
		if (isMovieFromCollection) {
			return <button className="main-button main-button--remove" onClick={() => {removeMovieFromCollection(movie)}}>Remove from collection</button>
		} else {
			return <button className="main-button" onClick={() => {addMovieToMyCollection(movie)}}>Add to collection</button>
		}
	}

	const collectionButton = handleCollectionButtonOnClick();

	const postMovieToDataBase = (selectedMovie) => {
		set(newPostRef, {
			movie: {
				poster_path: 'https://image.tmdb.org/t/p/w440_and_h660_face' + selectedMovie.poster_path,
				title: selectedMovie.title,
				release_date: selectedMovie.release_date,
				id: selectedMovie.id,
				vote_average: selectedMovie.vote_average,
				genre_ids: selectedMovie.genre_ids ?? selectedMovie.genres.map((genre) => {
					return genre.id;
				}),
			},
		})
	}

	const addMovieToMyCollection = (selectedMovie) => {
		postMovieToDataBase(selectedMovie);
		checkIfMovieExistsInCollection(postListRef, movie.id).then(data => setIsMovieFromCollection(data))
	}

	const removeMovieFromCollection = async (selectedMovie) => {

		let movieFromCollection = await checkIfMovieExistsInCollection(postListRef, selectedMovie.id, true);

		handleRemoveFromFavouriteMovies(selectedMovie.id);

		const dbRef = ref(database, "/movies/" + movieFromCollection.key);
		remove(dbRef);
		setIsMovieFromCollection(false);
	}

	useEffect(() => {
		handleCollectionButtonOnClick();
	}, [isMovieFromCollection]);

	return (collectionButton)
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleRemoveFromFavouriteMovies: (key) => dispatch(removeFromFavouriteMovies(key)),
	}
}

export default connect(null, mapDispatchToProps)(Button);