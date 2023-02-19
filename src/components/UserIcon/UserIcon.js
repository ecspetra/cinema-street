import React, {useState, useContext, useEffect, useRef} from "react";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultUserImage from "../App/assets/icons/default-user.svg";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import UserContext from "../UserContext/UserContext";
import './assets/index.scss';
import { setProfilePage } from "../../actions";
import { connect } from "react-redux";
import { getCurrentUserFromDatabase } from "../../functions/getCurrentUserFromDatabase";

const UserIcon = (props) => {

	const { isUserFromAPI, profileImageSrc, profileLink, handleSetProfilePage } = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [imageSrc, setImageSrc] = useState(null);
	const imageSrcIntervalRef = useRef(null);

	const { currentUser } = useContext(UserContext);

	const isMyProfile = currentUser.uid === profileLink;

	const handleImageSrc = async () => {
		if (isMyProfile) {
			imageSrcIntervalRef.current = setInterval(() => {
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

	useEffect(() => {
		handleImageSrc();
	}, []);

	useEffect(() => {
		if (imageSrc !== null) {
			clearInterval(imageSrcIntervalRef.current);
		}
	}, [imageSrc]);

	return (
		<>
			{
				profileLink === 'userFromAPI' ? (
					<div className="user-icon">
						<div className="user-icon__image-wrap">
							<img className="user-icon__image" onError={event => addDefaultImage(event, defaultUserImage)} onLoad={() => {setIsImageLoaded(true)}} src={imageSrc} />
							{!isImageLoaded && <Loader />}
						</div>
					</div>
				) : (
					<Link className="user-icon" to={"/profile/" + profileLink} onClick={() => {getCurrentUserFromDatabase(profileLink).then((userInfo) => handleSetProfilePage(userInfo))}}>
						<div className="user-icon__image-wrap">
							<img className="user-icon__image" onError={event => addDefaultImage(event, defaultUserImage)} onLoad={() => {setIsImageLoaded(true)}} src={imageSrc} />
							{!isImageLoaded && <Loader />}
						</div>
					</Link>
				)
			}
		</>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleSetProfilePage: (userInfo) => dispatch(setProfilePage(userInfo)),
	}
}

export default connect(null, mapDispatchToProps)(UserIcon);