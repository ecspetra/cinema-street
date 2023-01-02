import React from "react";
import classNames from "classnames";
import './assets/index.scss';

const Button = (props) => {

	const { children, buttonOnClickFunction, className, context } = props;

	const buttonClassNames = classNames('main-button', className, {
		'main-button--filled': context === 'filled',
		'main-button--remove': context === 'remove',
		'main-button--cancel': context === 'cancel',
	})

	return (
		<button className={buttonClassNames} onClick={() => {buttonOnClickFunction()}}>{children}</button>
	)
}

export default Button;