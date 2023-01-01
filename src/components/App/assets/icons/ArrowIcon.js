import React from "react";
import classNames from "classnames";

const ArrowIcon = (props) => {

	const { className, ...rest } = props;

	return (
		<svg className={classNames(className, 'arrow-icon')} xmlns="http://www.w3.org/2000/svg" width={12} height={7} viewBox="0 0 12 7" {...rest}>
			<g fill="none" fillRule="evenodd">
				<path d="M-6-9h24v24H-6z" />
				<path
					className="arrow-icon__path"
					fill="#fff"
					d="M2.12.29 6 4.17 9.88.29a.996.996 0 1 1 1.41 1.41L6.7 6.29a.996.996 0 0 1-1.41 0L.7 1.7A.996.996 0 0 1 .7.29c.39-.38 1.03-.39 1.42 0Z"
				/>
			</g>
		</svg>
	)
}

export default ArrowIcon;
