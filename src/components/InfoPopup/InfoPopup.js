import React from "react";
import InfoIcon from "../App/assets/icons/InfoIcon";
import classNames from "classnames";

const InfoPopup = (props) => {

	const { title, className } = props;

	return (
		<div onClick={(event) => {event.stopPropagation()}} className={classNames('info-popup', className)}>
			<InfoIcon />
			<p className="info-popup__title">{title}</p>
		</div>
	);
}

export default InfoPopup;