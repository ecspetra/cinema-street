import React, {useState} from 'react';
import { Link } from "react-router-dom";
import default_user_icon from "../App/assets/icons/default-user.svg";
import classNames from "classnames";

const ActorCard = (props) => {

	const { person, getCurrentPersonInfo } = props;

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
			<Link to={"/person/" + person.id} className="person-card__link" onClick={() => {getCurrentPersonInfo(person.id)}}>
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

export default ActorCard;