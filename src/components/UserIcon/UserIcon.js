import React, { useState, useContext, useEffect } from "react";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultUserImage from "../App/assets/icons/default-user.svg";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import UserContext from "../UserContext/UserContext";
import './assets/index.scss';
import { clearFriends, clearProfilePage, setProfilePage } from "../../actions";
import { connect } from "react-redux";
import { getCurrentUserFromDatabase } from "../../functions/getCurrentUserFromDatabase";
import { handleChooseProfilePage } from "../../functions/handleChooseProfilePage";

const UserIcon = (props) => {

	const { currentUserFromState, isUserFromAPI, profileImageSrc = null, profileLink, handleSetProfilePage, handleClearProfilePage, isProfile, handleClearFriends } = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [isImageSrcLoaded, setIsImageSrcLoaded] = useState(false);
	const [imageSrc, setImageSrc] = useState(null);
	const [userIcon, setUserIcon] = useState(null);

	const { currentUser } = useContext(UserContext);

	const isMyProfile = currentUser.userID === profileLink;

	const getImageSrc = async () => {
		if (currentUser.avatar === undefined && isMyProfile) {
			setImageSrc(currentUserFromState.avatar);
		} else {
			if (isMyProfile) {
				setImageSrc(currentUser.avatar);
			} else if (currentUser.avatar === null) {
				setImageSrc(defaultUserImage);
			} else if (isUserFromAPI) {
				setImageSrc('https://image.tmdb.org/t/p/original' + profileImageSrc);
			} else {
				await getCurrentUserFromDatabase(profileLink).then((userInfo) => setImageSrc(userInfo.data.avatar));
			}
		}

		setIsImageLoaded(true);
	}

	const getPreviewImageSrc = async () => {
		setIsImageLoaded(true);
		return profileImageSrc;
	}

	const getUserIcon = async () => {
		await getImageSrc();

		if (profileLink === 'userFromAPI' || isProfile) {
			setUserIcon(<div className="user-icon__image-wrap">
				<img src={imageSrc} className="user-icon__image" onError={event => addDefaultImage(event, defaultUserImage)} />
			</div>);
		} else {
			setUserIcon(<Link className="user-icon__link" to={`/profile/${profileLink}`} onClick={() => {handleChooseProfilePage(profileLink, handleClearProfilePage, handleClearFriends, handleSetProfilePage)}}>
				<div className="user-icon__image-wrap">
					<img src={imageSrc} className="user-icon__image" onError={event => addDefaultImage(event, defaultUserImage)} />
				</div>
			</Link>);
		}
	}

	const getPreviewUserIcon = async () => {
		const previewImageSrc = await getPreviewImageSrc();

		setUserIcon(<div className="user-icon__image-wrap">
			<img src={previewImageSrc} className="user-icon__image" onError={event => addDefaultImage(event, defaultUserImage)} />
		</div>);
	}

	useEffect(() => {
		if (isImageSrcLoaded === true) {
			setIsImageLoaded(false);
			if (isMyProfile && isProfile && profileImageSrc !== null) {
				getPreviewUserIcon();
			} else getUserIcon();
		}
	}, [imageSrc, profileImageSrc, isImageSrcLoaded, currentUser]);

	useEffect(() => {
		if (currentUserFromState !== null && currentUserFromState.avatar !== undefined) {
			setIsImageSrcLoaded(true);
		}
	}, [currentUserFromState]);

	return <div className="user-icon">{isImageLoaded ? userIcon : <Loader/>}</div>
}

const mapStateToProps = state => ({
	currentUserFromState: state.user.currentUser,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetProfilePage: (userInfo) => dispatch(setProfilePage(userInfo)),
		handleClearProfilePage: () => dispatch(clearProfilePage()),
		handleClearFriends: () => dispatch(clearFriends()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserIcon);