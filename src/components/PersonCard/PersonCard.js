import React, { useEffect, useState } from 'react';
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
import { CSSTransition } from "react-transition-group";
import ModalContent from "../ModalContent/ModalContent";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import DeletePersonFromCollectionPopup from "../Popups/DeletePersonFromCollectionPopup/DeletePersonFromCollectionPopup";

const PersonCard = (props) => {

	const { person, currentUser, isCurrentMovieCharacter, isFavoritePerson, handleSetCurrentPersonPage, handleClearCurrentPersonPage, handleRemoveFromFavoritePersons, handleFillFavoritePersonsList } = props;

	const [isMounted, setIsMounted] = useState(false);
	const [isShowModal, setIsShowModal] = useState(false);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const isMovieCharacter = isCurrentMovieCharacter;

	const database = getDatabase();
	const postListRef = ref(database, 'persons');

	const handleIsShowModal = (event) => {
		event.preventDefault();
		setIsShowModal(true);
	}

	const handleRemovePersonFromCollection = async () => {
		setIsShowModal(false);

		await setIsMounted(false);

		handleFillFavoritePersonsList();

		setTimeout(async () => {
			await removePersonFromCollection(postListRef, person, currentUser.uid, handleRemoveFromFavoritePersons);
		}, 750);
	}

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<CSSTransition
			in={isMounted}
			appear={true}
			timeout={0}
			classNames="person-card-wrap"
		>
			<div className="person-card">
				<Link to={"/person/" + person.id} className="person-card__link" onClick={() => {getCurrentPersonPage(person.id, handleClearCurrentPersonPage).then((data) => {handleSetCurrentPersonPage(data)})}}>
				<span className="person-card__content">
					<span className="person-card__image-wrap">
						<img className="person-card__image" onLoad={() => {setIsImageLoaded(true)}} onError={event => addDefaultImage(event, defaultPersonImage)} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + person.profile_path} alt="person-photo" />
						{!isImageLoaded && <Loader>Loading image</Loader>}
					</span>
					<span className="person-card__title">{person.name}</span>
					{!isFavoritePerson && !isMovieCharacter && <span className="person-card__role">{person.known_for_department}</span>}
				</span>
					{isFavoritePerson && <HeartIcon onClick={(event) => handleIsShowModal(event)} />}
				</Link>
				{
					(isMovieCharacter && (person.character !== "")) && <span className="person-card__character">{person.character ?? person.job}</span>
				}
				{isShowModal && <DeletePersonFromCollectionPopup setIsShowModal={setIsShowModal} handleRemovePersonFromCollection={handleRemovePersonFromCollection} />}
			</div>
		</CSSTransition>
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
