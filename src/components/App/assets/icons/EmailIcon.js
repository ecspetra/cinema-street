import React from "react";
import classNames from "classnames";

const EmailIcon = (props) => {

	const { className, ...rest } = props;

	return (
		<svg className={classNames(className, 'email-icon')} xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" {...rest}>
			<g fill="none" fillRule="evenodd">
				<path d="M-2-2h24v24H-2z" />
				<path
					d="M10.72.03A9.991 9.991 0 0 0 .03 10.72C.39 16.01 5.01 20 10.31 20H14c.55 0 1-.45 1-1s-.45-1-1-1h-3.67c-3.73 0-7.15-2.42-8.08-6.03C.76 6.17 6.16.76 11.96 2.26 15.58 3.18 18 6.6 18 10.33v1.1c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.25c0-2.51-1.78-4.77-4.26-5.12a5.008 5.008 0 0 0-5.66 5.87 4.996 4.996 0 0 0 3.72 3.94c1.84.43 3.59-.16 4.74-1.33.89 1.22 2.67 1.86 4.3 1.21 1.34-.53 2.16-1.9 2.16-3.34v-1.09C20 5.01 16.01.39 10.72.03ZM10 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3Z"
					fill="#a7a2b4"
				/>
			</g>
		</svg>
	)
}

export default EmailIcon;
