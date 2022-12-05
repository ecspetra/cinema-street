import React from "react";

const DropdownOption = (props) => {

	const { onClickAction, children } = props;

	return (
		<button className="dropdown-option" onClick={onClickAction}>{children}</button>
	)

}

export default DropdownOption;