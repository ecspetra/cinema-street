import React from "react";
import InfoIcon from "../App/assets/icons/InfoIcon";

const InfoPopup = (props) => {

	const { title } = props;

	return (
		<div onClick={(event) => {event.stopPropagation()}} className="info-popup">
			<InfoIcon />
			<p className="info-popup__title">{title}</p>
		</div>
	);
}

export default InfoPopup;