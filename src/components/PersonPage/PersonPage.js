import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import { clearCurrentPersonPage, removeFromFavoritePersons } from "../../actions";
import defaultPersonImage from "../App/assets/icons/default-person.svg";
import moment from "moment";
import Loader from "../Loader/Loader";
import CollectionButton from "../CollectionButton/CollectionButton";
import { getDatabase, push, ref } from "firebase/database";
import postPersonToDataBase from "../../functions/postPersonToDataBase";
import removePersonFromCollection from "../../functions/removePersonFromCollection";
import checkIfPersonExistsInCollection from "../../functions/checkIfPersonExistsInCollection";
import { addDefaultImage } from "../../functions/addDefaultImage";

const PersonPage = (props) => {

	const { currentUser, persons, handleClearCurrentPersonPage, handleRemoveFromFavoritePersons } = props;

	const isCurrentPersonLoaded = persons.currentPersonInfo !== null;

	const getPersonGender = () => {
		if (persons.currentPersonInfo.gender === 1) {
			setPersonGender('Female');
		} else setPersonGender('Male');
	}

	const [isExistsInCollection, setIsExistsInCollection] = useState(false);
	const [personGender, setPersonGender] = useState();

	let currentPerson;

	if (isCurrentPersonLoaded) {
		currentPerson = persons.currentPersonInfo;
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
			checkIfPersonExistsInCollection(postListRef, currentPerson.id, currentUser.uid).then(data => setIsExistsInCollection(data));
		}
	}, [isCurrentPersonLoaded]);

	const database = getDatabase();
	const postListRef = ref(database, 'persons');
	const newPostRef = push(postListRef);

	const handleAddPersonToMyCollection = () => {
		postPersonToDataBase(newPostRef, currentPerson, currentUser.uid);
		checkIfPersonExistsInCollection(postListRef, currentPerson.id, currentUser.uid).then(data => setIsExistsInCollection(data));
	}

	const handleRemovePersonFromCollection = async () => {
		await removePersonFromCollection(postListRef, currentPerson, currentUser.uid, handleRemoveFromFavoritePersons);
		checkIfPersonExistsInCollection(postListRef, currentPerson.id, currentUser.uid).then(data => setIsExistsInCollection(data));
	}

	const collectionButtonOnClickFunction = isExistsInCollection ? handleRemovePersonFromCollection : handleAddPersonToMyCollection;
	const [isImageLoaded, setIsImageLoaded] = useState(false);

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
									{currentPerson.place_of_birth && <p className="person-page__details person-page__details--country">Country of birth: {currentPerson.place_of_birth}</p>}
									{currentPerson.birthday && (<div className="person-page__details person-page__details--dates-wrap">
										<p className="person-page__birthday">{moment(currentPerson.birthday).format("M.D.Y")}</p>
										{
											currentPerson.deathday && <p className="person-page__deathday">&nbsp;— {moment(currentPerson.deathday).format("M.D.Y")}</p>
										}
									</div>)}
									{personGender && <p className="person-page__details person-page__details--gender">Gender: {personGender}</p>}
								</div>
								<p className="person-page__biography">{currentPerson.biography}</p>
								<CollectionButton isExistsInCollection={isExistsInCollection} collectionButtonOnClickFunction={collectionButtonOnClickFunction}>{isExistsInCollection ? 'Remove from favorite' : 'Add to favorite'}</CollectionButton>
							</div>
						</div>
						<div className="person-page__movies">

						</div>
					</div>
				)
					: <div className="movie-page-empty"><Loader>Loading person</Loader></div>
			}
		</>
	);
}

const mapStateToProps = state => ({
	persons: state.persons,
	currentUser: state.user.currentUser,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleClearCurrentPersonPage: () => dispatch(clearCurrentPersonPage()),
		handleRemoveFromFavoritePersons: (key) => dispatch(removeFromFavoritePersons(key)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonPage);