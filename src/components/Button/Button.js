import React from "react";

const Button = (props) => {

	const { children, buttonOnClickFunction, className } = props;

	const handleButtonOnClick = async () => {
		buttonOnClickFunction();
	}

	return (
		<button className={className} onClick={() => {handleButtonOnClick()}}>{children}</button>
	)
}

export default Button;