import React from 'react';
import default_user_icon from "../App/assets/icons/default-user.svg";

const Backdrops = (props) => {

	const addDefaultSrc = (event) => {
		event.target.src = default_user_icon;
	}

	return (
		<img className="backdrops" onError={addDefaultSrc} src={'https://image.tmdb.org/t/p/w440_and_h660_face' + props.backdrops.file_path} alt="backdrops" />
	)
}

export default Backdrops;