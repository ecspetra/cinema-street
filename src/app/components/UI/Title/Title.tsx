import { FC } from 'react'
import classNames from 'classnames'

type PropsType = {
	children: string | JSX.Element[]
	variant?: 'h1' | 'h2' | 'h3'
	className?: string
}

const Title: FC<PropsType> = ({ variant = 'h1', children, className }) => {
	return variant === 'h1' ? (
		<h1
			className={classNames(
				'text-4xl font-bold leading-tight mb-4',
				className
			)}
		>
			{children}
		</h1>
	) : variant === 'h2' ? (
		<h2
			className={classNames(
				'text-2xl font-light leading-tight mb-2',
				className
			)}
		>
			{children}
		</h2>
	) : (
		<h3
			className={classNames(
				'text-lg font-semibold leading-tight mb-2',
				className
			)}
		>
			{children}
		</h3>
	)
}

export default Title
