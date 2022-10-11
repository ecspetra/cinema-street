import React from "react";
import Button from "../Button/Button";
import ActorsList from "../ActorsList/ActorsList";
import BackdropsList from "../BackdropsList/BackdropsList";
import ReviewsList from "../ReviewsList/ReviewsList";

const MoviePage = (props) => {

	return (
		<div className="movie-page">
			<div className="movie-page__content">
				<div className="movie-page__movie-info">
					<div className="movie-page__cover-wrap">
						<img className="movie-page__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.currentMoviePage.currentMovieInfo.poster_path} alt="movie-poster" />
					</div>
					<div className="movie-page__info-wrap">
						{props.currentMoviePage.currentMovieInfo.adult && <span>18+</span>}
						<h1>{props.currentMoviePage.currentMovieInfo.title}</h1>
						<p>{props.currentMoviePage.currentMovieInfo.tagline}</p>
						<p>{props.currentMoviePage.currentMovieInfo.overview}</p>
						<p>{props.currentMoviePage.currentMovieInfo.budget}</p>
						<p>{props.currentMoviePage.currentMovieInfo.release_date}</p>
						<Button currentMoviePage={props.currentMoviePage} favouriteMovies={props.favouriteMovies} movie={props.currentMoviePage.currentMovieInfo} addMovieToMyCollection={props.addMovieToMyCollection} handleRemoveFromFavouriteMovies={props.handleRemoveFromFavouriteMovies} />
					</div>
				</div>
				<div className="movie-page__credits-wrap">
					<h1>Cast</h1>
					<div className="movie-page__credits">
						{
							props.currentMoviePage.currentMovieCredits && <ActorsList persons={props.currentMoviePage.currentMovieCredits.cast} isMovieCharacter />
						}
					</div>
				</div>
				<div className="movie-page__images-wrap">
					<h1>Backdrops</h1>
					<div className="movie-page__images">
						{
							props.currentMoviePage.currentMovieImages && <BackdropsList backdrops={props.currentMoviePage.currentMovieImages.backdrops} />
						}
					</div>
				</div>
				<div className="movie-page__reviews-wrap">
					<h1>Reviews</h1>
					<div className="movie-page__reviews">
						{
							props.currentMoviePage.currentMovieReviews && <ReviewsList reviews={props.currentMoviePage.currentMovieReviews.results} />
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MoviePage;