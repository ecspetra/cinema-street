import React from "react";

const Error = (props) => {

	const { children } = props;

	return (
		<p className="error">{children}</p>
	)
}

export default Error;