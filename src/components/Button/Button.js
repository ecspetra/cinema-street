import React from "react";
import classNames from "classnames";
import './assets/index.scss';

const Button = (props) => {

	const { children, buttonOnClickFunction, className, context, buttonType = "button", isEventNeeded = false } = props;

	const buttonClassNames = classNames('main-button', className, {
		'main-button--filled': context === 'filled',
		'main-button--remove': context === 'remove',
		'main-button--cancel': context === 'cancel',
	});

	return (
		<>
			{
				buttonType === "button" ? (
					<button type={buttonType} className={buttonClassNames} onClick={isEventNeeded ? (event) => buttonOnClickFunction(event) : () => buttonOnClickFunction()}>{children}</button>
				) : (
					<button type={buttonType} className={buttonClassNames}>{children}</button>
				)
			}
		</>
	)
}

export default Button;