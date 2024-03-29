import { FC, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'

type PropsType = {
	children: ReactNode
}

const PageLoader: FC<PropsType> = ({ children }) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		const handleRouteChangeStart = () => {
			setIsLoading(true)
		}

		const handleRouteChangeComplete = () => {
			setIsLoading(false)
		}

		router.events.on('routeChangeStart', handleRouteChangeStart)
		router.events.on('routeChangeComplete', handleRouteChangeComplete)

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart)
			router.events.off('routeChangeComplete', handleRouteChangeComplete)
		}
	}, [])

	return (
		<div className='relative'>
			{isLoading && (
				<div className='fixed w-screen h-screen z-50 flex justify-center items-center'>
					<Loader
						className='!w-12 !h-12 rounded-full text-rose-600 bg-white'
						isPageLoader
					/>
				</div>
			)}
			{children}
		</div>
	)
}

export default PageLoader
