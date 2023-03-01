import React, { useState, useEffect, useRef, useContext } from "react";
import PersonCard from "../PersonCard/PersonCard";
import fetchMoreResults from "../../functions/fetchMoreResults";
import { setPersons, clearPersons, setFavoritePersons, clearFavoritePersons } from "../../actions";
import { connect } from "react-redux";
import { getDatabase, ref } from "firebase/database";
import { getMyPersonsFromDatabase, fillFavoritePersonsList } from "../../functions/getMyPersonsFromDatabase";
import MoreButton from "../MoreButton/MoreButton";
import InfoText from "../InfoText/InfoText";
import Loader from "../Loader/Loader";
import './assets/index.scss';
import md5 from "md5";
import UserContext from "../UserContext/UserContext";

const PersonsList = (props) => {

	const { persons, isFavoritePersonsList, currentMoviePersons, isCurrentMovieCharacter, linkToFetch, handleSetPersons, handleClearPersons, handleSetFavoritePersons, handleClearFavoritePersons } = props;

	const onPersonsListUnmount = useRef();
	onPersonsListUnmount.current = () => {
		if (isFavoritePersonsList) {
			handleClearFavoritePersons();
		} else handleClearPersons();
	}

	useEffect(() => {
		return () => onPersonsListUnmount.current();
	}, []);

	const { currentUser } = useContext(UserContext);

	const personsListRef = useRef(null);
	const initialListLength = 8;
	const [currentResultsPage, setCurrentResultsPage] = useState(1);
	const [isPersonsListLoaded, setIsPersonsListLoaded] = useState(false);
	const [isShowMoreButton, setIsShowMoreButton] = useState(false);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
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
				receivedFavoritePersonsKeys = personsList.map((person) => {
					return person.key;
				})
				await getMyPersonsFromDatabase(postListRef, receivedFavoritePersonsKeys, currentUser.userID).then((data) => {

					const isEmptyResult = !data.dataFromResponse.length;

					if (isEmptyResult) {
						setMaxListLength(persons.favoritePersons.length);
						setIsLastData(true);
					} else {
						if (maxListLength === initialListLength) {
							setMaxListLength(personsList.length + data.dataFromResponse.length);
						} else setMaxListLength(prevState => (prevState + data.dataFromResponse.length));
						if (data.isLastData === true) {
							setIsLastData(true);
						}
						handleSetFavoritePersons(data.dataFromResponse);
					}
				})
			} else if (!isCurrentMovieCharacter && !isFavoritePersonsList) {

				await fetchMoreResults(linkToFetch, currentResultsPage).then((data) => {

					const isEmptyResult = !data.dataFromResponse.data.results.length;

					if (isEmptyResult) {
						return false;
					} else {
						if (data.isLastData === true) {
							setIsLastData(true);
						}
						handleSetPersons(data.dataFromResponse.data.results);
					}
				})
				setPrevResultsPage(currentResultsPage);
				setCurrentResultsPage(currentResultsPage + 1);
			} else {
				if (personsList.length !== maxListLength) {
					setMaxListLength(personsList.length);
				} else {
					let refOffset = 120;
					let refPosition = personsListRef.current.getBoundingClientRect().top;
					let offsetPosition = refPosition + window.pageYOffset - refOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: "smooth"
					});

					setTimeout(() => {
						setMaxListLength(initialListLength);
					}, 750);
				}
			}

			isPersonsListLoaded = true;

			resolve(isPersonsListLoaded);
		})
	}

	const handleFillFavoritePersonsList = async () => {
		let receivedFavoritePersonsKeys = [];
		receivedFavoritePersonsKeys = personsList.map((person) => {
			return person.key;
		})

		await fillFavoritePersonsList(postListRef, receivedFavoritePersonsKeys, currentUser.userID).then((data) => {
			const isEmptyResult = !data.dataFromResponse.length;

			if (!isEmptyResult && personsList.length !== data.dataFromResponse.length) {
				handleSetFavoritePersons(data.dataFromResponse);
			}
		});
	}

	const getPersonsList = () => {

		let persons;

		if (isCurrentMovieCharacter) {
			persons = personsList && personsList.map((person, index) => {
				if (index < maxListLength) {
					return <PersonCard person={person} key={md5(person.id + person.name)} isCurrentMovieCharacter={isCurrentMovieCharacter} />
				}
			})
		} else if (isFavoritePersonsList) {
			persons = personsList && personsList.map((person, index) => {
				if (index < maxListLength) {
					return <PersonCard person={person.data.person} key={md5(person.data.person.id + person.data.person.name)} currentUser={currentUser} handleFillFavoritePersonsList={handleFillFavoritePersonsList} isFavoritePerson />
				}
			})
		} else {
			persons = personsList && personsList.map((person) => {
				return <PersonCard person={person} key={md5(person.id + person.name)} />
			})
		}

		return persons;
	}

	const handleIsShowMoreButton = () => {
		if (isPersonsListLoaded === true && personsList.length !== 0 && isLastData === false && personsList.length > initialListLength) {
			return true;
		} else return false;
	}

	useEffect(() => {
		if (!isLastData && prevResultsPage !== currentResultsPage && !isCurrentMovieCharacter && !isFavoritePersonsList) {
			getPersons().then((data) => {
				setIsPersonsListLoaded(data);
			})
		} else if (isCurrentMovieCharacter) {
			setIsPersonsListLoaded(true);
		} else if (isFavoritePersonsList) {

			let receivedFavoritePersonsKeys = [];

			getMyPersonsFromDatabase(postListRef, receivedFavoritePersonsKeys, currentUser.userID).then((data) => {

				const isEmptyResult = !data.dataFromResponse.length;

				if (isEmptyResult) {
					setIsLastData(true);
				} else {
					handleSetFavoritePersons(data.dataFromResponse);
					if (data.isLastData === true) {
						setIsLastData(true);
					}
				}
			}).then(() => {
				setIsPersonsListLoaded(true);
			})
		}
	}, []);

	useEffect(() => {
		setPersonsList(isCurrentMovieCharacter ? currentMoviePersons : (!isCurrentMovieCharacter && !isFavoritePersonsList) ? persons.uploadedPersons : persons.favoritePersons);
	}, [persons.uploadedPersons, persons.favoritePersons, currentMoviePersons]);

	useEffect(() => {
		setIsShowMoreButton(handleIsShowMoreButton());
	}, [personsList, isLastData]);

	return (
		<>
			{
				personsList.length === 0 && isPersonsListLoaded
					? <InfoText>{isFavoritePersonsList ? 'Persons you add to favorites will be displayed here' : 'Persons list is empty'}</InfoText>
					: <>
						<div className="persons-list" ref={personsListRef}>
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