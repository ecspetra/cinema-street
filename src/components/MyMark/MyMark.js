import React, {useEffect, useRef, useState, useContext} from "react";
import RatingIcon from "../App/assets/icons/Rating";
import getMyMarks from "../../functions/getMyMarks";
import {onValue, push, ref, remove, set} from "firebase/database";
import {database} from "../../firebase";
import {
	clearMyMark,
	removeMyMark,
	setMyMark
} from "../../actions";
import { connect } from "react-redux";
import getRatingStars from "../../functions/getRatingStars";
import './assets/index.scss';
import UserContext from "../UserContext/UserContext";

const MyMark = (props) => {

	const { movie, myMarks, isShowExtendMark, handleSetMyMark, handleRemoveMyMark, handleClearMyMark } = props;

	const { currentUser } = useContext(UserContext);

	const marksListRef = ref(database, 'marks');
	const marksPostRef = push(marksListRef);
	const markRef = useRef();

	const onMarkUnmount = useRef();
	onMarkUnmount.current = () => {
		handleClearMyMark();
	}

	useEffect(() => {
		return () => onMarkUnmount.current();
	}, []);

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
				if (myMark.data.movie.userID === currentUser.userID) {
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

	const [myMovieMark, setMyMovieMark] = useState({
		iconsArray: null,
		mark: null,
	});

	const renderShortMark = (myMarkFromStore) => {
		const myMarkShortIcon = <RatingIcon />;
		const myMarkShortNumber = <span className="my-mark__text">{myMarkFromStore.data.movie.myMark}</span>;

		setMyMovieMark({iconsArray: myMarkShortIcon, mark: myMarkShortNumber});
	}

	const renderExtendedMark = (myMarkFromStore) => {
		const myMarkExtendedIcons = <>{getRatingStars(myMarkFromStore.data.movie.myMark)}</>;
		const myMarkExtendedNumber = <>
			<span className="my-mark__text">{myMarkFromStore.data.movie.myMark}</span>
			<button className="my-mark__remove" onClick={() => {handleRemoveMyMarkForMovie(myMarkFromStore.key)}}>Remove</button>
		</>;

		setMyMovieMark({ iconsArray: myMarkExtendedIcons, mark: myMarkExtendedNumber});
	}

	const renderEmptyMark = () => {
		const emptyMarkArray = [];
		const maxIconsAvailable = 10;

		for (let index = 0; index < maxIconsAvailable; index++) {

			const mark = index + 1;

			const markButton = <RatingIcon onMouseEnter={() => {
				onHoverEmptyMark(mark)
			}} onMouseLeave={() => {
				renderEmptyMark()
			}} isEmpty />;

			emptyMarkArray.push(markButton);
		}

		const mappedEmptyMarkArray = emptyMarkArray.map((icon, index) => {
			const mark = index + 1;
			return <button className="my-mark__stars-item" key={index} onClick={() => {handleSetMyMarkForMovie(movie.id, mark, currentUser.userID)}}>{icon}</button>;
		})

		setMyMovieMark({ iconsArray: mappedEmptyMarkArray, mark: null});
	}

	const handleRemoveMyMarkForMovie = (key) => {

		const dbRef = ref(database, "/marks/" + key);
		remove(dbRef);

		handleRemoveMyMark(key);
	}

	const onHoverEmptyMark = (mark) => {

		const iconIndex = mark;
		const hoveredIconsArray = [];
		const maxIconsAvailable = 10;

		for (let index = 0; index < maxIconsAvailable; index++) {
			let markIndex = index + 1;

			const unhoveredMarkButton = <RatingIcon onMouseEnter={() => {
				onHoverEmptyMark(markIndex)
			}} onMouseLeave={() => {
				renderEmptyMark()
			}} isEmpty />;

			const hoveredMarkButton = <RatingIcon onMouseEnter={() => {
				onHoverEmptyMark(markIndex)
			}} onMouseLeave={() => {
				renderEmptyMark()
			}} />;

			if (markIndex <= iconIndex) {
				hoveredIconsArray.push(hoveredMarkButton);
			} else hoveredIconsArray.push(unhoveredMarkButton);
		}

		const mappedHoveredIconsArray = hoveredIconsArray.map((icon, index) => {
			return <button className="my-mark__stars-item" key={index} onClick={() => {handleSetMyMarkForMovie(movie.id, mark, currentUser.userID)}}>{icon}</button>;
		})

		markRef.current = iconIndex;

		const hoveredIconsNumber = <span className="my-mark__text">{markRef.current}</span>;

		setMyMovieMark({iconsArray: mappedHoveredIconsArray, mark: hoveredIconsNumber});
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

	const isMyMarkUnset = getMyMarks(movie.id, myMarks) === undefined;

	if ((!isShowExtendMark && extendedMarkInMovieCard) || (!isShowExtendMark && isMyMarkUnset)) return;

	return (
		<span className="my-mark">
			<span className="my-mark__icons">{myMovieMark.iconsArray}</span>
			{myMovieMark.mark}
		</span>
	)
}

const mapStateToProps = state => ({
	myMarks: state.myMarks.uploadedMarks,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetMyMark: (myMark) => dispatch(setMyMark(myMark)),
		handleRemoveMyMark: (myMarkKey) => dispatch(removeMyMark(myMarkKey)),
		handleClearMyMark: () => dispatch(clearMyMark())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMark);