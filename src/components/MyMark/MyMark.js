import React, { useEffect, useState } from "react";
import RatingIcon from "../App/assets/icons/Rating";
import getMyMarks from "../../functions/getMyMarks";
import {onValue, push, ref, remove, set} from "firebase/database";
import {database} from "../../firebase";
import {
	removeMyMark,
	setMyMark
} from "../../actions";
import { connect } from "react-redux";
import getRatingStars from "../../functions/getRatingStars";

const MyMark = (props) => {

	const marksListRef = ref(database, 'marks');
	const marksPostRef = push(marksListRef);

	const handleUpdateMyMarks = (id, mark) => {

		if (id && mark) {
			 set(marksPostRef, {
				movie: {
					id: id,
					myMark: mark,
				},
			}).then(() => {
				getMyMarksForMovies();
			})
		} else getMyMarksForMovies();
	}

	const getMyMarksForMovies = () => {

		 onValue(marksListRef, (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				const myMark = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}
				props.handleSetMyMark(myMark);
			});
		 });
	}

	const handleSetMyMarkForMovie = (id, mark) => {

		if (id && mark) {
			handleUpdateMyMarks(id, mark);
		}

		handleCheckIfMyMarkExists();
	};

	useEffect(() => {
		getMyMarksForMovies();
		handleSetMyMarkForMovie();
	}, [props.myMarks]);

	const [myMovieMark, setMyMovieMark] = useState();
	const [myEmptyMovieMark, setMyEmptyMovieMark] = useState([]);

	const renderShortMark = (myMarkFromStore) => {

		const myMarkShort = <><RatingIcon/><span>{myMarkFromStore.data.movie.myMark}</span></>;

		setMyMovieMark(myMarkShort);
	}

	const renderExtendedMark = (myMarkFromStore) => {

		const myMarkExtended = <>
			{getRatingStars(myMarkFromStore.data.movie.myMark)}
			<span className="my-mark__text">{myMarkFromStore.data.movie.myMark}</span>
			<button className="my-mark__remove" onClick={() => {handleRemoveMyMarkForMovie(myMarkFromStore.key)}}>Remove my mark</button>
		</>;

		setMyMovieMark(myMarkExtended);
	}

	const renderEmptyMark = () => {

		// setMyMovieMark(null);

		console.log(myMovieMark);

		const emptyMarkArray = [];
		const maxIconsAvailable = 10;

		for (let index = 0; index < maxIconsAvailable; index++) {

			const mark = index + 1;

			const markButton = <button key={index} className="my-mark__stars-item" onClick={() => {handleSetMyMarkForMovie(props.movie.id, mark)}}><RatingIcon onMouseEnter={() => {
				onHoverEmptyMark(mark)
			}} onMouseLeave={() => {
				renderEmptyMark()
			}} isEmpty /></button>

			if (!myEmptyMovieMark.find(item => item.key === markButton.key) || myEmptyMovieMark.length === 0) {
				emptyMarkArray.push(markButton);
			}
		}

		setMyEmptyMovieMark(emptyMarkArray);
	}

	const handleRemoveMyMarkForMovie = (key) => {

		const dbRef = ref(database, "/marks/" + key);
		remove(dbRef).then(() => console.log("Mark removed"));

		props.handleRemoveMyMark(key);

		// handleCheckIfMyMarkExists();

		// renderEmptyMark();
	}

	const onHoverEmptyMark = (mark) => {

		const iconIndex = mark;
		const hoveredIconsArray = [];
		const maxIconsAvailable = 10;

		for (let index = 0; index < maxIconsAvailable; index++) {
			let markIndex = index + 1;

			const unhoveredMarkButton = <button key={index} className="my-mark__stars-item" onClick={() => {handleSetMyMarkForMovie(props.movie.id, mark)}}><RatingIcon onMouseEnter={() => {
				onHoverEmptyMark(markIndex)
			}} onMouseLeave={() => {
				renderEmptyMark()
			}} isEmpty /></button>;

			const hoveredMarkButton = <button key={index} className="my-mark__stars-item" onClick={() => {handleSetMyMarkForMovie(props.movie.id, mark)}}><RatingIcon onMouseEnter={() => {
				onHoverEmptyMark(markIndex)
			}} onMouseLeave={() => {
				renderEmptyMark()
			}} /></button>;

			if (markIndex <= iconIndex) {
				hoveredIconsArray.push(hoveredMarkButton);
			} else hoveredIconsArray.push(unhoveredMarkButton);
		}

		setMyEmptyMovieMark(hoveredIconsArray);
	}

	const handleCheckIfMyMarkExists = async () => {

		const myMarkFromStore = await getMyMarks(props.movie.id, props.myMarks);

		if (props.movie.id === 675054) {
			console.log(props.movie.id);
		}

		if (myMarkFromStore && props.isShowExtendMark) {
			renderExtendedMark(myMarkFromStore);
		} else if (myMarkFromStore && !props.isShowExtendMark) {
			renderShortMark(myMarkFromStore);
		} else {
			renderEmptyMark();
		}
	}

	if (!props.isShowExtendMark && !!myEmptyMovieMark) return;

	return (
		<span className="my-mark">
			{
				myMovieMark ?? myEmptyMovieMark
			}
		</span>
	)
}

const mapStateToProps = state => ({
	myMarks: state.myMarks.uploadedMarks,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetMyMark: (myMark) => dispatch(setMyMark(myMark)),
		handleRemoveMyMark: (myMarkKey) => dispatch(removeMyMark(myMarkKey))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMark);