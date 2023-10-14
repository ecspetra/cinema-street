import MovieCard from '../../Movie/MovieCard'
import { IMovieCard, IPersonCard } from '../../../../interfaces'
import React, { FC, useEffect, useState } from 'react'
import Button from '@/app/components/UI/Button'
import { collectionListener, getCollectionItemsList } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import Title from '@/app/components/UI/Title/Title'
import Loader from '@/components/Loader'
import PersonCard from '../../Person/PersonList/PersonCard'

type PropsType = {
	collectionName: 'movies' | 'persons'
	itemsList: {
		items: Array<IMovieCard>
		isMoreDataAvailable: boolean
	}
	title: string
}

const CollectionItemsList: FC<PropsType> = ({
	collectionName,
	itemsList: { items, isMoreDataAvailable },
	title,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [lastItemId, setLastItemId] = useState<string | undefined>(undefined)
	const [itemsToShow, setItemsToShow] = useState<
		Array<IMovieCard | IPersonCard>
	>([...items])
	const [isShowMoreButton, setIsShowMoreButton] =
		useState<boolean>(isMoreDataAvailable)
	const { currentUser } = useAuth()
	const userId = currentUser?.uid

	const getMoreCollectionItems = async () => {
		setIsLoading(true)
		const result = await getCollectionItemsList(
			userId,
			collectionName,
			20,
			lastItemId
		)
		result.items.map(item => {
			setItemsToShow(prevState => [...prevState, item])
		})
		setIsShowMoreButton(result.isMoreDataAvailable)
		setIsLoading(false)
	}

	useEffect(() => {
		const unsubscribe = collectionListener(
			userId,
			collectionName,
			itemsToShow,
			setItemsToShow,
			setIsShowMoreButton
		)

		return () => {
			unsubscribe()
		}
	}, [itemsToShow])

	useEffect(() => {
		if (lastItemId) getMoreCollectionItems()
	}, [lastItemId])

	if (!itemsToShow.length) {
		return (
			<div className='mb-16'>
				<Title>{title}</Title>
				<p>No items yet</p>
			</div>
		)
	}

	return (
		<div className='mb-16 z-10'>
			<Title>{title}</Title>
			<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
				{itemsToShow.map((item: IMovieCard | IPersonCard) => {
					if (collectionName === 'movies') {
						return <MovieCard key={item.id} movie={item} />
					} else return <PersonCard key={item.id} person={item} />
				})}
			</div>
			{isLoading && <Loader type='static' />}
			{isShowMoreButton && (
				<Button
					className='mx-auto'
					context='empty'
					onClick={() =>
						setLastItemId(
							itemsToShow[itemsToShow.length - 1].id.toString()
						)
					}
				>
					Show more
				</Button>
			)}
		</div>
	)
}

export default CollectionItemsList
