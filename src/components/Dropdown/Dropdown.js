import React, { useState } from "react";

const Dropdown = () => {

	const [isDropdownOpened, setIsDropdownOpened] = useState(false);

	const handleToggleDropdown = () => {
		setIsDropdownOpened(prevState => !prevState);
	}

	return (
		<div className="dropdown" onMouseLeave={() => {setIsDropdownOpened(false)}}>
			<button className="dropdown__button" onClick={() => {handleToggleDropdown()}}>Dropdown</button>
			{
				isDropdownOpened && <div className="dropdown-list">Option</div>
			}
		</div>
	)

}

export default Dropdown;