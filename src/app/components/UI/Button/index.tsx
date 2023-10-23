import React, { FC } from 'react'
import classNames from 'classnames'

type PropsType = {
	onClick?: React.MouseEventHandler
	onMouseEnter?: React.MouseEventHandler
	onMouseLeave?: React.MouseEventHandler
	children?: string | JSX.Element | JSX.Element[]
	context?:
		| 'filled'
		| 'filledDark'
		| 'empty'
		| 'collection'
		| 'image'
		| 'icon-text'
		| 'icon'
		| 'text'
	className?: string
	type?: 'submit' | 'reset' | 'button'
}

const Button: FC<PropsType> = ({
	onClick,
	onMouseEnter,
	onMouseLeave,
	children,
	context = 'filled',
	className,
	type = 'button',
}) => {
	const filledButtonClassNames =
		'w-72 min-h-[48px] bg-red-600 border-2 border-transparent rounded-md hover:bg-amber-400 hover:text-black font-semibold p-3 flex justify-center items-center'
	const filledDarkButtonClassNames =
		'w-72 min-h-[48px] bg-gray-700 rounded-md hover:bg-gray-600 font-semibold p-3 flex justify-center items-center'
	const emptyButtonClassNames =
		'w-72 border-2 border-red-600 text-red-600 rounded-md hover:border-transparent hover:w-full hover:text-amber-400 font-semibold p-3 flex justify-center items-center'
	const collectionButtonClassNames =
		'w-72 min-h-[48px] border-2 border-red-600 text-red-600 rounded-md hover:border-amber-400 hover:text-amber-400 font-semibold p-3 flex justify-center items-center'
	const imageButtonClassNames = 'flex justify-center items-center'
	const textButtonClassNames =
		'inline-flex text-red-500 border-b border-red-500 font-semibold hover:text-amber-400 hover:border-transparent'
	const iconTextButtonClassNames =
		'rounded-md p-2 bg-gray-600/50 font-semibold text-sm hover:bg-amber-900/50 hover:text-amber-400 flex justify-start items-center'
	const iconButtonClassNames =
		'w-11 h-11 flex justify-center items-center bg-gray-700 hover:bg-gray-600 rounded-md z-50'

	const getButtonClassNames = () => {
		switch (context) {
			case 'filled':
				return filledButtonClassNames
			case 'filledDark':
				return filledDarkButtonClassNames
			case 'empty':
				return emptyButtonClassNames
			case 'collection':
				return collectionButtonClassNames
			case 'image':
				return imageButtonClassNames
			case 'text':
				return textButtonClassNames
			case 'icon-text':
				return iconTextButtonClassNames
			case 'icon':
				return iconButtonClassNames
		}
	}

	const handleOnClick = event => {
		if (type !== 'submit') {
			event.preventDefault()
			if (onClick) onClick(event)
		}
	}

	return (
		<button
			type={type}
			className={classNames(
				'duration-300 relative leading-none',
				className,
				getButtonClassNames()
			)}
			onClick={event => {
				handleOnClick(event)
			}}
			onMouseEnter={onMouseEnter && onMouseEnter}
			onMouseLeave={onMouseLeave && onMouseLeave}
		>
			{children}
		</button>
	)
}

export default Button
