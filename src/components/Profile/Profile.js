import React, { useState, useContext, useEffect, useRef } from "react";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import './assets/index.scss';
import UserContext from "../UserContext/UserContext";
import ImageInput from "../ImageInput/ImageInput";
import { get, getDatabase, onValue, push, ref, set } from "firebase/database";
import {addToFriends, clearFriends, clearProfilePage, removeFromFriends} from "../../actions";
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
import Title from "../Title/Title";
import { getFriendsFromDatabase } from "../../functions/getFriendsFromDatabase";
import Loader from "../Loader/Loader";
import {getCurrentUserFromDatabase} from "../../functions/getCurrentUserFromDatabase";

const Profile = (props) => {

	const { profile, handleClearProfilePage, handleClearFriends, handleRemoveFriend, handleAddFriend } = props;

	let isShowEditButton;
	let isShowAddToFriendsButton;
	const [isEditState, setIsEditState] = useState(false);
	const [temporaryProfileImage, setTemporaryProfileImage] = useState(null);
	const [isFriendFromCollection, setIsFriendFromCollection] = useState(false);
	const [isShowFriendsModal, setIsShowFriendsModal] = useState(false);
	const [userProfile, setUserProfile] = useState({
		userID: '',
		name: '',
		email: '',
		avatar: '',
		country: '',
		dateOfBirth: '',
		biography: '',
	});
	const { currentUser } = useContext(UserContext);
	const database = getDatabase();
	const usersListRef = ref(database, 'users');
	const friendsListRef = ref(database, 'friends');
	let isMyFriendsList;


	const isProfileLoaded = profile !== null;

	if (isProfileLoaded) {
		isShowEditButton = !isEditState && profile.key === currentUser.userID;
		isShowAddToFriendsButton = profile.key !== currentUser.userID;
		isMyFriendsList = profile.key === currentUser.userID;
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
		setIsShowFriendsModal(false);
	}, [profile]);

	useEffect(() => {
		if (isProfileLoaded) {

			setUserProfile({
				userID: profile.data.userID,
				name: profile.data.name,
				email: profile.data.email,
				avatar: profile.data.avatar,
				country: profile.data.country,
				dateOfBirth: profile.data.dateOfBirth,
				biography: profile.data.biography,
			});
		}
	}, [isProfileLoaded]);

	useEffect(() => {
		if (isProfileLoaded && profile.key !== currentUser.userID) {
			checkIfFriendExistsInCollection(friendsListRef, userProfile, currentUser).then(data => setIsFriendFromCollection(data));
		}
	}, [userProfile]);

	const addUserToFriends = async () => {

		const currentUserPostRef = push(friendsListRef);
		const newUserPostRef = push(friendsListRef);
		const selectedUserPostRef = push(friendsListRef);

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
				set(currentUserPostRef, {
					userID: currentUser.userID,
					info: {
						name: currentUser.name,
						email: currentUser.email,
						avatar: currentUser.avatar,
					},
					friends: [userProfile],
				}).then(() => {
					set(selectedUserPostRef, {
						userID: userProfile.userID,
						info: {
							name: userProfile.name,
							email: userProfile.email,
							avatar: userProfile.avatar,
						},
						friends: [currentUser],
					})
				}).then(() => {
					checkIfFriendExistsInCollection(friendsListRef, userProfile, currentUser).then(data => setIsFriendFromCollection(data));
					getFriendsFromDatabase(friendsListRef, isMyFriendsList ? currentUser.userID : profile.key, isMyFriendsList).then((data) => {
						data.map((friend) => {
							handleAddFriend(friend);
						})
					});
				});
			}

			const isCurrentUserExists = data.find(user => user.data.userID === currentUser.userID) ?? false;
			const isSelectedUserExists = data.find(user => user.data.userID === userProfile.userID) ?? false;
			const currentUserRef = ref(database, "/friends/" + isCurrentUserExists.key);
			const selectedUserRef = ref(database, "/friends/" + isSelectedUserExists.key);

			if (isCurrentUserExists && isSelectedUserExists) {
				set(currentUserRef, {
					userID: isCurrentUserExists.data.userID,
					info: {
						name: isCurrentUserExists.data.info.name,
						email: isCurrentUserExists.data.info.email,
						avatar: isCurrentUserExists.data.info.avatar,
					},
					friends: isCurrentUserExists.data.friends ? [...isCurrentUserExists.data.friends, userProfile] : [userProfile],
				}).then(() => {
					set(selectedUserRef, {
						userID: isSelectedUserExists.data.userID,
						info: {
							name: isSelectedUserExists.data.info.name,
							email: isSelectedUserExists.data.info.email,
							avatar: isSelectedUserExists.data.info.avatar,
						},
						friends: isSelectedUserExists.data.friends ? [...isSelectedUserExists.data.friends, currentUser] : [currentUser],
					})
				}).then(() => {
					checkIfFriendExistsInCollection(friendsListRef, userProfile, currentUser).then(data => setIsFriendFromCollection(data));
					getFriendsFromDatabase(friendsListRef, isMyFriendsList ? currentUser.userID : profile.key, isMyFriendsList).then((data) => {
						data.map((friend) => {
							handleAddFriend(friend);
						})
					});
				});
			} else if (isCurrentUserExists && !isSelectedUserExists) {
				set(currentUserRef, {
					userID: isCurrentUserExists.data.userID,
					info: {
						name: isCurrentUserExists.data.info.name,
						email: isCurrentUserExists.data.info.email,
						avatar: isCurrentUserExists.data.info.avatar,
					},
					friends: isCurrentUserExists.data.friends ? [...isCurrentUserExists.data.friends, userProfile] : [userProfile],
				}).then(() => {
					set(newUserPostRef, {
						userID: userProfile.userID,
						info: {
							name: userProfile.name,
							email: userProfile.email,
							avatar: userProfile.avatar,
						},
						friends: [currentUser],
					})
				}).then(() => {
					checkIfFriendExistsInCollection(friendsListRef, userProfile, currentUser).then(data => setIsFriendFromCollection(data));
					getFriendsFromDatabase(friendsListRef, isMyFriendsList ? currentUser.userID : profile.key, isMyFriendsList).then((data) => {
						data.map((friend) => {
							handleAddFriend(friend);
						})
					});
				});
			} else if (!isCurrentUserExists && isSelectedUserExists) {
				set(newUserPostRef, {
					userID: currentUser.userID,
					info: {
						name: currentUser.name,
						email: currentUser.email,
						avatar: currentUser.avatar,
					},
					friends: [userProfile],
				}).then(() => {
					set(selectedUserRef, {
						userID: isSelectedUserExists.data.userID,
						info: {
							name: isSelectedUserExists.data.info.name,
							email: isSelectedUserExists.data.info.email,
							avatar: isSelectedUserExists.data.info.avatar,
						},
						friends: isSelectedUserExists.data.friends ? [...isSelectedUserExists.data.friends, currentUser] : [currentUser],
					})
				}).then(() => {
					checkIfFriendExistsInCollection(friendsListRef, userProfile, currentUser).then(data => setIsFriendFromCollection(data));
					getFriendsFromDatabase(friendsListRef, isMyFriendsList ? currentUser.userID : profile.key, isMyFriendsList).then((data) => {
						data.map((friend) => {
							handleAddFriend(friend);
						})
					});
				});
			} else {
				set(currentUserPostRef, {
					userID: currentUser.userID,
					info: {
						name: currentUser.name,
						email: currentUser.email,
						avatar: currentUser.avatar,
					},
					friends: [userProfile],
				}).then(() => {
					set(selectedUserPostRef, {
						userID: userProfile.userID,
						info: {
							name: userProfile.name,
							email: userProfile.email,
							avatar: userProfile.avatar,
						},
						friends: [currentUser],
					})
				}).then(() => {
					checkIfFriendExistsInCollection(friendsListRef, userProfile, currentUser).then(data => setIsFriendFromCollection(data));
					getFriendsFromDatabase(friendsListRef, isMyFriendsList ? currentUser.userID : profile.key, isMyFriendsList).then((data) => {
						data.map((friend) => {
							handleAddFriend(friend);
						})
					});
				});
			}
		})
	}

	const handleUpdateProfilePage = () => {
		getCurrentUserFromDatabase(currentUser.userID).then((updatedProfile) => {
			setUserProfile({
				userID: updatedProfile.data.userID,
				name: updatedProfile.data.name,
				email: updatedProfile.data.email,
				avatar: updatedProfile.data.avatar,
				country: updatedProfile.data.country,
				dateOfBirth: updatedProfile.data.dateOfBirth,
				biography: updatedProfile.data.biography,
			});
		});
	}

	const handleRemoveFriendFromCollection = () => {
		removeUserFromFriends(friendsListRef, userProfile, currentUser, handleRemoveFriend, setIsFriendFromCollection);
	}

	const collectionButtonOnClickFunction = isFriendFromCollection ? handleRemoveFriendFromCollection : addUserToFriends;

	const setNewAvatarFunction = (newAvatar) => {

		onValue(usersListRef, (snapshot) => {
			snapshot.forEach((childSnapshot) => {

				const userFromDatabase = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (userFromDatabase.key === currentUser.userID) {

					const userRef = ref(database, "/users/" + userFromDatabase.key);

					set(userRef, {
						userID: userFromDatabase.data.userID,
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
								<UserIcon isProfile={true} profileImageSrc={temporaryProfileImage} profileLink={profile.key} />
								{
									isEditState && <ImageInput setImagePreview={setTemporaryProfileImage} setNewImageFunction={setNewAvatarFunction} />
								}
							</div>
							<div className="profile__text-wrap">
								<div className="profile__user-name-wrap">
									<Title className="profile__user-name" title={userProfile.name} />
									{
										isShowEditButton && <Button className="profile__edit" buttonOnClickFunction={() => {setIsEditState(true)}}>Edit profile</Button>
									}
								</div>
								{
									isEditState ? <EditProfileForm handleUpdateProfilePage={handleUpdateProfilePage} setTemporaryProfileImage={setTemporaryProfileImage} updatedProfileImage={temporaryProfileImage} userInfo={userProfile} setIsEditState={setIsEditState} /> : (
										<>
											<div className="profile__details-wrap">
												<div className="profile__details profile__details--email">
													<EmailIcon />
													<p className="profile__details-text">Email: <span className="profile__details-bold">{userProfile.email}</span></p>
												</div>
												<div className="profile__details profile__details--date-of-birth">
													<CalendarIcon />
													<p className="profile__details-text">Date of birth: <span className="profile__details-bold">{userProfile.dateOfBirth}</span></p>
												</div>
												<div className="profile__details profile__details--country">
													<FlagIcon />
													<p className="profile__details-text">Country: <span className="profile__details-bold">{userProfile.country}</span></p>
												</div>
											</div>
											<div className="profile__friends-list">
												<h3 className="profile__friends-list-title">Friends:</h3>
												<Button buttonOnClickFunction={() => {handleOpenFriendsPopup()}}>
													<FriendsList isShortFriendsList={true} isMyFriendsList={isMyFriendsList} userID={profile.key} />
												</Button>
											</div>
											<h3 className="profile__biography">Additional information:</h3>
											<p className="profile__biography-text">{userProfile.biography}</p>
											{
												isShowAddToFriendsButton && <CollectionButton className="profile__add-to-friends" isExistsInCollection={isFriendFromCollection} collectionButtonOnClickFunction={collectionButtonOnClickFunction}>{isFriendFromCollection ? 'Remove from friends' : 'Add to friends'}</CollectionButton>
											}
										</>
									)
								}
							</div>
							<FriendsPopup isShortFriendsList={false} isShowModal={isShowFriendsModal} setIsShowModal={setIsShowFriendsModal} setIsFriendFromCollection={setIsFriendFromCollection} isMyFriendsList={profile.key === currentUser.userID} userID={profile.key} />
						</div>
					</div>
				) : <Loader>Loading profile</Loader>
			}
		</>
	)
}

const mapStateToProps = state => ({
	profile: state.profile.profile,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleClearProfilePage: () => dispatch(clearProfilePage()),
		handleClearFriends: () => dispatch(clearFriends()),
		handleAddFriend: (user) => dispatch(addToFriends(user)),
		handleRemoveFriend: (key) => dispatch(removeFromFriends(key))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);