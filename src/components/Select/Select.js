import React, { useState } from "react";
import classNames from "classnames";
import ArrowIcon from "../App/assets/icons/ArrowIcon";
import './assets/index.scss';

const Select = (props) => {

	const { children, className } = props;

	const initialCurrentOptionValue = React.Children.map(children, (child, index) => {
		if (index === 0) {
			return child.props.children;
		}
	});
	const [isSelectOpened, setIsSelectOpened] = useState(false);
	const [currentOption, setCurrentOption] = useState(initialCurrentOptionValue);

	const handleToggleSelect = (event) => {
		event.preventDefault();
		setIsSelectOpened(prevState => !prevState);
	}

	const setCurrentOptionName = (currentOptionValue) => {
		setCurrentOption(currentOptionValue);
	}

	const childrenWithProps = React.Children.map(children, (child) => {
		return React.cloneElement(child, {setCurrentOptionName: setCurrentOptionName});
	});

	return (
		<div className={classNames(className, 'select')} onMouseLeave={() => {setIsSelectOpened(false)}}>
			<button className="select__button" onClick={(event) => {handleToggleSelect(event)}}>
				{currentOption}
				<ArrowIcon />
			</button>
			{
				isSelectOpened && (<div className="select__list">
					<div onClick={(event) => {handleToggleSelect(event)}}>{childrenWithProps}</div>
				</div>)
			}
		</div>
	)
}

export default Select;