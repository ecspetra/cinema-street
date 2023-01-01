import React from "react";

const Button = (props) => {

	const { children, buttonOnClickFunction, className } = props;

	return (
		<button className={className} onClick={() => {buttonOnClickFunction()}}>{children}</button>
	)
}

export default Button;