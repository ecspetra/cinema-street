import React, { useEffect, useContext, useRef, useState } from 'react';
import { addToFriends, removeFromFriends } from "../../actions";
import {connect} from "react-redux";
import UserContext from "../UserContext/UserContext";
import { getDatabase, ref } from "firebase/database";
import { fillFriendsList, getFriendsFromDatabase } from "../../functions/getFriendsFromDatabase";
import Friend from "../Friend/Friend";
import './assets/index.scss';
import {removeUserFromFriends} from "../../functions/removeFriendFromCollection";
import Button from "../Button/Button";

const FriendsList = (props) => {

	const { friends, isShortFriendsList, isMyFriendsList, handleAddFriend, handleRemoveFriend, userID, setIsFriendFromCollection } = props;

	const { currentUser } = useContext(UserContext);

	const [isFriendsListLoaded, setIsFriendsListLoaded] = useState(true);
	const [friendsList, setFriendsList] = useState([]);

	const database = getDatabase();
	const friendsListRef = ref(database, 'friends');

	useEffect(() => {
		getFriendsFromDatabase(friendsListRef, isMyFriendsList ? currentUser.uid : userID, isMyFriendsList).then((data) => {
			data.map((friend) => {
				handleAddFriend(friend);
			})
		}).then(() => {
			setIsFriendsListLoaded(true);
		})
	}, []);

	useEffect(() => {
		setFriendsList(...Object.values(friends));
	}, [friends]);

	return (
		<div className="friends-list">
			{
				friendsList && friendsList.map((user, index) => {
					return (
						<div className="friends-list__friend" key={index}>
							<Friend isMyFriend={isMyFriendsList} isShortFriendsList={isShortFriendsList} user={user} />
							{
								!isShortFriendsList && <Button buttonOnClickFunction={() => removeUserFromFriends(friendsListRef, user, currentUser.uid, handleRemoveFriend, setIsFriendFromCollection)}>Remove</Button>
							}
						</div>
					)
				})
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