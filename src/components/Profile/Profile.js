import React, { useState, useContext, useEffect, useRef } from "react";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import './assets/index.scss';
import UserContext from "../UserContext/UserContext";
import ImageInput from "../ImageInput/ImageInput";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { clearProfilePage } from "../../actions";
import { connect } from "react-redux";
import UserIcon from "../UserIcon/UserIcon";
import TaglineIcon from "../App/assets/icons/TaglineIcon";
import EmailIcon from "../App/assets/icons/EmailIcon";
import Calendar from "react-calendar";
import CalendarIcon from "../App/assets/icons/CalendarIcon";
import FlagIcon from "../App/assets/icons/FlagIcon";
import Button from "../Button/Button";

const Profile = (props) => {

	const { profile, handleClearProfilePage } = props;

	let userInfo;
	let isShowEditButton;
	const [isEditState, setIsEditState] = useState(false);
	const { currentUser } = useContext(UserContext);
	const database = getDatabase();
	const postListRef = ref(database, 'users');

	const isProfileLoaded = profile !== undefined;

	if (isProfileLoaded) {
		userInfo = profile;
		isShowEditButton = !isEditState && userInfo.key === currentUser.uid;
	}

	const onProfileUnmount = useRef();
	onProfileUnmount.current = () => {
		handleClearProfilePage();
	}

	useEffect(() => {
		return () => onProfileUnmount.current();
	}, []);

	const setNewAvatarFunction = (newAvatar) => {

		onValue(postListRef, (snapshot) => {
			snapshot.forEach((childSnapshot) => {

				const userFromDatabase = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (userFromDatabase.key === currentUser.uid) {

					const userRef = ref(database, "/users/" + userFromDatabase.key);

					set(userRef, {
						name: userFromDatabase.data.name,
						email: userFromDatabase.data.email,
						avatar: newAvatar,
						country: userFromDatabase.data.country,
						dateOfBirth: userFromDatabase.data.dateOfBirth,
						biography: userFromDatabase.data.biography,
					});
				}
			});
		});
	}

	return (
		<>
			{
				isProfileLoaded ? (
					<div className="profile">
						<div className="profile__content">
							<div className="profile__avatar">
								<UserIcon profileLink={userInfo.key} />
								{
									isEditState && <ImageInput setNewImageFunction={setNewAvatarFunction} />
								}
							</div>
							<div className="profile__text-wrap">
								<div className="profile__user-name-wrap">
									<h1 className="profile__user-name">{userInfo.data.name}</h1>
									{
										isShowEditButton && <Button context={'filled'} className="profile__edit" buttonOnClickFunction={() => {setIsEditState(true)}}>Edit profile</Button>
									}
								</div>
								{
									isEditState ? <EditProfileForm userInfo={userInfo} setIsEditState={setIsEditState} /> : (
										<>
											<div className="profile__details-wrap">
												<div className="profile__details profile__details--email">
													<EmailIcon />
													<p className="profile__details-text">Email: <span className="profile__details-bold">{userInfo.data.email}</span></p>
												</div>
												<div className="profile__details profile__details--date-of-birth">
													<CalendarIcon />
													<p className="profile__details-text">Date of birth: <span className="profile__details-bold">{userInfo.data.dateOfBirth}</span></p>
												</div>
												<div className="profile__details profile__details--country">
													<FlagIcon />
													<p className="profile__details-text">Country: <span className="profile__details-bold">{userInfo.data.country}</span></p>
												</div>
											</div>
											<h3 className="profile__biography">Additional information:</h3>
											<p className="profile__biography">{userInfo.data.biography}</p>
										</>
									)
								}
							</div>
						</div>
						<h1>Friends</h1>
					</div>
				) : 'Loading'
			}
		</>
	)
}

const mapStateToProps = state => ({
	profile: state.profile.user,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleClearProfilePage: () => dispatch(clearProfilePage())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);