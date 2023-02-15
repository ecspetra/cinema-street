import React, { useEffect, useRef, useState } from "react";
import {
	LINK_TO_FETCH_SEARCH_MOVIES_BY_GENRE,
	LINK_TO_FETCH_SEARCH_MOVIES_BY_TITLE
} from "../../functions/linksToFetch";
import SearchList from "../SearchList/SearchList";
import { setGenres } from "../../actions";
import { connect } from "react-redux";
import getGenres from "../../functions/getGenres";
import Select from "../Select/Select";
import SelectOption from "../SelectOption/SelectOption";
import { handleChangeInputValue } from "../../functions/handleChangeInputValue";
import Button from "../Button/Button";
import './assets/index.scss';
import Input from "../Input/Input";

const SearchMovie = (props) => {

	const { handleSetGenres } = props;

	const searchInputRef = useRef();
	const searchSelectRef = useRef();
	const linkToFetchMovies = useRef();
	const [isTitleSearchMethod, setIsTitleSearchMethod] = useState(false);
	const [searchMethod, setSearchMethod] = useState('title');
	const [isShowSearchList, setIsShowSearchList] = useState(false);
	const [genresList, setGenresList] = useState([]);
	const [error, setError] = useState({
		errorText: '',
		isShowError: false,
	});

	let linkToFetchMoviesByTitle;
	let linkToFetchMoviesByGenre;

	const getSearchMethod = (method) => {
		setSearchMethod(method);
		if (method === 'title') {
			setIsTitleSearchMethod(true);
		} else {
			setIsTitleSearchMethod(false);
			setError({errorText: '', isShowError: false});
			searchSelectRef.current = genresList[0];
		}
		setIsShowSearchList(false);
	}

	const getGenreToSearch = (genre) => {
		setIsShowSearchList(false);
		searchSelectRef.current = genre;
	}

	const getLinkToFetchMovies = (defaultLinkToFetchMovies = null) => {

		const isDefaultLinkToFetchMoviesExists = defaultLinkToFetchMovies !== null;

		if (searchMethod === 'title') {
			linkToFetchMoviesByTitle = LINK_TO_FETCH_SEARCH_MOVIES_BY_TITLE.replace('{movieTitle}', isDefaultLinkToFetchMoviesExists ? defaultLinkToFetchMovies.name : searchInputRef.current.value.replace(/ /g, "+"));
			return linkToFetchMoviesByTitle;
		} else {
			linkToFetchMoviesByGenre = LINK_TO_FETCH_SEARCH_MOVIES_BY_GENRE.replace('{genreID}', isDefaultLinkToFetchMoviesExists ? defaultLinkToFetchMovies.id : searchSelectRef.current.id);
			return linkToFetchMoviesByGenre;
		}
	}

	const handleSearch = async (event) => {
		event.preventDefault();

		await setIsShowSearchList(false);

		if (searchMethod === 'title') {
			if (searchInputRef.current.value.length && searchInputRef.current.value.trim() !== '') {
				linkToFetchMovies.current = getLinkToFetchMovies();
				setIsShowSearchList(true);
			} else {
				setError({errorText: 'Search field shouldn\'t be empty', isShowError: true});
			}
		} else {
			linkToFetchMovies.current = getLinkToFetchMovies();
			setIsShowSearchList(true);
		}
	}

	useEffect(() => {
		getGenres().then((data) => {
			handleSetGenres(data);
			setGenresList(data);
			if (searchMethod !== 'title') {
				const defaultLinkToFetchMovies = data[0];
				linkToFetchMovies.current = getLinkToFetchMovies(defaultLinkToFetchMovies);
			}
		})
	}, []);

	return (
		<div className="search-movie">
			<div className="search-movie__title-wrap">
				<h1 className="search-movie__title">Search movie by</h1>
				<Select className="search-movie__method-select">
					<SelectOption onClickAction={() => {getSearchMethod('title')}}>Title</SelectOption>
					<SelectOption onClickAction={() => {getSearchMethod('genre')}}>Genre</SelectOption>
				</Select>
			</div>
			<form className="search-movie__form" onSubmit={handleSearch}>
				{
					searchMethod === 'title'
						? (
							<div className="search-movie__input-wrap">
								<Input inputRef={searchInputRef} isValid={!error.isShowError} errorText={error.errorText} isInFocus={isTitleSearchMethod} onChangeFunction={() => {handleChangeInputValue(searchInputRef, setError)}} />
							</div>
						)
						: (
							<Select>
								{genresList.map((genre) => {
									return <SelectOption onClickAction={() => {getGenreToSearch(genre)}} key={genre.name}>{genre.name}</SelectOption>
								})}
							</Select>
						)
				}
				<Button buttonType={"submit"} context={'filled'} className="search-movie__button">Search</Button>
			</form>
			{
				isShowSearchList && (
					<>
						<h3 className="search-movie__subtitle">Results for
							{
								searchMethod === 'title'
									? ' title ' + '"' + searchInputRef.current.value + '"'
									: ' genre ' + '"' + searchSelectRef.current.name + '"'
							}
						</h3>
						<SearchList linkToFetch={linkToFetchMovies.current} setIsShowSearchList={setIsShowSearchList} isMovieList />
					</>
				)
			}
		</div>
	)
}

const mapStateToProps = state => ({
	genres: state.genres.uploadedGenres,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetGenres: (genres) => dispatch(setGenres(genres)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMovie);