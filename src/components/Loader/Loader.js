import React from "react";
import LoaderIcon from "../App/assets/icons/LoaderIcon";
import './assets/index.scss';

const Loader = (props) => {

	const { children } = props;

	return (
		<span className="loader">
			<LoaderIcon />
			{children && <span className="loader__text">{children}</span>}
		</span>
	)
}

export default Loader;