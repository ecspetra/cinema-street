import React from "react";

const GenderIcon = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" className="gender-icon" width={20} height={14} viewBox="0 0 20 14" {...props}>
		<g fill="none" fillRule="evenodd">
			<path d="M-2-5h24v24H-2z" />
			<path
				d="M7 7c1.93 0 3.5-1.57 3.5-3.5S8.93 0 7 0 3.5 1.57 3.5 3.5 5.07 7 7 7Zm0-5c.83 0 1.5.67 1.5 1.5S7.83 5 7 5s-1.5-.67-1.5-1.5S6.17 2 7 2Zm0 6.75c-2.34 0-7 1.17-7 3.5V13c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-.75c0-2.33-4.66-3.5-7-3.5ZM2.34 12c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H2.34Zm11.7-3.19c1.16.84 1.96 1.96 1.96 3.44V14h3c.55 0 1-.45 1-1v-.75c0-2.02-3.5-3.17-5.96-3.44ZM13 7c1.93 0 3.5-1.57 3.5-3.5S14.93 0 13 0c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35Z"
				fill="#a7a2b4"
			/>
		</g>
	</svg>
)

export default GenderIcon;
