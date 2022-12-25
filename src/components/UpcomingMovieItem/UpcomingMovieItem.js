import React, {useEffect, useState} from "react";

import getMovieGenresIDs from "../../functions/getMovieGenresIDs";
import getComparedGenresIDs from "../../functions/getComparedGenresIDs";
import classNames from "classnames";
import moment from "moment";
import {connect} from "react-redux";
import getGenres from "../../functions/getGenres";
import {setGenres} from "../../actions";

const UpcomingMovieItem = (props) => {

	const { genres, movie, isMoviePreviewSelected, handleSetMoviePreview, handleSetGenres } = props;

	const [upcomingMovieGenresIDs, setUpcomingMovieGenresIDs] = useState([]);
	const [upcomingMovieGenresNames, setUpcomingMovieGenresNames] = useState([]);

	useEffect(() => {
		if (genres) {
			const movieGenresIDsArray = getMovieGenresIDs(genres, movie);
			setUpcomingMovieGenresIDs(movieGenresIDsArray);
		}
	}, []);

	useEffect(() => {
		if (genres) {
			const comparedGenresNames = getComparedGenresIDs(genres, upcomingMovieGenresIDs);
			setUpcomingMovieGenresNames(comparedGenresNames);
		}
	}, [upcomingMovieGenresIDs]);

	// useEffect(() => {
	// 	getGenres(handleSetGenres);
	// }, []);

	useEffect(() => {
		getGenres().then((data) => {handleSetGenres(data)});
	}, []);

	const upcomingMovieListItemClassNames = classNames('upcoming-movies__list-item', {
		'upcoming-movies__list-item--selected': isMoviePreviewSelected === movie.id,
	});

	const movieReleaseDate = {
		releaseDay: moment(movie.release_date).format("D"),
		releaseMonth: moment(movie.release_date).format("MMM"),
		releaseYear: moment(movie.release_date).format("Y"),
	}

	return (
		<div className={upcomingMovieListItemClassNames} onClick={() => {handleSetMoviePreview(movie);}}>
			<div className="upcoming-movies__date-label">
				<span className="upcoming-movies__date-day">{movieReleaseDate.releaseDay}</span>
				<span className="upcoming-movies__date-month">{movieReleaseDate.releaseMonth}</span>
			</div>
			<div className="upcoming-movies__list-item-text-wrap">
				<h3 className="upcoming-movies__list-item-title">{movie.title}</h3>
				<div className="upcoming-movies__list-item-info">
					<span className="upcoming-movies__date-year">{movieReleaseDate.releaseYear}</span>
					<div className="upcoming-movies__genres-wrap">
						{
							upcomingMovieGenresNames.map((genre, index) => {
								if (index < 3) {
									return <span className="upcoming-movies__genres-item" key={genre.name}>{genre + ((index !== 2 && index !== upcomingMovieGenresNames.length - 1) ? ', ' : '')}</span>
								}
							})
						}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	genres: state.genres.uploadedGenres,
});

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetGenres: (genres) => dispatch(setGenres(genres)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovieItem);