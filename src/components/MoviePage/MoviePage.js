import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import ActorsList from "../ActorsList/ActorsList";
import BackdropsList from "../BackdropsList/BackdropsList";
import ReviewsList from "../ReviewsList/ReviewsList";
import MovieList from "../MovieList/MovieList";
import ProductionCompany from "../ProductionCompany/ProductionCompany";
import Rating from "../Rating/Rating";
import { LINK_TO_FETCH_PERSONS, LINK_TO_FETCH_SIMILAR_MOVIES } from '../../functions/linksToFetch';
import MyMark from "../MyMark/MyMark";
import NewReviewForm from "../NewReviewForm/NewReviewForm";
import checkIfMovieExistsInCollection from "../../functions/checkIfMovieExistsInCollection";
import { getDatabase, ref } from "firebase/database";
import { connect } from "react-redux";
import { clearCurrentMoviePage } from "../../actions";

const MoviePage = (props) => {

	const { currentMoviePage, getCurrentPersonInfo, handleClearCurrentMoviePage } = props;

	const isCurrentMovieLoaded = currentMoviePage !== null && Object.values(currentMoviePage) !== null;

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

	const [isMovieFromCollection, setIsMovieFromCollection] = useState(false);

	const onMoviePageUnmount = useRef();
	onMoviePageUnmount.current = () => {
		handleClearCurrentMoviePage();
	}

	useEffect(() => {
		return () => onMoviePageUnmount.current();
	}, []);

	useEffect(() => {
		if (isCurrentMovieLoaded) {
			checkIfMovieExistsInCollection(postListRef, currentMovieInfo.id).then(data => setIsMovieFromCollection(data));
		}
	}, [isCurrentMovieLoaded]);

	return (
		<>
			{
				isCurrentMovieLoaded ? (
					<div className="movie-page">
						<div className="movie-page__content">
							<div className="movie-page__movie-info">
								<div className="movie-page__cover-wrap">
									<img className="movie-page__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + currentMovieInfo.poster_path} alt="movie-poster" />
								</div>
								<div className="movie-page__info-wrap">
									{currentMovieInfo.adult && <span>18+</span>}
									<h1 className="movie-page__title">{currentMovieInfo.title}</h1>
									<p className="movie-page__genres">
										{
											currentMovieInfo && currentMovieInfo.genres.map((item, index) => {
												return <span className="movie-page__genres-item" key={index}>{item.name + (index !== (currentMovieInfo.genres.length - 1) ? ', ' : '')}</span>
											})
										}
									</p>
									{
										currentMovieInfo.tagline && <p className="movie-page__details movie-page__details--tagline">{currentMovieInfo.tagline}</p>
									}
									<p className="movie-page__details movie-page__details--release-date">Release date: {new Intl.DateTimeFormat('en-GB', {
										month: 'long',
										day: '2-digit',
										year: 'numeric',
									}).format(new Date(currentMovieInfo.release_date))}</p>
									<p className="movie-page__details movie-page__details--production-countries">
										{
											currentMovieInfo && currentMovieInfo.production_countries.map((item, index) => {
												return <span className="movie-page__details-item movie-page__details-item--production-countries-item" key={index}>{item.name + (index !== currentMovieInfo.production_countries.length - 1 ? ', ' : '')}</span>
											})
										}
									</p>
									<Rating movie={currentMovieInfo} isRatingCount isShowExtendRating />
									<h3 className="movie-page__my-mark-title">My mark:</h3>
									<MyMark movie={currentMovieInfo} isShowExtendMark />
									<h3 className="movie-page__overview-title">Overview:</h3>
									<p className="movie-page__overview">{currentMovieInfo.overview}</p>
									<div className="movie-page__production-companies-wrap">
										<h3 className="movie-page__production-companies-title">Production companies:</h3>
										<div className="production-companies">
											{
												currentMovieInfo && currentMovieInfo.production_companies.map((item, index) => {
													return <ProductionCompany company={item} key={index} />
												})
											}
										</div>
									</div>
									<Button movie={currentMovieInfo} isMovieFromCollection={isMovieFromCollection} setIsMovieFromCollection={setIsMovieFromCollection} />
								</div>
							</div>
							<div className="movie-page__credits-wrap">
								<h1>Cast</h1>
								<ActorsList linkToFetch={LINK_TO_FETCH_PERSONS} currentMoviePersons={currentMovieCredits.cast} getCurrentPersonInfo={getCurrentPersonInfo} maxResultsLength={7} isCurrentMovieCharacter />
							</div>
							<div className="movie-page__images-wrap">
								<h1>Backdrops</h1>
								<BackdropsList backdrops={currentMovieImages.backdrops} />
							</div>
							<div className="movie-page__reviews-wrap">
								<h1>Reviews</h1>
								<div className="movie-page__reviews">
									<ReviewsList movieID={currentMovieInfo.id} reviews={currentMovieReviews.results} />
									<NewReviewForm movieID={currentMovieInfo.id} />
								</div>
							</div>
							<div className="movie-page__similar-movies-wrap">
								<h1>Similar movies</h1>
								<MovieList linkToFetch={LINK_TO_FETCH_SIMILAR_MOVIES.replace('{movieID}', currentMovieInfo.id)} />
							</div>
						</div>
					</div>
				)
					: 'Loading'
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);