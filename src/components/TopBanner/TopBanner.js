import React from "react";
import classNames from "classnames";
import { useLocation } from "react-router";

const TopBanner = () => {

	const location = useLocation();

	const topBannerClassNames = classNames('top-banner', {
		'top-banner--actors': location.pathname === '/actors',
		'top-banner--genres': location.pathname === '/genres',
		'top-banner--profile': location.pathname === '/profile',
	})

	return (
		<div className={topBannerClassNames}>
			<div className="top-banner__title-wrapper">
				<span className="top-banner__title">Cinema<span className="top-banner__accent">field</span></span>
			</div>
		</div>
	)
}

export default TopBanner;