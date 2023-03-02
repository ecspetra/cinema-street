import React from "react";
import UserIcon from "../UserIcon/UserIcon";
import './assets/index.scss';

const Friend = (props) => {

	const { user, isMyFriend, isShortFriendsList = false } = props;

	// const userAvatar = isMyFriend ? user.avatar : user.data.info.avatar;
	// const userProfile = isMyFriend ? user.userID : user.data.userID;
	// const userName = isMyFriend ? user.name : user.data.info.name;

	const userAvatar = user.avatar;
	const userProfile = user.userID;
	const userName = user.name;

	return (
		<div className="friend">
			<UserIcon profileImageSrc={userAvatar} profileLink={userProfile} />
			{
				isShortFriendsList === false && <p className="friend__name">{userName}</p>
			}
		</div>
	)
}

export default Friend;