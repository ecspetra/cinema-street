import React, { useEffect, useRef, useState, useContext } from "react";
import CollectionButton from "../CollectionButton/CollectionButton";
import PersonsList from "../PersonsList/PersonsList";
import BackdropsList from "../BackdropsList/BackdropsList";
import ReviewsList from "../ReviewsList/ReviewsList";
import MoviesList from "../MoviesList/MoviesList";
import ProductionCompany from "../ProductionCompany/ProductionCompany";
import Rating from "../Rating/Rating";
import { LINK_TO_FETCH_SIMILAR_MOVIES } from '../../functions/linksToFetch';
import MyMark from "../MyMark/MyMark";
import NewReviewForm from "../NewReviewForm/NewReviewForm";
import checkIfMovieExistsInCollection from "../../functions/checkIfMovieExistsInCollection";
import { getDatabase, ref } from "firebase/database";
import { connect } from "react-redux";
import {clearCurrentMoviePage, clearReviews, removeFromFavoriteMovies} from "../../actions";
import postMovieToDataBase from "../../functions/postMovieToDataBase";
import removeMovieFromCollection from "../../functions/removeMovieFromCollection";
import Loader from "../Loader/Loader";
import DeleteMovieFromCollectionPopup from "../Popups/DeleteMovieFromCollectionPopup/DeleteMovieFromCollectionPopup";
import Modal from "../Modal/Modal";
import InfoPopup from "../InfoPopup/InfoPopup";
import {getInfoPopupText} from "../../functions/getInfoPopupText";
import DirectorIcon from "../App/assets/icons/DirectorIcon";
import CalendarIcon from "../App/assets/icons/CalendarIcon";
import TaglineIcon from "../App/assets/icons/TaglineIcon";
import FlagIcon from "../App/assets/icons/FlagIcon";
import classNames from "classnames";
import Plyr from "plyr-react";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultMovieImage from "../App/assets/icons/default-movie.svg";
import './assets/index.scss';
import md5 from "md5";
import UserContext from "../UserContext/UserContext";
import Title from "../Title/Title";

const MoviePage = (props) => {

	const { currentMoviePage, handleClearCurrentMoviePage, handleRemoveFromFavoriteMovies } = props;

	const isCurrentMovieLoaded = currentMoviePage !== null && Object.values(currentMoviePage) !== null;

	const { currentUser } = useContext(UserContext);

	let currentMovieInfo;
	let currentMovieCredits;
	let currentMovieImages;
	let currentMovieReviews;
	let currentMovieVideos;

	if (isCurrentMovieLoaded) {
		currentMovieInfo = currentMoviePage.currentMovieInfo;
		currentMovieCredits = currentMoviePage.currentMovieCredits;
		currentMovieImages = currentMoviePage.currentMovieImages;
		currentMovieReviews = currentMoviePage.currentMovieReviews;
		currentMovieVideos = currentMoviePage.currentMovieVideos;
	}

	const database = getDatabase();
	const postListRef = ref(database, 'movies');

	let videoSrcRef = useRef();
	let infoPopupTextRef = useRef();
	let infoPopupTimerRef = useRef();
	const [isMovieFromCollection, setIsMovieFromCollection] = useState(false);
	const [isShowModal, setIsShowModal] = useState(false);
	const [isShowInfoPopup, setIsShowInfoPopup] = useState(false);
	const [isActionCompletedSuccessfully, setIsActionCompletedSuccessfully] = useState(undefined);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const onMoviePageUnmount = useRef();
	onMoviePageUnmount.current = () => {
		handleClearCurrentMoviePage();
	}

	const handleAddMovieToMyCollection = async () => {

		if (isShowInfoPopup === true) {
			setIsShowInfoPopup(false);
			clearTimeout(infoPopupTimerRef.current);
		}

		await postMovieToDataBase(database, currentMovieInfo, currentUser);
		checkIfMovieExistsInCollection(postListRef, currentMovieInfo.id, currentUser).then(isMovieExistsInCollection => {
			setIsMovieFromCollection(isMovieExistsInCollection);

			infoPopupTextRef.current = getInfoPopupText('add', isMovieExistsInCollection, 'Movie added to favorites successfully');

			if (infoPopupTextRef.current.isActionCompletedSuccessfully === true) {
				setIsActionCompletedSuccessfully(true);
			} else setIsActionCompletedSuccessfully(false);

			setIsShowInfoPopup(true);

			infoPopupTimerRef.current = setTimeout(() => {
				setIsShowInfoPopup(false);
			}, 2000);
		});
	}

	const handleRemoveMovieFromCollection = async () => {
		setIsShowModal(false);

		if (isShowInfoPopup === true) {
			setIsShowInfoPopup(false);
			clearTimeout(infoPopupTimerRef.current);
		}

		await removeMovieFromCollection(postListRef, currentMovieInfo, currentUser, handleRemoveFromFavoriteMovies);
		checkIfMovieExistsInCollection(postListRef, currentMovieInfo.id, currentUser).then(isMovieExistsInCollection => {
			setIsMovieFromCollection(isMovieExistsInCollection);

			infoPopupTextRef.current = getInfoPopupText('remove', isMovieExistsInCollection, 'Movie removed from favorites successfully');

			if (infoPopupTextRef.current.isActionCompletedSuccessfully === true) {
				setIsActionCompletedSuccessfully(true);
			} else setIsActionCompletedSuccessfully(false);

			setIsShowInfoPopup(true);

			infoPopupTimerRef.current = setTimeout(() => {
				setIsShowInfoPopup(false);
			}, 2000);
		});
	}

	const handleIsShowModal = () => {
		setIsShowModal(true);
	}

	const collectionButtonOnClickFunction = isMovieFromCollection ? handleIsShowModal : handleAddMovieToMyCollection;

	useEffect(() => {
		return () => onMoviePageUnmount.current();
	}, []);

	useEffect(() => {
		if (isCurrentMovieLoaded) {
			checkIfMovieExistsInCollection(postListRef, currentMovieInfo.id, currentUser).then(data => setIsMovieFromCollection(data));
			videoSrcRef.current = {
				type: "video",
				sources: [
					{
						src: getMovieTrailer(),
						provider: "youtube",
					}
				]
			}
		}
	}, [isCurrentMovieLoaded]);

	const reviewCardRef = useRef(null);

	const getMovieDirector = () => {

		const movieDirector = currentMovieCredits.find(person => person.job === 'Director');

		return movieDirector.name;
	}

	const getMovieTrailer = () => {
		const trailer = currentMovieVideos.find(video => video.type === "Trailer");
		const video = currentMovieVideos[0];
		return trailer ? trailer.key : video.key;
	}

	const infoPopupClassNames = classNames({
		'info-popup--error': isActionCompletedSuccessfully === false,
	});

	return (
		<>
			{
				isCurrentMovieLoaded ? (
					<div className="movie-page">
						<div className="movie-page__content">
							<div className="movie-page__movie-info">
								<div className="movie-page__cover-wrap">
									<img className="movie-page__image" onError={event => addDefaultImage(event, defaultMovieImage)} onLoad={() => {setIsImageLoaded(true)}} src={`https://image.tmdb.org/t/p/w440_and_h660_face${currentMovieInfo.poster_path}`} alt="image" />
									{!isImageLoaded && <Loader>Loading image</Loader>}
								</div>
								<div className="movie-page__info-wrap">
									{currentMovieInfo.adult && <span>18+</span>}
									<Title className="movie-page__title" title={currentMovieInfo.title} />
									<p className="movie-page__genres">
										{
											currentMovieInfo && currentMovieInfo.genres.map((item, index) => {
												return <span className="movie-page__genres-item" key={md5(item.id + index)}>{item.name + (index !== (currentMovieInfo.genres.length - 1) ? ', ' : '')}</span>
											})
										}
									</p>
									<div className="movie-page__details-wrap">
										{
											currentMovieInfo.tagline && (
												<div className="movie-page__details movie-page__details--tagline">
													<TaglineIcon />
													<p className="movie-page__details-text">{currentMovieInfo.tagline}</p>
												</div>
											)
										}
										<div className="movie-page__details movie-page__details--release-date">
											<CalendarIcon />
											<p className="movie-page__details-text">Release date: {new Intl.DateTimeFormat('en-GB', {
												month: 'long',
												day: '2-digit',
												year: 'numeric',
											}).format(new Date(currentMovieInfo.release_date))}</p>
										</div>
										<div className="movie-page__details movie-page__details--production-countries">
											<FlagIcon />
											<p className="movie-page__details-text">
												{
													currentMovieInfo && currentMovieInfo.production_countries.map((item, index) => {
														return <span className="movie-page__details-item movie-page__details-item--production-countries-item" key={item.name}>{item.name + (index !== currentMovieInfo.production_countries.length - 1 ? ', ' : '')}</span>
													})
												}
											</p>
										</div>
										<div className="movie-page__details movie-page__details--director">
											<DirectorIcon />
											<p className="movie-page__details-text">Director: {getMovieDirector()}</p>
										</div>
									</div>
									<Rating movie={currentMovieInfo} isRatingCount isShowExtendRating />
									<h3 className="movie-page__my-mark-title">My mark:</h3>
									<MyMark movie={currentMovieInfo} isShowExtendMark />
									<h3 className="movie-page__overview-title">Overview:</h3>
									<p className="movie-page__overview">{currentMovieInfo.overview}</p>
									<div className="movie-page__production-companies-wrap">
										<h3 className="movie-page__production-companies-title">Production companies:</h3>
										<div className="production-companies">
											{
												currentMovieInfo && currentMovieInfo.production_companies.map((item) => {
													return <ProductionCompany company={item} key={item.name} />
												})
											}
										</div>
									</div>
									<CollectionButton isExistsInCollection={isMovieFromCollection} collectionButtonOnClickFunction={collectionButtonOnClickFunction}>{isMovieFromCollection ? 'Remove from favorite' : 'Add to favorite'}</CollectionButton>
								</div>
							</div>
							<div className="movie-page__credits-wrap">
								<Title title={"Persons"} />
								<PersonsList currentMoviePersons={currentMovieCredits} isCurrentMovieCharacter />
							</div>
							<div className="movie-page__video-wrap">
								<Title title={"Trailer"} />
								<div className="movie-page__video">
									<Plyr source={videoSrcRef.current} />
								</div>
							</div>
							<div className="movie-page__images-wrap">
								<Title title={"Backdrops"} />
								<BackdropsList backdrops={currentMovieImages.backdrops} />
							</div>
							<div className="movie-page__reviews-wrap">
								<Title title={"Reviews"} />
								<div className="movie-page__reviews">
									<ReviewsList ref={reviewCardRef} movieID={currentMovieInfo.id} reviews={currentMovieReviews.results} />
									<NewReviewForm reviewCardRef={reviewCardRef} movieID={currentMovieInfo.id} />
								</div>
							</div>
							<div className="movie-page__similar-movies-wrap">
								<Title title={"Similar movies"} />
								<MoviesList linkToFetch={LINK_TO_FETCH_SIMILAR_MOVIES.replace('{movieID}', currentMovieInfo.id)} />
							</div>
						</div>
						<Modal isShowModal={isShowInfoPopup} className="modal--transparent" overflow={'visible'}>
							<InfoPopup className={infoPopupClassNames} title={infoPopupTextRef.current !== undefined ? infoPopupTextRef.current.resultText : null} />
						</Modal>
						<DeleteMovieFromCollectionPopup isShowModal={isShowModal} setIsShowModal={setIsShowModal} handleRemoveMovieFromCollection={handleRemoveMovieFromCollection} />
					</div>
				)
					: <div className="movie-page-empty"><Loader>Loading movie</Loader></div>
			}
		</>
	)
}

const mapStateToProps = state => ({
	currentMoviePage: state.currentMoviePage.currentMoviePage,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleClearCurrentMoviePage: () => dispatch(clearCurrentMoviePage()),
		handleRemoveFromFavoriteMovies: (key) => dispatch(removeFromFavoriteMovies(key)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);