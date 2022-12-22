import React, { useRef, useState } from "react";
import SearchList from "../SearchList/SearchList";
import { handleChangeInputValue } from "../../functions/handleChangeInputValue";
import classNames from "classnames";
import Error from "../Error/Error";
import {LINK_TO_FETCH_SEARCH_PERSONS_BY_NAME} from "../../functions/linksToFetch";

const SearchPerson = (props) => {

	const searchInputRef = useRef();
	const linkToFetchPersons = useRef();
	const [isShowSearchList, setIsShowSearchList] = useState(false);
	const [isShowError, setIsShowError] = useState(false);

	const handleSearch = async (event) => {
		event.preventDefault();
		await setIsShowSearchList(false);

		if (searchInputRef.current.value.length && searchInputRef.current.value.trim() !== '') {
			linkToFetchPersons.current = LINK_TO_FETCH_SEARCH_PERSONS_BY_NAME.replace('{personName}', searchInputRef.current.value.replace(/ /g, "+"));
			setIsShowSearchList(true);
		} else {
			setIsShowError(true);
		}
	}

	const searchInputClassNames = classNames('search__title-input', {
		'search__title-input--error': isShowError,
	});

	return (
		<div className="search">
			<div className="search__title-wrap">
				<h1 className="search__title">Search person by name</h1>
			</div>
			<form className="search__form" onSubmit={handleSearch}>
				<div className="search__input-wrap">
					<input ref={searchInputRef} onChange={() => {handleChangeInputValue(searchInputRef, setIsShowError)}} className={searchInputClassNames} />
					{
						isShowError && <Error>Search field shouldn't be empty</Error>
					}
				</div>
				<button className="main-button main-button--filled search__button" type="submit">Search</button>
			</form>
			{
				isShowSearchList && (
					<>
						<h3 className="search__subtitle">Results for person {'"' + searchInputRef.current.value + '"'}</h3>
						<SearchList linkToFetch={linkToFetchPersons.current} setIsShowSearchList={setIsShowSearchList} />
					</>
				)
			}
		</div>
	)
}

export default SearchPerson;