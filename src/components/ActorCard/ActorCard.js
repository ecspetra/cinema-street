import React, {useState} from 'react';
import { Link } from "react-router-dom";
import default_user_icon from "../App/assets/icons/default-user.svg";
import classNames from "classnames";
import { clearCurrentPersonPage, setCurrentPersonPage } from "../../actions";
import { connect } from "react-redux";
import getCurrentPersonPage from "../../functions/getCurrentPersonPage";

const ActorCard = (props) => {

	const { person, handleSetCurrentPersonPage, handleClearCurrentPersonPage } = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const isMovieCharacter = props.isCurrentMovieCharacter;

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	const personCardImageWrapClassNames = classNames('person-card__image-wrap', {
		'person-card__image-wrap--loading': !isImageLoaded,
	});

	return (
		<div className="person-card">
			<Link to={"/person/" + person.id} className="person-card__link" onClick={() => {getCurrentPersonPage(person.id, handleSetCurrentPersonPage, handleClearCurrentPersonPage)}}>
				<div className="person-card__content">
					<div className={personCardImageWrapClassNames}>
						<img className="person-card__image" onLoad={() => {setIsImageLoaded(true)}} onError={addDefaultSrc} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + person.profile_path} alt="person-photo" />
					</div>
					<h3 className="person-card__title">{person.name}</h3>
				</div>
			</Link>
			{
				(isMovieCharacter && (person.character !== "")) && <span className="person-card__character">{person.character}</span>
			}
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetCurrentPersonPage: (selectedPerson) => dispatch(setCurrentPersonPage(selectedPerson)),
		handleClearCurrentPersonPage: () => dispatch(clearCurrentPersonPage()),
	}
}

export default connect(null, mapDispatchToProps)(ActorCard);
