import React from "react";
import './assets/index.scss';

const Genre = (props) => {

	const { children } = props;

	return (
		<span className="genre">{children}</span>
	)
}

export default Genre;