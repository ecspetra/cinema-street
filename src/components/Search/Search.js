import React, {useEffect, useMemo, useRef, useState} from "react";
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

const Search = (props) => {

	const { handleSetGenres, genres } = props;

	const searchInputRef = useRef();
	const searchSelectRef = useRef();
	let linkToFetchMovies = useRef();
	const [searchMethod, setSearchMethod] = useState('title');
	const [isShowSearchList, setIsShowSearchList] = useState(false);
	const [genresList, setGenresList] = useState([]);

	let linkToFetchMoviesByTitle;
	let linkToFetchMoviesByGenre;

	const getSearchMethod = (method) => {
		setSearchMethod(method);
		setIsShowSearchList(false);
	}

	const getGenreToSearch = (genreID) => {
		searchSelectRef.current = genreID;
		linkToFetchMovies.current = getLinkToFetchMovies();
	}

	const getLinkToFetchMovies = () => {
		if (searchMethod === 'title') {
			linkToFetchMoviesByTitle = LINK_TO_FETCH_SEARCH_MOVIES_BY_TITLE.replace('{movieTitle}', searchInputRef.current.value);
			return linkToFetchMoviesByTitle;
		} else {
			linkToFetchMoviesByGenre = LINK_TO_FETCH_SEARCH_MOVIES_BY_GENRE.replace('{genreID}', searchSelectRef.current);
			return linkToFetchMoviesByGenre;
		}
	}

	const handleSearch = (event) => {
		event.preventDefault();
		console.log('handleSearch');
		if (searchMethod === 'title' && searchInputRef.current.value.length && searchInputRef.current.value.trim() !== '') {
			setIsShowSearchList(true);
		} else setIsShowSearchList(true);
	}

	// useEffect(() => {
	// 	getGenres(handleSetGenres);
	// }, []);

	useEffect(() => {
		// getGenres(handleSetGenres).then((genres) => {setGenresList(genres)}).then(() => {
		// 	linkToFetchMovies.current = genresList.genres.map((genre, index) => {
		// 		if (index === 0) {
		// 			return genre.id
		// 		}})
		// });
		getGenres().then((data) => {handleSetGenres(data); setGenresList(data)}).then(() => {
			linkToFetchMovies.current = genresList.genres.map((genre, index) => {
				if (index === 0) {
					return genre.id
				}})
		});
	}, []);

	// useEffect(() => {
	// 	setGenresList(genres);
	// 	console.log(genresList);
	//
	// 	// if (genresList !== null) {
	// 	// 	linkToFetchMovies.current = genresList.genres.map((genre, index) => {
	// 	// 		if (index === 0) {
	// 	// 			return genre.id
	// 	// 		}});
	// 	// }
	// 	//
	// 	// linkToFetchMovies.current = genresList.genres.map((genre, index) => {
	// 	// 	if (index === 0) {
	// 	// 		return genre.id
	// 	// 	}});
	// }, [genres]);

	return (
		<div className="search">
			<div className="search__title-wrap">
				<h1 className="search__title">Search movie by</h1>
				<Select className="search__method-select">
					<SelectOption onClickAction={() => {getSearchMethod('title')}}>Title</SelectOption>
					<SelectOption onClickAction={() => {getSearchMethod('genre')}}>Genre</SelectOption>
				</Select>
			</div>
			<form className="search__form" onSubmit={handleSearch}>
				{
					searchMethod === 'title'
						? <input ref={searchInputRef} className="search__title-input" />
						: (
							<Select>
								{genresList.genres.map((genre, index) => {
									return <SelectOption onClickAction={() => {getGenreToSearch(genre.id)}} key={index}>{genre.name}</SelectOption>
								})}
							</Select>
						)
				}
				<button type="submit">Search</button>
			</form>
			{
				isShowSearchList && <SearchList linkToFetch={linkToFetchMovies.current} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);