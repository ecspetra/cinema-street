import React, { useState, useContext, useEffect, useRef } from "react";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import './assets/index.scss';
import UserContext from "../UserContext/UserContext";
import ImageInput from "../ImageInput/ImageInput";
import {get, getDatabase, onValue, push, ref, set} from "firebase/database";
import { addToFriends, clearFriends, clearProfilePage, removeFromFriends } from "../../actions";
import { connect } from "react-redux";
import UserIcon from "../UserIcon/UserIcon";
import EmailIcon from "../App/assets/icons/EmailIcon";
import CalendarIcon from "../App/assets/icons/CalendarIcon";
import FlagIcon from "../App/assets/icons/FlagIcon";
import Button from "../Button/Button";
import checkIfFriendExistsInCollection from "../../functions/checkIfFriendExistsInCollection";
import CollectionButton from "../CollectionButton/CollectionButton";
import { removeUserFromFriends } from "../../functions/removeFriendFromCollection";
import FriendsList from "../FriendsList/FriendsList";
import FriendsPopup from "../Popups/FriendsPopup/FriendsPopup";

const Profile = (props) => {

	const { profile, handleClearProfilePage, handleClearFriends, handleRemoveFriend } = props;

	let userInfo;
	let isShowEditButton;
	let isShowAddToFriendsButton;
	const [isEditState, setIsEditState] = useState(false);
	const [isFriendFromCollection, setIsFriendFromCollection] = useState(false);
	const [isShowFriendsModal, setIsShowFriendsModal] = useState(false);
	const { currentUser } = useContext(UserContext);
	const database = getDatabase();
	const usersListRef = ref(database, 'users');
	const friendsListRef = ref(database, 'friends');

	const isProfileLoaded = profile !== undefined;

	if (isProfileLoaded) {
		userInfo = profile;
		isShowEditButton = !isEditState && userInfo.key === currentUser.uid;
		isShowAddToFriendsButton = userInfo.key !== currentUser.uid;
	}

	const onProfileUnmount = useRef();
	onProfileUnmount.current = () => {
		handleClearProfilePage();
		handleClearFriends();
	}

	useEffect(() => {
		return () => onProfileUnmount.current();
	}, []);

	useEffect(() => {
		if (isProfileLoaded && userInfo.key !== currentUser.uid) {
			checkIfFriendExistsInCollection(friendsListRef, userInfo, currentUser.uid).then(data => setIsFriendFromCollection(data));
		}
	}, [isProfileLoaded]);

	const addUserToFriends = async () => {

		const friendsPostRef = push(friendsListRef);

		return new Promise((resolve) => {
			get(friendsListRef).then((snapshot) => {

				const usersFromFirebase = [];

				snapshot.forEach((childSnapshot) => {
					const user = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}
					usersFromFirebase.push(user);
				});

				resolve(usersFromFirebase);
			});
		}).then((data) => {
			if (!data.length) {
				set(friendsPostRef, {
					userID: currentUser.uid,
					info: {
						name: currentUser.displayName,
						email: currentUser.email,
						avatar: currentUser.photoURL,
					},
					friends: [userInfo],
				})
			}

			data.map((item) => {

				const newUser = !data.find(user => user.data.userID === currentUser.uid);
				const newFriend = !item.data.friends;

				if (item.data.userID === currentUser.uid) {

					const userRef = ref(database, "/friends/" + item.key);

					if (newFriend) {
						set(userRef, {
							userID: currentUser.uid,
							info: {
								name: currentUser.displayName,
								email: currentUser.email,
								avatar: currentUser.photoURL,
							},
							friends: [userInfo],
						})
					} else {
						set(userRef, {
							userID: item.data.userID,
							info: {
								name: item.data.info.name,
								email: item.data.info.email,
								avatar: item.data.info.avatar,
							},
							friends: [...item.data.friends, userInfo],
						});
					}
				} else if (newUser) {
					set(friendsPostRef, {
						userID: currentUser.uid,
						info: {
							name: currentUser.displayName,
							email: currentUser.email,
							avatar: currentUser.photoURL,
						},
						friends: [userInfo],
					})
				}
			});

			checkIfFriendExistsInCollection(friendsListRef, userInfo, currentUser.uid).then(data => setIsFriendFromCollection(data));
		});
	}

	const handleRemoveFriendFromCollection = () => {
		removeUserFromFriends(friendsListRef, userInfo, currentUser.uid, handleRemoveFriend, setIsFriendFromCollection);
	}

	const collectionButtonOnClickFunction = isFriendFromCollection ? handleRemoveFriendFromCollection : addUserToFriends;

	const setNewAvatarFunction = (newAvatar) => {

		onValue(usersListRef, (snapshot) => {
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

	const handleOpenFriendsPopup = () => {
		setIsShowFriendsModal(true);
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
											<div className="profile__friends-list">
												<h3 className="profile__friends-list-title">Friends</h3>
												<Button buttonOnClickFunction={() => {handleOpenFriendsPopup()}}>
													<FriendsList isShortFriendsList={true} isMyFriendsList={userInfo.key === currentUser.uid} userID={userInfo.key} />
													<span className="profile__friends-list-button-text">Show friends</span>
												</Button>
											</div>
											<h3 className="profile__biography">Additional information:</h3>
											<p className="profile__biography-text">{userInfo.data.biography}</p>
											{
												isShowAddToFriendsButton && <CollectionButton className="profile__add-to-friends" isExistsInCollection={isFriendFromCollection} collectionButtonOnClickFunction={collectionButtonOnClickFunction}>{isFriendFromCollection ? 'Remove from friends' : 'Add to friends'}</CollectionButton>
											}
										</>
									)
								}
							</div>
							<FriendsPopup isShowModal={isShowFriendsModal} setIsShowModal={setIsShowFriendsModal} setIsFriendFromCollection={setIsFriendFromCollection} isMyFriendsList={userInfo.key === currentUser.uid} userID={userInfo.key} />
						</div>
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
		handleClearProfilePage: () => dispatch(clearProfilePage()),
		handleClearFriends: () => dispatch(clearFriends()),
		handleRemoveFriend: (key) => dispatch(removeFromFriends(key))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);