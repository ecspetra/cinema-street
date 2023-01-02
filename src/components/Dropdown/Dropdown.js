import React, { useState } from "react";
import './assets/index.scss';
import DropdownIcon from "../App/assets/icons/DropdownIcon";

const Dropdown = ({ children }) => {

	const [isDropdownOpened, setIsDropdownOpened] = useState(false);

	const handleToggleDropdown = () => {
		setIsDropdownOpened(prevState => !prevState);
	}

	return (
		<div className="dropdown" onMouseLeave={() => {setIsDropdownOpened(false)}}>
			<button className="dropdown__button" onClick={() => {handleToggleDropdown()}}><DropdownIcon /></button>
			{
				isDropdownOpened && (<div className="dropdown__list">
					<div onClick={() => {handleToggleDropdown()}}>{children}</div>
				</div>)
			}
		</div>
	)

}

export default Dropdown;