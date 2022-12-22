import React from "react";

const InfoText = (props) => {

	const { children } = props;

	return (
		<p className="info-text">{children}</p>
	)
}

export default InfoText;