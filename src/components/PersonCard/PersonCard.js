import React, {useState} from 'react';
import { Link } from "react-router-dom";
import {
	clearCurrentPersonPage,
	removeFromFavoritePersons,
	setCurrentPersonPage,
} from "../../actions";
import { connect } from "react-redux";
import getCurrentPersonPage from "../../functions/getCurrentPersonPage";
import Loader from "../Loader/Loader";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultPersonImage from "../App/assets/icons/default-person.svg";
import HeartIcon from "../App/assets/icons/HeartIcon";
import removePersonFromCollection from "../../functions/removePersonFromCollection";
import { getDatabase, ref } from "firebase/database";

const PersonCard = (props) => {

	const { person, currentUser, isFavoritePerson, handleSetCurrentPersonPage, handleClearCurrentPersonPage, handleRemoveFromFavoritePersons, handleFillFavoritePersonsList } = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const isMovieCharacter = props.isCurrentMovieCharacter;

	const database = getDatabase();
	const postListRef = ref(database, 'persons');

	const handleRemovePersonFromCollection = async (event) => {
		event.preventDefault();
		await removePersonFromCollection(postListRef, person, currentUser.uid, handleRemoveFromFavoritePersons);

		handleFillFavoritePersonsList();
	}

	return (
		<div className="person-card">
			<Link to={"/person/" + person.id} className="person-card__link" onClick={() => {getCurrentPersonPage(person.id, handleClearCurrentPersonPage).then((data) => {handleSetCurrentPersonPage(data)})}}>
				<span className="person-card__content">
					<span className="person-card__image-wrap">
						<img className="person-card__image" onLoad={() => {setIsImageLoaded(true)}} onError={event => addDefaultImage(event, defaultPersonImage)} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + person.profile_path} alt="person-photo" />
						{!isImageLoaded && <Loader>Loading image</Loader>}
					</span>
					<h3 className="person-card__title">{person.name}</h3>
				</span>
				{isFavoritePerson && <HeartIcon onClick={(event) => {handleRemovePersonFromCollection(event)}} />}
			</Link>
			{
				(isMovieCharacter && (person.character !== "")) && <span className="person-card__character">{person.character ?? person.job}</span>
			}
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetCurrentPersonPage: (selectedPerson) => dispatch(setCurrentPersonPage(selectedPerson)),
		handleClearCurrentPersonPage: () => dispatch(clearCurrentPersonPage()),
		handleRemoveFromFavoritePersons: (key) => dispatch(removeFromFavoritePersons(key)),
	}
}

export default connect(null, mapDispatchToProps)(PersonCard);
