import React from "react";

const Profile = (props) => {

	return (
		<div className="profile">
			<h1>My Profile</h1>
			<p>{props.user && props.user.email}</p>
		</div>
	)
}

export default Profile;