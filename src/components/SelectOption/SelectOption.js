import React from "react";

const SelectOption = (props) => {

	const { children, onClickAction, setCurrentOptionName } = props;

	const getCurrentOption = (children) => {
		const currentOptionValue = children;
		onClickAction();
		setCurrentOptionName(currentOptionValue);
	}

	return (
		<button className="select-option" onClick={() => {getCurrentOption(children)}}>{children}</button>
	)
}

export default SelectOption;