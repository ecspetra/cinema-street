import React from "react";
import ActorCard from "../ActorCard/ActorCard";

const MoviePage = (props) => {

	return (
		<div className="movie-page">
			<div className="movie-page__content">
				<div className="movie-page__movie-info">
					<div className="movie-page__cover-wrap">
						<img className="movie-page__image" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.currentMoviePage.currentMovieInfo.poster_path} />
					</div>
					<div className="movie-page__info-wrap">
						{props.currentMoviePage.currentMovieInfo.adult && <span>18+</span>}
						<h1>{props.currentMoviePage.currentMovieInfo.title}</h1>
						<p>{props.currentMoviePage.currentMovieInfo.tagline}</p>
						<p>{props.currentMoviePage.currentMovieInfo.overview}</p>
						<p>{props.currentMoviePage.currentMovieInfo.budget}</p>
						<p>{props.currentMoviePage.currentMovieInfo.release_date}</p>
					</div>
				</div>
				<div className="movie-page__credits-wrap">
					<h1>Cast</h1>
					<div className="movie-page__credits">
						{
							props.currentMoviePage.currentMovieCredits && props.currentMoviePage.currentMovieCredits.cast.map((item, key) => {
								return <ActorCard key={key} person={item} />
							})
						}
					</div>
				</div>
				<div className="movie-page__images-wrap">
					<h1>Backdrops</h1>
					<div className="movie-page__images">
						{
							props.currentMoviePage.currentMovieImages && props.currentMoviePage.currentMovieImages.backdrops.map((item, key) => {
								return <img className="movie-page__backdrop" src={'https://image.tmdb.org/t/p/w440_and_h660_face' + item.file_path} key={key} />
							})
						}
					</div>
				</div>
				<div className="movie-page__reviews-wrap">
					<h1>Reviews</h1>
					<div className="movie-page__reviews">
						{
							props.currentMoviePage.currentMovieReviews && props.currentMoviePage.currentMovieReviews.results.map((item, key) => {
								return (
									<div className="movie-page__review">
										<div className="movie-page__review">{item.author_details.username}</div>
										<div className="movie-page__review">{item.author_details.rating}</div>
										<img className="movie-page__review" src={item.author_details.avatar_path} />
										<div className="movie-page__review">{item.content}</div>
									</div>)
							})
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MoviePage;