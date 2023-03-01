import React, { useEffect, useRef, useState } from "react";
import { clearSearchResults, setSearchResults } from "../../actions";
import { connect } from "react-redux";
import fetchMoreResults from "../../functions/fetchMoreResults";
import MoreButton from "../MoreButton/MoreButton";
import SearchCard from "../SearchCard/SearchCard";
import InfoText from "../InfoText/InfoText";
import './assets/index.scss';
import md5 from "md5";

const SearchList = (props) => {

	const { searchResults, isMovieList, linkToFetch, handleSetSearchResults, handleClearSearchResults, setIsShowSearchList } = props;

	const onSearchListUnmount = useRef();
	onSearchListUnmount.current = () => {
		handleClearSearchResults();
	}

	useEffect(() => {
		return () => onSearchListUnmount.current();
	}, []);

	const searchListRef = useRef();
	const [currentResultsPage, setCurrentResultsPage] = useState(1);
	const [isSearchListLoaded, setIsSearchListLoaded] = useState(true);
	const [prevResultsPage, setPrevResultsPage] = useState(0);
	const [isResultsExist, setIsResultsExist] = useState(true);

	const getSearchResults = async () => {
		setIsSearchListLoaded(false);
		await fetchMoreResults(linkToFetch, currentResultsPage).then((data) => {
			if (!data.dataFromResponse.data.results.length) {
				setIsResultsExist(false);
			} else handleSetSearchResults(data.dataFromResponse.data.results);
			setIsResultsExist(true);
		})
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

	const clearSearchResults = () => {
		let refOffset = 300;
		let refPosition = searchListRef.current.getBoundingClientRect().top;
		let offsetPosition = refPosition + window.pageYOffset - refOffset;

		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth"
		});

		setTimeout(() => {
			setIsShowSearchList(false);
		}, 750);
	}

	return (
		<>
			{
				searchResults.length > 0
					? <>
						<div className="search-list" ref={searchListRef}>
							{
								searchResults.length > 0 && searchResults.map((result) => {
									return (
										<SearchCard result={result} key={md5(result.id)} isMovieCard={isMovieList} />
									)
								})
							}
						</div>
						<div className="search-list-buttons-wrap">
							{
								(isShowMoreButton && isSearchListLoaded) && <MoreButton isFetchResultsButton moreButtonOnClickFunction={getSearchResults} />
							}
							<button className="search-list-buttons-wrap__clear-button" onClick={() => {clearSearchResults()}}>Clear results</button>
						</div>
					</>
					: <InfoText>No results. Please try another request.</InfoText>
			}
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