import React, {useEffect, useRef, useState} from "react";
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

	const { userID, movie, myMarks, isShowExtendMark, handleSetMyMark, handleRemoveMyMark } = props;

	const marksListRef = ref(database, 'marks');
	const marksPostRef = push(marksListRef);
	const markRef = useRef();

	const handleUpdateMyMarks = (id, mark, userID) => {

		if (id && mark) {
			 set(marksPostRef, {
				movie: {
					userID: userID,
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
				if (myMark.data.movie.userID === userID) {
					handleSetMyMark(myMark);
				}
			});
		 });
	}

	const handleSetMyMarkForMovie = (id, mark, userID) => {

		if (id && mark) {
			handleUpdateMyMarks(id, mark, userID);
		}

		handleCheckIfMyMarkExists();
	};

	useEffect(() => {
		getMyMarksForMovies();
		handleSetMyMarkForMovie();
	}, [myMarks]);

	const [myMovieMark, setMyMovieMark] = useState([]);
	const [isLoadingMark, setIsLoadingMark] = useState(false);

	const renderShortMark = (myMarkFromStore) => {

		setIsLoadingMark(true);

		const myMarkShort = <><RatingIcon/><span className="my-mark__text">{myMarkFromStore.data.movie.myMark}</span></>;

		setMyMovieMark(myMarkShort);
		setIsLoadingMark(false);
	}

	const renderExtendedMark = (myMarkFromStore) => {

		setIsLoadingMark(true);

		const myMarkExtended = <>
			{getRatingStars(myMarkFromStore.data.movie.myMark)}
			<span className="my-mark__text">{myMarkFromStore.data.movie.myMark}</span>
			<button className="my-mark__remove" onClick={() => {handleRemoveMyMarkForMovie(myMarkFromStore.key)}}>Remove my mark</button>
		</>;

		setMyMovieMark(myMarkExtended);
		setIsLoadingMark(false);
	}

	const renderEmptyMark = () => {

		setIsLoadingMark(true);

		const emptyMarkArray = [];
		const maxIconsAvailable = 10;

		for (let index = 0; index < maxIconsAvailable; index++) {

			const mark = index + 1;

			const markButton = <button key={index} className="my-mark__stars-item" onClick={() => {handleSetMyMarkForMovie(movie.id, mark, userID)}}><RatingIcon onMouseEnter={() => {
				onHoverEmptyMark(mark)
			}} onMouseLeave={() => {
				renderEmptyMark()
			}} isEmpty /></button>

			emptyMarkArray.push(markButton);
		}

		setMyMovieMark(emptyMarkArray);
		setIsLoadingMark(false);
	}

	const handleRemoveMyMarkForMovie = (key) => {

		const dbRef = ref(database, "/marks/" + key);
		remove(dbRef).then(() => console.log("Mark removed"));

		handleRemoveMyMark(key);
	}

	const onHoverEmptyMark = (mark) => {

		const iconIndex = mark;
		const hoveredIconsArray = [];
		const maxIconsAvailable = 10;

		for (let index = 0; index < maxIconsAvailable; index++) {
			let markIndex = index + 1;

			const unhoveredMarkButton = <button key={index} className="my-mark__stars-item" onClick={() => {handleSetMyMarkForMovie(movie.id, mark, userID)}}><RatingIcon onMouseEnter={() => {
				onHoverEmptyMark(markIndex)
			}} onMouseLeave={() => {
				renderEmptyMark()
			}} isEmpty /></button>;

			const hoveredMarkButton = <button key={index} className="my-mark__stars-item" onClick={() => {handleSetMyMarkForMovie(movie.id, mark, userID)}}><RatingIcon onMouseEnter={() => {
				onHoverEmptyMark(markIndex)
			}} onMouseLeave={() => {
				renderEmptyMark()
			}} /></button>;

			if (markIndex <= iconIndex) {
				hoveredIconsArray.push(hoveredMarkButton);
			} else hoveredIconsArray.push(unhoveredMarkButton);
		}

		markRef.current = iconIndex;
		hoveredIconsArray.push(<span className="my-mark__text">{markRef.current}</span>);
		setMyMovieMark(hoveredIconsArray);
	}

	const handleCheckIfMyMarkExists = async () => {

		const myMarkFromStore = await getMyMarks(movie.id, myMarks);

		if (myMarkFromStore && isShowExtendMark) {
			renderExtendedMark(myMarkFromStore);
		} else if (myMarkFromStore && !isShowExtendMark) {
			renderShortMark(myMarkFromStore);
		} else {
			renderEmptyMark();
		}
	}

	const extendedMarkInMovieCard = myMovieMark.length;

	if (!isShowExtendMark && extendedMarkInMovieCard) return;

	return (
		<span className="my-mark">
			{!isLoadingMark && myMovieMark}
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