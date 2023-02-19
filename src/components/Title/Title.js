import React from "react";
import classNames from "classnames";

const Title = (props) => {

	const { className, title } = props;

	return (
		<h1 className={classNames(className, "title")}>{title}</h1>
	)
}

export default Title;