import React from "react";
import Button from "../Button/Button";
import ActorsList from "../ActorsList/ActorsList";
import BackdropsList from "../BackdropsList/BackdropsList";
import ReviewsList from "../ReviewsList/ReviewsList";
import {useEffect, useRef} from "react";
import MovieList from "../MovieList/MovieList";
import ProductionCompany from "../ProductionCompany/ProductionCompany";
import Rating from "../Rating/Rating";

const MoviePage = (props) => {

	const onMoviePageUnmount = useRef();
	onMoviePageUnmount.current = () => {
		props.handleClearCurrentMoviePage();
	}

	useEffect(() => {
		return () => onMoviePageUnmount.current();
	}, []);

	return (
		<div className="movie-page">
			<div className="movie-page__content">
				<div className="movie-page__movie-info">
					<div className="movie-page__cover-wrap">
						<img className="movie-page__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.currentMoviePage.currentMovieInfo.poster_path} alt="movie-poster" />
					</div>
					<div className="movie-page__info-wrap">
						{props.currentMoviePage.currentMovieInfo.adult && <span>18+</span>}
						<h1 className="movie-page__title">{props.currentMoviePage.currentMovieInfo.title}</h1>
						{
							props.currentMoviePage.currentMovieInfo.tagline && <p className="movie-page__details movie-page__details--tagline">{props.currentMoviePage.currentMovieInfo.tagline}</p>
						}
						<p className="movie-page__details movie-page__details--release-date">Release date: {new Intl.DateTimeFormat('en-GB', {
							month: 'long',
							day: '2-digit',
							year: 'numeric',
						}).format(new Date(props.currentMoviePage.currentMovieInfo.release_date))}</p>
						<p className="movie-page__details movie-page__details--production-countries">
							{
								props.currentMoviePage.currentMovieInfo && props.currentMoviePage.currentMovieInfo.production_countries.map((item, index) => {
									return <span className="movie-page__details-item movie-page__details-item--production-countries-item" key={index}>{(index ? ', ' : '') + item.name}</span>
								})
							}
						</p>
						<Rating movie={props.currentMoviePage.currentMovieInfo} isRatingCount />
						<p className="movie-page__overview">{props.currentMoviePage.currentMovieInfo.overview}</p>
						<div className="movie-page__production-companies-wrap">
							<h3 className="movie-page__production-companies-title">Production companies:</h3>
							<div className="production-companies">
								{
									props.currentMoviePage.currentMovieInfo && props.currentMoviePage.currentMovieInfo.production_companies.map((item, index) => {
										return <ProductionCompany company={item} key={index} />
									})
								}
							</div>
						</div>
						<Button currentMoviePage={props.currentMoviePage} favouriteMovies={props.favouriteMovies} movie={props.currentMoviePage.currentMovieInfo} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} />
					</div>
				</div>
				<div className="movie-page__credits-wrap">
					<h1>Cast</h1>
					<div className="movie-page__credits">
						{
							props.currentMoviePage.currentMovieCredits && <ActorsList persons={props.currentMoviePage.currentMovieCredits.cast} getCurrentPersonInfo={props.getCurrentPersonInfo} isMovieCharacter />
						}
					</div>
				</div>
				<div className="movie-page__images-wrap">
					<h1>Backdrops</h1>
					<div className="movie-page__images">
						{
							(props.currentMoviePage.currentMovieImages && props.currentMoviePage.currentMovieImages.backdrops.length)
								? <BackdropsList backdrops={props.currentMoviePage.currentMovieImages.backdrops} />
								: 'No backdrops yet'
						}
					</div>
				</div>
				<div className="movie-page__reviews-wrap">
					<h1>Reviews</h1>
					<div className="movie-page__reviews">
						{
							(props.currentMoviePage.currentMovieReviews && props.currentMoviePage.currentMovieReviews.results.length)
								? <ReviewsList reviews={props.currentMoviePage.currentMovieReviews.results} />
								: 'No reviews yet'
						}
					</div>
				</div>
				<div className="movie-page__similar-movies-wrap">
					<h1>Similar movies</h1>
					<div className="movie-page__similar-movies">
						{
							(props.currentMoviePage.currentMovieSimilar && props.currentMoviePage.currentMovieSimilar.results.length)
								? <MovieList movies={props.currentMoviePage.currentMovieSimilar.results} genres={props.genres} favouriteMovies={props.favouriteMovies} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} handleSetCurrentMoviePage={props.handleSetCurrentMoviePage} />
								: 'No similar movies'
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MoviePage;