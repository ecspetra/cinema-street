import React, { useRef, useEffect, useState } from "react";
import Input from "../Input/Input";
import Calendar from "react-calendar";
import classNames from "classnames";
import moment from "moment";
import Button from "../Button/Button";
import 'react-calendar/dist/Calendar.css';
import './assets/index.scss';
import CloseIcon from "../App/assets/icons/CloseIcon";

const CalendarInput = (props) => {

	const { className, inputDefaultValue, handleSetDateInputValue } = props;

	const dateInputRef = useRef();
	const [isShowCalendar, setIsShowCalendar] = useState(false);
	const [dateValue, setDateValue] = useState();
	const [isShowClearButton, setIsShowClearButton] = useState(false);

	const handleIsShowCalendar = () => {
		setIsShowCalendar(true);
	}

	const handleClearDate = (event) => {
		event.stopPropagation();
		handleSetDateInputValue('Unset');
		dateInputRef.current.value = 'Unset';
		setIsShowClearButton(false);
	}

	useEffect(() => {
		if (dateValue === undefined) {
			dateInputRef.current.value = inputDefaultValue;
		} else {
			dateInputRef.current.value = moment(dateValue).format("M.D.Y");
			setIsShowClearButton(moment(dateValue).format("M.D.Y"));
		}
		handleSetDateInputValue(moment(dateValue).format("M.D.Y"));
	}, [dateValue]);

	return (
		<div className={classNames('calendar-input', className)}>
			<label className="calendar-input__label" htmlFor="date-of-birth">Enter your date of birth</label>
			<div className="calendar-input__calendar-wrap" onClick={() => {handleIsShowCalendar()}} onMouseLeave={() => {setIsShowCalendar(false)}}>
				<Input inputRef={dateInputRef} id="date-of-birth" isValid={true} isDisabled={true} defaultValue={inputDefaultValue} />
				{
					isShowClearButton && <Button isEventNeeded={true} className="calendar-input__clear-button" buttonOnClickFunction={(event) => handleClearDate(event)}><CloseIcon /></Button>
				}
				{
					isShowCalendar && <Calendar onChange={setDateValue} value={dateValue} maxDate={new Date()} />
				}
			</div>
		</div>
	)
}

export default CalendarInput;