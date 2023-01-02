import React from "react";
import './assets/index.scss';

const InfoText = (props) => {

	const { children } = props;

	return (
		<p className="info-text">{children}</p>
	)
}

export default InfoText;