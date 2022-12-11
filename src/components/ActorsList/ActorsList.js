import React, { useState, useEffect, useRef } from "react";
import ActorCard from "../ActorCard/ActorCard";
import fetchMoreResults from "../../functions/fetchMoreResults";
import { setPersons, clearPersons } from "../../actions";
import { connect } from "react-redux";

const ActorsList = (props) => {

	const { persons, currentMoviePersons, isCurrentMovieCharacter, getCurrentPersonInfo, linkToFetch, handleSetPersons, handleClearPersons } = props;

	const personsList = isCurrentMovieCharacter ? currentMoviePersons : persons.uploadedPersons;

	const onPersonsListUnmount = useRef();
	onPersonsListUnmount.current = () => {
		handleClearPersons();
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
	const isShowMoreButton = isResultsExist && isPersonsListLoaded && personsList.length !== 0;
	const buttonText = personsList.length !== maxListLength ? 'Show all' : 'Show less';

	const getPersons = () => {

		if (!isCurrentMovieCharacter) {
			setIsPersonsListLoaded(false);
			setIsResultsExist(fetchMoreResults(linkToFetch, currentResultsPage, handleSetPersons));
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

		if (personsList.length === 0) {
			return <p>No persons yet</p>
		} else if (isCurrentMovieCharacter) {
			persons = personsList && personsList.map((person, index) => {
				if (index < maxListLength) {
					console.log(person, index);
					return <ActorCard person={person} key={index} isCurrentMovieCharacter={isCurrentMovieCharacter} getCurrentPersonInfo={getCurrentPersonInfo} />
				}
			})
		} else {
			persons = personsList && personsList.map((person, index) => {
				return <ActorCard person={person} key={index} getCurrentPersonInfo={getCurrentPersonInfo} />
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
		<div className="persons-list">
			{uploadedPersons}
			{

				isShowMoreButton && <button className="main-button main-button--more" onClick={() => {getPersons()}}>{buttonText}</button>
			}
		</div>
	)
}

const mapStateToProps = state => ({
	persons: state.persons,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetPersons: (person) => dispatch(setPersons(person)),
		handleClearPersons: () => dispatch(clearPersons()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActorsList);