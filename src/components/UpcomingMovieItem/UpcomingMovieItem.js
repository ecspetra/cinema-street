import React, {useEffect, useState} from "react";

import getMovieGenresIDs from "../../functions/getMovieGenresIDs";
import getComparedGenresIDs from "../../functions/getComparedGenresIDs";
import classNames from "classnames";
import moment from "moment";

const UpcomingMovieItem = (props) => {

	const [upcomingMovieGenresIDs, setUpcomingMovieGenresIDs] = useState([]);
	const [upcomingMovieGenresNames, setUpcomingMovieGenresNames] = useState([]);

	useEffect(() => {
		const movieGenresIDsArray = getMovieGenresIDs(props.genres, props.movie);
		setUpcomingMovieGenresIDs(movieGenresIDsArray);
	}, []);

	useEffect(() => {
		const comparedGenresNames = getComparedGenresIDs(props.genres, upcomingMovieGenresIDs);
		setUpcomingMovieGenresNames(comparedGenresNames);
	}, [upcomingMovieGenresIDs]);

	const upcomingMovieListItemClassNames = classNames('upcoming-movies__list-item', {
		'upcoming-movies__list-item--selected': props.isMoviePreviewSelected === props.movie.id,
	});

	const movieReleaseDate = moment(props.movie.release_date).format("MMM D");

	return (
		<div className={upcomingMovieListItemClassNames} onClick={() => {props.handleSetMoviePreview(props.movie);}}>
			<div className="upcoming-movies__date-label">{movieReleaseDate}</div>
			<div className="upcoming-movies__list-item-text-wrap">
				<h3 className="upcoming-movies__list-item-title">{props.movie.title}</h3>
				<div className="upcoming-movies__genres-wrap">
					{
						upcomingMovieGenresNames.map((genre, index) => {
							if (index < 3) {
								return <span className="upcoming-movies__genres-item" key={index}>{genre + ((index !== 2 && index !== upcomingMovieGenresNames.length - 1) ? ', ' : '')}</span>
							}
						})
					}
				</div>
			</div>
		</div>
	)
}

export default UpcomingMovieItem;