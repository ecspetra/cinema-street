import React, { useState, useEffect, useRef } from "react";
import ActorCard from "../ActorCard/ActorCard";
import fetchMoreResults from "../../functions/fetchMoreResults";
import { setPersons, clearPersons, setFavoritePersons, clearFavoritePersons } from "../../actions";
import { connect } from "react-redux";
import { getDatabase, ref } from "firebase/database";
import getMyPersonsFromDatabase from "../../functions/getMyPersonsFromDatabase";
import MoreButton from "../MoreButton/MoreButton";

const PersonsList = (props) => {

	const { currentUser, persons, isFavoritePersonsList, currentMoviePersons, isCurrentMovieCharacter, linkToFetch, handleSetPersons, handleClearPersons, handleSetFavoritePersons, handleClearFavoritePersons } = props;

	const personsList = isCurrentMovieCharacter ? currentMoviePersons : (!isCurrentMovieCharacter && !isFavoritePersonsList) ? persons.uploadedPersons : persons.favoritePersons;

	const onPersonsListUnmount = useRef();
	onPersonsListUnmount.current = () => {
		if (isFavoritePersonsList) {
			handleClearFavoritePersons();
		} else handleClearPersons();
	}

	useEffect(() => {
		return () => onPersonsListUnmount.current();
	}, []);

	const initialListLength = 8;

	const [currentResultsPage, setCurrentResultsPage] = useState(1);
	const [isPersonsListLoaded, setIsPersonsListLoaded] = useState(true);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
	const [isResultsExist, setIsResultsExist] = useState(true);
	const [maxListLength, setMaxListLength] = useState(initialListLength);
	const isShowMoreButton = isResultsExist && isPersonsListLoaded && personsList.length !== 0 && personsList.length >= maxListLength;

	const database = getDatabase();
	const postListRef = ref(database, 'persons');

	const getPersons = async () => {
		setIsPersonsListLoaded(false);

		if (isFavoritePersonsList) {
			let receivedFavoritePersonsKeys = [];
			if (persons.favoritePersons.length > 0) {
				receivedFavoritePersonsKeys = persons.favoritePersons.map((person) => {
					return person.key;
				})
			}
			await getMyPersonsFromDatabase(postListRef, receivedFavoritePersonsKeys, handleSetFavoritePersons, currentUser.uid);
		} else if (!isCurrentMovieCharacter && !isFavoritePersonsList) {
			setIsResultsExist(await fetchMoreResults(linkToFetch, currentResultsPage, handleSetPersons));
			setPrevResultsPage(currentResultsPage);
			setCurrentResultsPage(currentResultsPage + 1);
			setIsPersonsListLoaded(true);
		} else {
			if (personsList.length !== maxListLength) {
				setMaxListLength(personsList.length);
			} else {
				setMaxListLength(initialListLength);
			}
		}
	}

	const renderPersonsList = () => {

		let persons;

		if (isCurrentMovieCharacter) {
			persons = personsList && personsList.map((person, index) => {
				if (index < maxListLength) {
					return <ActorCard person={person} key={index} isCurrentMovieCharacter={isCurrentMovieCharacter} />
				}
			})
		} else {
			persons = personsList && personsList.map((person, index) => {
				return <ActorCard person={isFavoritePersonsList ? person.data.person : person} key={index} />
			})
		}

		return persons;
	}

	const uploadedPersons = renderPersonsList();

	useEffect(() => {
		if (isResultsExist && prevResultsPage !== currentResultsPage && !isCurrentMovieCharacter) {
			getPersons();
		}
	}, []);

	return (
		<>
			{
				personsList.length !== 0
					? <>
						<div className="persons-list">
							{uploadedPersons}
						</div>
						{
							(isShowMoreButton && isPersonsListLoaded) && <MoreButton isFetchResultsButton={!isCurrentMovieCharacter} listLength={personsList.length} maxListLength={maxListLength} moreButtonOnClickFunction={getPersons} />
						}
					</>
					: <p className="persons-list-empty">Persons list is empty</p>
			}
		</>
	)
}

const mapStateToProps = state => ({
	persons: state.persons,
	currentUser: state.user.currentUser,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetPersons: (person) => dispatch(setPersons(person)),
		handleClearPersons: () => dispatch(clearPersons()),
		handleSetFavoritePersons: (person) => dispatch(setFavoritePersons(person)),
		handleClearFavoritePersons: () => dispatch(clearFavoritePersons()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonsList);