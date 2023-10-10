import { FC } from 'react'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

type PropsType = {
	className?: string
	isShowText?: boolean
	type?: 'absolute' | 'static'
}

const Loader: FC<PropsType> = ({
	className,
	isShowText = false,
	type = 'absolute',
}) => {
	return (
		<span
			className={classNames(
				'w-full h-full flex justify-center items-center',
				type === 'absolute' &&
					'absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900',
				className
			)}
		>
			{isShowText && <span className='mr-2'>Loading</span>}
			<FontAwesomeIcon
				className='w-4 h-4 animate-spin'
				icon={faCircleNotch}
			/>
		</span>
	)
}

export default Loader
