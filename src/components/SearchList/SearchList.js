import React, { useEffect, useRef, useState } from "react";
import { clearSearchResults, setSearchResults } from "../../actions";
import { connect } from "react-redux";
import fetchMoreResults from "../../functions/fetchMoreResults";
import MoreButton from "../MoreButton/MoreButton";
import SearchCard from "../SearchCard/SearchCard";

const SearchList = (props) => {

	const { searchResults, linkToFetch, handleSetSearchResults, handleClearSearchResults, setIsShowSearchList } = props;

	const onSearchListUnmount = useRef();
	onSearchListUnmount.current = () => {
		handleClearSearchResults();
	}

	useEffect(() => {
		return () => onSearchListUnmount.current();
	}, []);

	const [currentResultsPage, setCurrentResultsPage] = useState(1);
	const [isSearchListLoaded, setIsSearchListLoaded] = useState(true);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
	const [isResultsExist, setIsResultsExist] = useState(true);
	const maxListLength = 20;

	const getSearchResults = async () => {
		setIsSearchListLoaded(false);
		setIsResultsExist(await fetchMoreResults(linkToFetch, currentResultsPage, handleSetSearchResults));
		setPrevResultsPage(currentResultsPage);
		setCurrentResultsPage(currentResultsPage + 1);
		setIsSearchListLoaded(true);
	}

	useEffect(() => {
		if (isResultsExist && prevResultsPage !== currentResultsPage) {
			getSearchResults();
		}
	}, []);

	const isShowMoreButton = isResultsExist && isSearchListLoaded;

	return (
		<>
			<div className="search-list">
				{
					searchResults.length > 0 && searchResults.map((result, index) => {
						return (
							<SearchCard result={result} key={index} isMovieCard/>
						)
					})
				}
			</div>
			<div className="search-list-buttons-wrap">
				{
					(isShowMoreButton && isSearchListLoaded) && <MoreButton isFetchResultsButton moreButtonOnClickFunction={getSearchResults} />
				}
				<button className="search-list-buttons-wrap__clear-button" onClick={() => {setIsShowSearchList(false)}}>Clear search results</button>
			</div>
		</>
	)
}

const mapStateToProps = state => ({
	searchResults: state.searchResults.searchResults,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetSearchResults: (searchResults) => dispatch(setSearchResults(searchResults)),
		handleClearSearchResults: () => dispatch(clearSearchResults()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);