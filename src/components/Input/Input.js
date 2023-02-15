import React, { useEffect } from "react";
import classNames from "classnames";
import './assets/index.scss';
import Error from "../Error/Error";

const Input = (props) => {

	const { onChangeFunction, isValid, errorText, className, inputRef, isInFocus, isDisabled = false, id, type = "text", defaultValue = undefined } = props;

	useEffect(() => {
		if (isInFocus === true) {
			inputRef.current.focus();
		}
	}, [isInFocus]);

	const inputClassNames = classNames('input', {
		'input--error': !isValid,
	});

	return (
		<>
			{
				type === "file" ? (
					<input id={id} type="file" accept="image/*" disabled={isDisabled} onChange={(event) => {onChangeFunction(event)}} className={classNames(inputClassNames, className)} />
				) : (
					<>
						<input ref={inputRef} id={id} type={type} disabled={isDisabled} defaultValue={defaultValue} onChange={onChangeFunction ? () => {onChangeFunction()} : null} className={classNames(inputClassNames, className)} />
						{
							!isValid && <Error>{errorText}</Error>
						}
					</>
				)
			}
		</>
	)
}

export default Input;