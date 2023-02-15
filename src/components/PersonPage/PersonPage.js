import React, { useContext, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { clearCurrentPersonPage, removeFromFavoritePersons } from "../../actions";
import defaultPersonImage from "../App/assets/icons/default-person.svg";
import moment from "moment";
import Loader from "../Loader/Loader";
import CollectionButton from "../CollectionButton/CollectionButton";
import { getDatabase, ref } from "firebase/database";
import postPersonToDataBase from "../../functions/postPersonToDataBase";
import removePersonFromCollection from "../../functions/removePersonFromCollection";
import checkIfPersonExistsInCollection from "../../functions/checkIfPersonExistsInCollection";
import { addDefaultImage } from "../../functions/addDefaultImage";
import Modal from "../Modal/Modal";
import InfoPopup from "../InfoPopup/InfoPopup";
import MoviesList from "../MoviesList/MoviesList";
import { LINK_TO_FETCH_MOVIES_FOR_CURRENT_PERSON } from "../../functions/linksToFetch";
import DeletePersonFromCollectionPopup from "../Popups/DeletePersonFromCollectionPopup/DeletePersonFromCollectionPopup";
import { getInfoPopupText } from "../../functions/getInfoPopupText";
import FlagIcon from "../App/assets/icons/FlagIcon";
import CalendarIcon from "../App/assets/icons/CalendarIcon";
import GenderIcon from "../App/assets/icons/GenderIcon";
import './assets/index.scss';
import UserContext from "../UserContext/UserContext";

const PersonPage = (props) => {

	const { persons, handleClearCurrentPersonPage, handleRemoveFromFavoritePersons } = props;

	const isCurrentPersonLoaded = persons.currentPersonInfo !== null;

	const { currentUser } = useContext(UserContext);

	const getPersonGender = () => {
		if (persons.currentPersonInfo.gender === 1) {
			setPersonGender('Female');
		} else setPersonGender('Male');
	}

	let infoPopupTextRef = useRef();
	let infoPopupTimerRef = useRef();
	const [isExistsInCollection, setIsExistsInCollection] = useState(undefined);
	const [personGender, setPersonGender] = useState();
	const [isShowModal, setIsShowModal] = useState(false);
	const [isShowInfoPopup, setIsShowInfoPopup] = useState(false);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	let currentPerson;
	let linkToFetchCurrentPersonMovies;

	if (isCurrentPersonLoaded) {
		currentPerson = persons.currentPersonInfo;
		linkToFetchCurrentPersonMovies = LINK_TO_FETCH_MOVIES_FOR_CURRENT_PERSON.replace('{personID}', currentPerson.id);
	}

	const onMoviePageUnmount = useRef();
	onMoviePageUnmount.current = () => {
		handleClearCurrentPersonPage();
	}

	useEffect(() => {
		return () => onMoviePageUnmount.current();
	}, []);

	useEffect(() => {
		if (isCurrentPersonLoaded) {
			getPersonGender();
			checkIfPersonExistsInCollection(postListRef, currentPerson, currentUser.uid).then(data => setIsExistsInCollection(data));
		}
	}, [isCurrentPersonLoaded]);

	const database = getDatabase();
	const postListRef = ref(database, 'persons');

	const handleAddPersonToMyCollection = async () => {

		if (isShowInfoPopup === true) {
			setIsShowInfoPopup(false);
			clearTimeout(infoPopupTimerRef.current);
		}

		await postPersonToDataBase(database, currentPerson, currentUser.uid);
		checkIfPersonExistsInCollection(postListRef, currentPerson, currentUser.uid).then((isPersonFromCollection) => {
			setIsExistsInCollection(isPersonFromCollection);
			infoPopupTextRef.current = getInfoPopupText('add', isPersonFromCollection, 'Person added to favorites successfully', );

			setIsShowInfoPopup(true);

			infoPopupTimerRef.current = setTimeout(() => {
				setIsShowInfoPopup(false);
			}, 2000);
		});
	}

	const handleRemovePersonFromCollection = async () => {

		setIsShowModal(false);

		if (isShowInfoPopup === true) {
			setIsShowInfoPopup(false);
			clearTimeout(infoPopupTimerRef.current);
		}

		await removePersonFromCollection(postListRef, currentPerson, currentUser.uid, handleRemoveFromFavoritePersons);
		checkIfPersonExistsInCollection(postListRef, currentPerson, currentUser.uid).then((isPersonFromCollection) => {
			setIsExistsInCollection(isPersonFromCollection);
			infoPopupTextRef.current = getInfoPopupText('remove', isPersonFromCollection, 'Person removed from favorites successfully');

			setIsShowInfoPopup(true);

			infoPopupTimerRef.current = setTimeout(() => {
				setIsShowInfoPopup(false);
			}, 2000);
		});
	}

	const handleIsShowModal = () => {
		setIsShowModal(true);
	}

	const collectionButtonOnClickFunction = isExistsInCollection ? handleIsShowModal : handleAddPersonToMyCollection;

	return (
		<>
			{
				isCurrentPersonLoaded ? (
					<div className="person-page">
						<div className="person-page__content">
							<div className="person-page__image-wrap">
								<img className="person-page__image" onLoad={() => {setIsImageLoaded(true)}} onError={event => addDefaultImage(event, defaultPersonImage)} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + currentPerson.profile_path} alt="person-photo" />
								{!isImageLoaded && <Loader>Loading image</Loader>}
							</div>
							<div className="person-page__text-wrap">
								<h1 className="person-page__name">{currentPerson.name}</h1>
								<p className="person-page__role">{currentPerson.known_for_department}</p>
								<div className="person-page__details-wrap">
									{currentPerson.place_of_birth && (
										<div className="person-page__details person-page__details--country">
											<FlagIcon />
											<p className="person-page__details-text">Country of birth: {currentPerson.place_of_birth}</p>
										</div>
									)}
									{currentPerson.birthday && (
										<div className="person-page__details person-page__details--dates-wrap">
											<CalendarIcon />
											<p className="person-page__details-text">{moment(currentPerson.birthday).format("M.D.Y")}</p>
											{
												currentPerson.deathday && <p className="person-page__details-text">&nbsp;— {moment(currentPerson.deathday).format("M.D.Y")}</p>
											}
										</div>
									)}
									{personGender && (
										<div className="person-page__details person-page__details--gender">
											<GenderIcon />
											<p className="person-page__details-text">Gender: {personGender}</p>
										</div>
									)}
								</div>
								<p className="person-page__biography">{currentPerson.biography}</p>
								<CollectionButton isExistsInCollection={isExistsInCollection} collectionButtonOnClickFunction={collectionButtonOnClickFunction}>{isExistsInCollection ? 'Remove from favorite' : 'Add to favorite'}</CollectionButton>
							</div>
						</div>
						<div className="person-page__movies">
							<h1>Movies with {currentPerson.name}</h1>
							<MoviesList linkToFetch={linkToFetchCurrentPersonMovies} />
						</div>
						<Modal isShowModal={isShowInfoPopup} className="modal--transparent" overflow={'visible'}>
							<InfoPopup title={infoPopupTextRef.current !== undefined ? infoPopupTextRef.current.resultText : null} />
						</Modal>
						<DeletePersonFromCollectionPopup isShowModal={isShowModal} setIsShowModal={setIsShowModal} handleRemovePersonFromCollection={handleRemovePersonFromCollection} />
					</div>
				)
					: <div className="movie-page-empty"><Loader>Loading person</Loader></div>
			}
		</>
	);
}

const mapStateToProps = state => ({
	persons: state.persons,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleClearCurrentPersonPage: () => dispatch(clearCurrentPersonPage()),
		handleRemoveFromFavoritePersons: (key) => dispatch(removeFromFavoritePersons(key)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonPage);