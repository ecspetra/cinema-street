import React, { useState } from "react";
import { Link } from "react-router-dom";
import handleChooseCurrentMoviePage from "../../functions/setCurrentMoviePage";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultMovieImage from "../App/assets/icons/default-movie.svg";
import Loader from "../Loader/Loader";
import { clearCurrentMoviePage, setCurrentMovie } from "../../actions";
import { connect } from "react-redux";

const SearchCard = (props) => {

	const { result, isMovieCard, handleSetCurrentMoviePage, handleClearCurrentMoviePage } = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	return (
		<div className="search-card">
			{
				isMovieCard ? (
					<Link to={"/movie/" + result.id} className="search-card__link" onClick={() => {
						handleChooseCurrentMoviePage(result, handleSetCurrentMoviePage, handleClearCurrentMoviePage)
						}}>
						<div className="search-card__image-wrap">
							<img className="search-card__image" onError={event => addDefaultImage(event, defaultMovieImage)} onLoad={() => {setIsImageLoaded(true)}} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + result.poster_path} alt="movie-poster" />
							{!isImageLoaded && <Loader>Loading image</Loader>}
						</div>
						<span className="search-card__release-date">{(new Date(result.release_date).getFullYear())}</span>
						<h3 className="search-card__title">{result.title}</h3>
					</Link>
				) : 'person card'
			}
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetCurrentMoviePage: (selectedMovie) => dispatch(setCurrentMovie(selectedMovie)),
		handleClearCurrentMoviePage: () => dispatch(clearCurrentMoviePage()),
	}
}

export default connect(null, mapDispatchToProps)(SearchCard);