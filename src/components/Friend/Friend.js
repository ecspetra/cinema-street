import React from "react";
import UserIcon from "../UserIcon/UserIcon";
import './assets/index.scss';

const Friend = (props) => {

	const { user, isMyFriend, isShortFriendsList } = props;

	const userAvatar = isMyFriend ? user.data.avatar : user.data.info.avatar;
	const userProfile = isMyFriend ? user.key : user.data.userID;
	const userName = isMyFriend ? user.data.name : user.data.info.name;

	return (
		<div className="friend">
			<UserIcon profileImageSrc={userAvatar} profileLink={userProfile} />
			{
				!isShortFriendsList && <p className="friend__name">{userName}</p>
			}
		</div>
	)
}

export default Friend;