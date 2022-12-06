import React, { useState, useEffect, useRef } from "react";
import ActorCard from "../ActorCard/ActorCard";
import fetchMoreResults from "../../functions/fetchMoreResults";
import { setPersons, clearPersons } from "../../actions";
import { connect } from "react-redux";

const ActorsList = (props) => {

	const { persons, isMovieCharacter, getCurrentPersonInfo, linkToFetch, handleSetPersons, handleClearPersons } = props;

	const onPersonsListUnmount = useRef();
	onPersonsListUnmount.current = () => {
		handleClearPersons();
	}

	useEffect(() => {
		return () => onPersonsListUnmount.current();
	}, []);

	const [currentResultsPage, setCurrentResultsPage] = useState(1);
	const [isPersonsListLoaded, setIsPersonsListLoaded] = useState(true);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
	const [isResultsExist, setIsResultsExist] = useState(true);

	const getPersons = () => {
		setIsPersonsListLoaded(false);
		setIsResultsExist(fetchMoreResults(linkToFetch, currentResultsPage, handleSetPersons));
		setPrevResultsPage(currentResultsPage);
		setCurrentResultsPage(currentResultsPage + 1);
		setIsPersonsListLoaded(true);
	}

	const isShowMoreButton = isResultsExist && isPersonsListLoaded;

	useEffect(() => {
		if (isResultsExist && prevResultsPage !== currentResultsPage) {
			getPersons();
		}
	}, []);

	return (
		<div className="persons-list">
			{
				persons.uploadedPersons && persons.uploadedPersons.map((person, index) => {
					return <ActorCard person={person} key={index} isMovieCharacter={isMovieCharacter} getCurrentPersonInfo={getCurrentPersonInfo} />
				})
			}
			{
				isShowMoreButton && <button className="main-button main-button--filled" onClick={() => {getPersons()}}>Show all persons</button>
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