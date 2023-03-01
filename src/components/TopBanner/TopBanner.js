import React from "react";
import LogoIcon from "../App/assets/icons/Logo";
import './assets/index.scss';

const TopBanner = () => {

	return (
		<div className="top-banner">
			<div className="top-banner__title-wrapper">
				<span className="top-banner__title">Cinema<LogoIcon className="top-banner__logo-icon" /><span className="top-banner__accent">street</span></span>
			</div>
		</div>
	)
}

export default TopBanner;