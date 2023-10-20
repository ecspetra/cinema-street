import '@/app/globals.css'
import { FC } from 'react'
import Header from '@/app/components/Header'

type PropsType = {
	children: JSX.Element | JSX.Element[]
}

const MainLayout: FC<PropsType> = ({ children }) => {
	return (
		<>
			<Header />
			<main className='container w-full max-w-screen-xl mx-auto pt-20 px-5 pb-5 relative font-light min-h-screen flex flex-col text-base'>
				{children}
			</main>
		</>
	)
}

export default MainLayout
