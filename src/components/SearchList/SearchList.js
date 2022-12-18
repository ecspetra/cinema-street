import React, { useEffect, useRef, useState } from "react";
import { clearSearchResults, setSearchResults } from "../../actions";
import { connect } from "react-redux";
import fetchMoreResults from "../../functions/fetchMoreResults";
import MoreButton from "../MoreButton/MoreButton";

const SearchList = (props) => {

	const { searchResults, linkToFetch, handleSetSearchResults, handleClearSearchResults } = props;

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

	console.log(linkToFetch);

	return (
		<div>
			{
				searchResults.length > 0 && searchResults.map((item, index) => {
					return (
						<div className="searched-movie" key={index}>
							<h3 className="searched-movie__title">{item.title}</h3>
						</div>
					)
				})
			}
			{
				(isShowMoreButton && isSearchListLoaded) && <MoreButton isFetchResultsButton moreButtonOnClickFunction={getSearchResults} />
			}
		</div>
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