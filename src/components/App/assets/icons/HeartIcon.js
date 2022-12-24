import React, { useState } from "react"

const HeartIcon = (props) => {

	const [isHovered, setIsHovered] = useState(false);

	const handleHoverIcon = () => {
		setIsHovered(true);
	}

	const handleUnhoverIcon = () => {
		setIsHovered(false);
	}

	return (
		<span className="heart-icon" onMouseEnter={() => {handleHoverIcon()}} onMouseLeave={() => {handleUnhoverIcon()}}>
			{
				isHovered ?
					(<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						shapeRendering="geometricPrecision"
						textRendering="geometricPrecision"
						{...props}
					>
						<path d="M11.998 21a1 1 0 0 1-.707-.294l-7.766-7.78a5.243 5.243 0 0 1 0-7.4 5.233 5.233 0 0 1 7.39 0l1.083 1.088 1.085-1.085a5.232 5.232 0 0 1 7.39 0 5.244 5.244 0 0 1 0 7.4l-7.765 7.778a1 1 0 0 1-.71.293ZM7.22 6a3.2 3.2 0 0 0-2.28.941 3.241 3.241 0 0 0 0 4.573l7.058 7.071 7.061-7.071a3.229 3.229 0 0 0-4.56-4.573l-1.79 1.795a1.027 1.027 0 0 1-1.417 0L9.498 6.94A3.2 3.2 0 0 0 7.22 6Z" />
					</svg>) : (<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						shapeRendering="geometricPrecision"
						textRendering="geometricPrecision"
						{...props}
					>
						<path d="M11.998 21a1 1 0 0 1-.707-.294l-7.766-7.78a5.243 5.243 0 0 1 0-7.4 5.233 5.233 0 0 1 7.39 0l1.083 1.088 1.085-1.085a5.232 5.232 0 0 1 7.39 0 5.244 5.244 0 0 1 0 7.4l-7.765 7.778a1 1 0 0 1-.71.293ZM7.22 6a3.2 3.2 0 0 0-2.28.941 3.241 3.241 0 0 0 0 4.573l7.058 7.071 7.061-7.071a3.229 3.229 0 0 0-4.56-4.573l-1.79 1.795a1.027 1.027 0 0 1-1.417 0L9.498 6.94A3.2 3.2 0 0 0 7.22 6Z" />
						<path d="M12 7.996q3.938-5.486 8.008-1.382T12 19.804Q.328 10.51 3.525 6.614 7.22 2.112 12 7.996Z" />
					</svg>)
			}
		</span>
	);
}

export default HeartIcon;
