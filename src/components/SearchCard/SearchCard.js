import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import handleChooseCurrentMoviePage from "../../functions/setCurrentMoviePage";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultMovieImage from "../App/assets/icons/default-movie.svg";
import Loader from "../Loader/Loader";
import { clearCurrentMoviePage, clearCurrentPersonPage, setCurrentMovie, setCurrentPersonPage } from "../../actions";
import { connect } from "react-redux";
import getCurrentPersonPage from "../../functions/getCurrentPersonPage";
import './assets/index.scss';

const SearchCard = (props) => {

	const { result, isMovieCard, handleSetCurrentMoviePage, handleClearCurrentMoviePage, handleSetCurrentPersonPage, handleClearCurrentPersonPage } = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const linkToResultPage = isMovieCard ? `/movie/${result.id}` : `/person/${result.id}`;
	const resultText = isMovieCard ? result.title : result.name;
	const resultImage = `https://image.tmdb.org/t/p/w440_and_h660_face${isMovieCard ? result.poster_path : result.profile_path}`;

	let onClickRef = useRef();

	useEffect(() => {
		if (isMovieCard) {
			onClickRef.current = () => handleChooseCurrentMoviePage(result, handleClearCurrentMoviePage).then((data) => {handleSetCurrentMoviePage(data)});
		} else onClickRef.current = () => getCurrentPersonPage(result.id, handleClearCurrentPersonPage).then((data) => {handleSetCurrentPersonPage(data)});
	}, []);

	return (
		<div className="search-card">
			<Link to={linkToResultPage} className="search-card__link" onClick={onClickRef.current}>
				<div className="search-card__image-wrap">
					<img className="search-card__image" onError={event => addDefaultImage(event, defaultMovieImage)} onLoad={() => {setIsImageLoaded(true)}} src={resultImage} alt="image" />
					{!isImageLoaded && <Loader>Loading image</Loader>}
				</div>
				{
					isMovieCard === true && <span className="search-card__release-date">{(new Date(result.release_date).getFullYear())}</span>
				}
				<h3 className="search-card__title">{resultText}</h3>
			</Link>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetCurrentMoviePage: (selectedMovie) => dispatch(setCurrentMovie(selectedMovie)),
		handleClearCurrentMoviePage: () => dispatch(clearCurrentMoviePage()),
		handleSetCurrentPersonPage: (selectedPerson) => dispatch(setCurrentPersonPage(selectedPerson)),
		handleClearCurrentPersonPage: () => dispatch(clearCurrentPersonPage()),
	}
}

export default connect(null, mapDispatchToProps)(SearchCard);