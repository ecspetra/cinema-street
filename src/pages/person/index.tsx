import { NextPageContext } from 'next'
import { LINK_TO_FETCH_PERSON_LIST } from '@/constants/linksToFetch'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import TopBanner from '@/components/TopBanner'
import ItemsListWrap from '@/components/List/ItemsListWrap'

const Persons = ({ items, isMoreDataAvailable }) => {
	const [persons, setPersons] = useState([])
	const [isNextResult, setIsNextResult] = useState(false)

	useEffect(() => {
		if (!items) {
			getResultsByPage(LINK_TO_FETCH_PERSON_LIST, 1).then(data => {
				setPersons(data.items)
				setIsNextResult(data.isMoreDataAvailable)
			})
		}
	}, [])

	useEffect(() => {
		setPersons(items)
		setIsNextResult(isMoreDataAvailable)
	}, [items, isMoreDataAvailable])

	if (!persons.length) return <Loader />

	return (
		<>
			<TopBanner />
			<ItemsListWrap
				itemsList={persons}
				listName='person'
				title='Discover persons'
				isMoreDataAvailable={isNextResult}
				linkToFetchItems={LINK_TO_FETCH_PERSON_LIST}
			/>
		</>
	)
}

export const getServerSideProps = async (ctx: NextPageContext) => {
	try {
		const results = await getResultsByPage(LINK_TO_FETCH_PERSON_LIST, 1)

		return {
			props: {
				items: results.items,
				isMoreDataAvailable: results.isMoreDataAvailable,
			},
		}
	} catch (error) {
		return {
			props: {
				items: [],
				isMoreDataAvailable: false,
			},
		}
	}
}

export default Persons
