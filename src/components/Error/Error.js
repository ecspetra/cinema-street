import React from "react";
import './assets/index.scss';

const Error = (props) => {

	const { children } = props;

	return (
		<p className="error">{children}</p>
	)
}

export default Error;