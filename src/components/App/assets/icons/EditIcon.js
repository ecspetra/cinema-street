import * as React from "react";
import classNames from "classnames";

const EditIcon = (props) => {

	const { className, ...rest } = props;

	return (
		<svg
			className={classNames(className)}
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			xmlSpace="preserve"
			{...props}
		>
			<path
				fillRule="evenodd"
				d="M14 2a1 1 0 0 1 .707.293l5 5A1 1 0 0 1 20 8v1a1 1 0 0 1-1 1h-6a1 1 0 0 1-.993-.883L12 9l-.001-5H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 1 0 2H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h7Zm3.293 10.293a1 1 0 0 1 1.32-.083l.094.083 3 3a1 1 0 0 1 .083 1.32l-.083.094-5 5a1 1 0 0 1-.576.284L16 22h-3a1 1 0 0 1-.993-.883L12 21v-3a1 1 0 0 1 .206-.608l.087-.1 5-5ZM18 14.414l-4 4V20h1.586l4-4L18 14.414Zm-4.001-10L14 8h3.586l-3.587-3.586Z"
			/>
		</svg>
	)
}

export default EditIcon;
