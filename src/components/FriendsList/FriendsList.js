import React, { useEffect, useContext, useState } from 'react';
import { addToFriends, removeFromFriends } from "../../actions";
import { connect } from "react-redux";
import UserContext from "../UserContext/UserContext";
import { getDatabase, ref } from "firebase/database";
import { getFriendsFromDatabase } from "../../functions/getFriendsFromDatabase";
import Friend from "../Friend/Friend";
import './assets/index.scss';
import {removeUserFromFriends} from "../../functions/removeFriendFromCollection";
import Button from "../Button/Button";
import InfoText from "../InfoText/InfoText";

const FriendsList = (props) => {

	const { friends, state, isShortFriendsList, isMyFriendsList, handleAddFriend, handleRemoveFriend, userID, setIsFriendFromCollection } = props;

	const { currentUser } = useContext(UserContext);

	const [friendsList, setFriendsList] = useState([]);

	const database = getDatabase();
	const friendsListRef = ref(database, 'friends');

	useEffect(() => {
		getFriendsFromDatabase(friendsListRef, isMyFriendsList ? currentUser.userID : userID, isMyFriendsList).then((data) => {
			data.map((friend) => {
				handleAddFriend(friend);
			})
		})
	}, []);

	useEffect(() => {
		setFriendsList(...Object.values(friends));
	}, [friends]);

	return (
		<div className="friends-list">
			{
				friendsList.length ? friendsList.map((user, index) => {
					return (
						<div className="friends-list__friend" key={index}>
							<Friend isMyFriend={isMyFriendsList} isShortFriendsList={isShortFriendsList} user={user} />
							{
								!isShortFriendsList && <Button buttonOnClickFunction={() => removeUserFromFriends(friendsListRef, user, currentUser, handleRemoveFriend, setIsFriendFromCollection)}>Remove</Button>
							}
						</div>
					)
				}) : <InfoText>No friends yet</InfoText>
			}
			{
				isShortFriendsList && friendsList.length !== 0 && <span className="friends-list__friends-list-button-text">Show friends</span>
			}
		</div>
	)
}

const mapStateToProps = state => ({
	friends: state.friends,
})

const mapDispatchToProps = (dispatch) => {
	return {
		handleAddFriend: (user) => dispatch(addToFriends(user)),
		handleRemoveFriend: (key) => dispatch(removeFromFriends(key))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);