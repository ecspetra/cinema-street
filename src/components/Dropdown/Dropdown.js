import React, { useState } from "react";

const Dropdown = ({ children }) => {

	const [isDropdownOpened, setIsDropdownOpened] = useState(false);

	const handleToggleDropdown = () => {
		setIsDropdownOpened(prevState => !prevState);
	}

	return (
		<div className="dropdown" onMouseLeave={() => {setIsDropdownOpened(false)}}>
			<button className="dropdown__button" onClick={() => {handleToggleDropdown()}} />
			{
				isDropdownOpened && (<div className="dropdown__list">
					<div onClick={() => {handleToggleDropdown()}}>{children}</div>
				</div>)
			}
		</div>
	)

}

export default Dropdown;