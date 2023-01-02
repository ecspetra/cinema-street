import React, { useState } from "react";
import { addDefaultImage } from "../../functions/addDefaultImage";
import defaultUserImage from "../App/assets/icons/default-user.svg";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import './assets/index.scss';

const Profile = (props) => {

	const { currentUser } = props;

	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [isEditState, setIsEditState] = useState(false);

	return (
		<div className="profile">
			<div className="profile__content">
				<div className="profile__image-wrap">
					<img className="profile__image" onError={event => addDefaultImage(event, defaultUserImage)} onLoad={() => {setIsImageLoaded(true)}} src={currentUser.photoURL} alt="profile-image" />
					{!isImageLoaded && <Loader>Loading image</Loader>}
				</div>
				<div className="profile__text-wrap">
					<div className="profile__user-name-wrap">
						<h1 className="profile__user-name">{currentUser.displayName}</h1>
						<button className="profile__edit" onClick={() => {setIsEditState(true)}}>Edit</button>
					</div>
					{
						isEditState ? <EditProfileForm /> : (
							<div className="profile__details-wrap">
								<p className="profile__user-email">Email: {currentUser.email}</p>
								<p className="profile__user-date-of-birth">Date of birth: {currentUser.email ?? 'unset'}</p>
								<p className="profile__user-country">Country: {currentUser.email ?? 'unset'}</p>
							</div>
						)
					}
					<h3 className="profile__biography">Information:</h3>
					<p className="profile__biography">{currentUser.email ?? 'unset'}</p>
				</div>
			</div>
			<h1>Friends</h1>
		</div>
	)
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
})

export default connect(mapStateToProps, null)(Profile);