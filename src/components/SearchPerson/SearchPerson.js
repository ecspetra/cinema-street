import React, { useRef, useState } from "react";
import SearchList from "../SearchList/SearchList";
import { handleChangeInputValue } from "../../functions/handleChangeInputValue";
import classNames from "classnames";
import Error from "../Error/Error";
import {LINK_TO_FETCH_SEARCH_PERSONS_BY_NAME} from "../../functions/linksToFetch";
import Button from "../Button/Button";
import './assets/index.scss';

const SearchPerson = () => {

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

	const searchInputClassNames = classNames('search-person__title-input', {
		'search-person__title-input--error': isShowError,
	});

	return (
		<div className="search-person">
			<div className="search-person__title-wrap">
				<h1 className="search-person__title">Search person by name</h1>
			</div>
			<form className="search-person__form" onSubmit={handleSearch}>
				<div className="search-person__input-wrap">
					<input ref={searchInputRef} onChange={() => {handleChangeInputValue(searchInputRef, setIsShowError)}} className={searchInputClassNames} />
					{
						isShowError && <Error>Search field shouldn't be empty</Error>
					}
				</div>
				<Button context={'filled'} className="search-person__button" type="submit">Search</Button>
			</form>
			{
				isShowSearchList && (
					<>
						<h3 className="search-person__subtitle">Results for person {'"' + searchInputRef.current.value + '"'}</h3>
						<SearchList linkToFetch={linkToFetchPersons.current} setIsShowSearchList={setIsShowSearchList} />
					</>
				)
			}
		</div>
	)
}

export default SearchPerson;