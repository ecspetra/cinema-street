import React, { useState, useContext, useEffect, useRef } from "react";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultUserImage from "../App/assets/icons/default-user.svg";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import UserContext from "../UserContext/UserContext";
import './assets/index.scss';
import {clearFriends, clearProfilePage, setProfilePage} from "../../actions";
import { connect } from "react-redux";
import { getCurrentUserFromDatabase } from "../../functions/getCurrentUserFromDatabase";
import { handleChooseProfilePage } from "../../functions/handleChooseProfilePage";

const UserIcon = (props) => {

	const { isUserFromAPI, profileImageSrc = null, profileLink, handleSetProfilePage, handleClearProfilePage, isProfile, handleClearFriends } = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [imageSrc, setImageSrc] = useState(null);
	const [previewImageSrc, setPreviewImageSrc] = useState(null);
	const [userIcon, setUserIcon] = useState(null);
	const imageSrcIntervalRef = useRef(null);

	const { currentUser } = useContext(UserContext);

	const isMyProfile = currentUser.uid === profileLink;

	const getImageSrc = async () => {
		if (isMyProfile) {
			imageSrcIntervalRef.current = setInterval(() => {
				console.log('here');
				fetch(currentUser.photoURL).then(() => {
					setImageSrc(currentUser.photoURL);
				});
			}, 500);
		} else if (currentUser.photoURL === null) {
			setImageSrc(defaultUserImage);
		} else if (isUserFromAPI) {
			setImageSrc('https://image.tmdb.org/t/p/original' + profileImageSrc);
		} else {
			await getCurrentUserFromDatabase(profileLink).then((userInfo) => setImageSrc(userInfo.data.avatar));
		}
	}

	const getPreviewImageSrc = async () => {
		setPreviewImageSrc(profileImageSrc);
	}

	useEffect(() => {
		if (imageSrc !== null) {
			clearInterval(imageSrcIntervalRef.current);
		}
	}, [imageSrc]);

	const getUserIcon = async () => {
		await getImageSrc();
		if (profileLink === 'userFromAPI' || isProfile) {
			setUserIcon(<div className="user-icon">
				<div className="user-icon__image-wrap">
					<img src={imageSrc} className="user-icon__image" onError={event => addDefaultImage(event, defaultUserImage)} onLoad={() => {setIsImageLoaded(true)}} />
					{!isImageLoaded && <Loader />}
				</div>
			</div>);
		} else {
			setUserIcon(<Link className="user-icon" to={"/profile/" + profileLink} onClick={() => {handleChooseProfilePage(profileLink, handleClearProfilePage, handleClearFriends, handleSetProfilePage)}}>
				<div className="user-icon__image-wrap">
					<img src={imageSrc} className="user-icon__image" onError={event => addDefaultImage(event, defaultUserImage)} onLoad={() => {setIsImageLoaded(true)}} />
					{!isImageLoaded && <Loader />}
				</div>
			</Link>);
		}
	}

	const getPreviewUserIcon = async () => {
		await getPreviewImageSrc();

		setUserIcon(<div className="user-icon">
			<div className="user-icon__image-wrap">
				<img src={previewImageSrc} className="user-icon__image" onError={event => addDefaultImage(event, defaultUserImage)} onLoad={() => {setIsImageLoaded(true)}} />
				{!isImageLoaded && <Loader />}
			</div>
		</div>);
	}

	useEffect(() => {
		if (isMyProfile && isProfile && previewImageSrc !== null) {
			getPreviewUserIcon();
		} else getUserIcon();
	}, [previewImageSrc, imageSrc]);

	return userIcon;
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetProfilePage: (userInfo) => dispatch(setProfilePage(userInfo)),
		handleClearProfilePage: () => dispatch(clearProfilePage()),
		handleClearFriends: () => dispatch(clearFriends()),
	}
}

export default connect(null, mapDispatchToProps)(UserIcon);