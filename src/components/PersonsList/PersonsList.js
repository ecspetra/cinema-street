import React, { useState, useEffect, useRef } from "react";
import PersonCard from "../PersonCard/PersonCard";
import fetchMoreResults from "../../functions/fetchMoreResults";
import { setPersons, clearPersons, setFavoritePersons, clearFavoritePersons } from "../../actions";
import { connect } from "react-redux";
import { getDatabase, ref } from "firebase/database";
import getMyPersonsFromDatabase from "../../functions/getMyPersonsFromDatabase";
import MoreButton from "../MoreButton/MoreButton";
import InfoText from "../InfoText/InfoText";
import Loader from "../Loader/Loader";

const PersonsList = (props) => {

	const { currentUser, persons, isFavoritePersonsList, currentMoviePersons, isCurrentMovieCharacter, linkToFetch, handleSetPersons, handleClearPersons, handleSetFavoritePersons, handleClearFavoritePersons } = props;

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
	const [isPersonsListLoaded, setIsPersonsListLoaded] = useState(false);
	const [isShowMoreButton, setIsShowMoreButton] = useState(false);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
	const [isResultsExist, setIsResultsExist] = useState(true);
	const [isLastData, setIsLastData] = useState(false);
	const [maxListLength, setMaxListLength] = useState(initialListLength);
	const [personsList, setPersonsList] = useState([]);

	const database = getDatabase();
	const postListRef = ref(database, 'persons');

	const getPersons = () => {
		return new Promise (async (resolve) => {

			let isPersonsListLoaded = false;

			if (isFavoritePersonsList) {
				let receivedFavoritePersonsKeys = [];
				receivedFavoritePersonsKeys = persons.favoritePersons.map((person) => {
					return person.key;
				})
				await getMyPersonsFromDatabase(postListRef, receivedFavoritePersonsKeys, currentUser.uid).then((data) => {
					if (!data.dataFromResponse.length) {
						setIsResultsExist(false);
						return false;
					} else {
						handleSetFavoritePersons(data.dataFromResponse);
						setIsResultsExist(true);
						setMaxListLength(prevState => (prevState + data.dataFromResponse.length));
						if (data.isLastData === true) {
							setIsLastData(true);
						}
					}
				})
			} else if (!isCurrentMovieCharacter && !isFavoritePersonsList) {
				await fetchMoreResults(linkToFetch, currentResultsPage).then((data) => {
					if (!data.dataFromResponse.data.results.length) {
						setIsResultsExist(false);
						return false;
					} else if (data.isLastData === true) {
						setIsShowMoreButton(false);
					} else {
						handleSetPersons(data.dataFromResponse.data.results);
						setIsResultsExist(true);
					}
				})
				setPrevResultsPage(currentResultsPage);
				setCurrentResultsPage(currentResultsPage + 1);
			} else {
				if (personsList.length !== maxListLength) {
					setMaxListLength(personsList.length);
				} else {
					setMaxListLength(initialListLength);
				}
			}

			isPersonsListLoaded = true;

			resolve(isPersonsListLoaded);
		})
	}

	const getPersonsList = () => {

		let persons;

		if (isCurrentMovieCharacter) {
			persons = personsList && personsList.map((person, index) => {
				if (index < maxListLength) {
					return <PersonCard person={person} key={index} isCurrentMovieCharacter={isCurrentMovieCharacter} />
				}
			})
		} else if (isFavoritePersonsList) {
			persons = personsList && personsList.map((person, index) => {
				if (index < maxListLength) {
					return <PersonCard person={person.data.person} key={index} currentUser={currentUser} isFavoritePerson />
				}
			})
		} else {
			persons = personsList && personsList.map((person, index) => {
				return <PersonCard person={person} key={index} />
			})
		}

		return persons;
	}

	const handleIsShowMoreButton = () => {
		if (isPersonsListLoaded === true && personsList.length !== 0 && !isLastData && personsList.length > initialListLength) {
			return true;
		} else return false;
	}

	useEffect(() => {
		if (isResultsExist && prevResultsPage !== currentResultsPage && !isCurrentMovieCharacter && !isFavoritePersonsList) {
			getPersons().then((data) => {
				setIsPersonsListLoaded(data);
			})
		} else if (isCurrentMovieCharacter) {
			setIsPersonsListLoaded(true);
		} else if (isFavoritePersonsList) {
			let receivedFavoritePersonsKeys = [];
			getMyPersonsFromDatabase(postListRef, receivedFavoritePersonsKeys, currentUser.uid).then((data) => {
				if (!data.dataFromResponse.length) {
					setIsResultsExist(false);
					return false;
				} else {
					handleSetFavoritePersons(data.dataFromResponse);
					setIsResultsExist(true);
					if (data.isLastData === true) {
						setIsLastData(true);
					}
				}
				setIsPersonsListLoaded(true);
			})
		}
	}, []);

	useEffect(() => {
		setPersonsList(isCurrentMovieCharacter ? currentMoviePersons : (!isCurrentMovieCharacter && !isFavoritePersonsList) ? persons.uploadedPersons : persons.favoritePersons);
	}, [persons.uploadedPersons, persons.favoritePersons, currentMoviePersons]);

	useEffect(() => {
		setIsShowMoreButton(handleIsShowMoreButton());
	}, [personsList]);

	useEffect(() => {
		console.log(maxListLength);

	}, [maxListLength]);

	return (
		<>
			{
				personsList.length === 0 && isPersonsListLoaded
					? <InfoText>Persons list is empty</InfoText>
					: <>
						<div className="persons-list">
							{getPersonsList()}
							{!isPersonsListLoaded && <Loader>Loading persons</Loader>}
						</div>
						{
							isShowMoreButton && <MoreButton isFetchResultsButton={!isCurrentMovieCharacter} listLength={personsList.length} maxListLength={maxListLength} moreButtonOnClickFunction={getPersons} />
						}
					</>
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