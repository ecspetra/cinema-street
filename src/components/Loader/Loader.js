import React from "react";

const Loader = (props) => {

	const { children } = props;

	return (
		<span className="loader">
			<span className="loader__icon" />
			{children && <span className="loader__text">{children}</span>}
		</span>
	)
}

export default Loader;