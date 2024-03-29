import { FC, ReactNode } from 'react'
import classNames from 'classnames'

type PropsType = {
	children: ReactNode
	variant?: 'h1' | 'h2' | 'h3'
	className?: string
}

const Title: FC<PropsType> = ({ variant = 'h1', children, className }) => {
	return variant === 'h1' ? (
		<h1
			className={classNames(
				'break-words relative text-2xl md:text-4xl font-bold leading-tight mb-4 after:w-16 after:absolute after:bottom-0 after:left-0 after:h-1 after:bg-rose-600 pb-4',
				className
			)}
		>
			{children}
		</h1>
	) : variant === 'h2' ? (
		<h2
			className={classNames(
				'break-words relative text-xl md:text-4xl font-light leading-tight mb-2',
				className
			)}
		>
			{children}
		</h2>
	) : (
		<h3
			className={classNames(
				'break-words relative text-lg font-semibold leading-tight mb-2',
				className
			)}
		>
			{children}
		</h3>
	)
}

export default Title
