import React, { FC, useEffect, useState } from 'react'
import { IReviewCard, IReviewCardFromDB } from '../../../../interfaces'
import Title from '@/app/components/UI/Title/Title'
import Button from '@/app/components/UI/Button'
import { collectionRepliesListener, reviewsListener } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import ReviewCard from '@/components/Review/ReviewList/ReviewCard'
import EmptyList from '@/components/List/EmptyList'
import useScrollToTop from '@/hooks/useScrollToTop'
import classNames from 'classnames'

type PropsType = {
	reviews: Array<IReviewCard | IReviewCardFromDB>
	movieId?: number
	isCollectionList?: boolean
	className?: string
	isShowTitle?: boolean
}

const ReviewList: FC<PropsType> = ({
	reviews,
	movieId,
	isCollectionList = false,
	className,
	isShowTitle = true,
}) => {
	const { userId } = useAuth()
	const { listRef, scrollToTop } = useScrollToTop(100)
	const initialItemsLength = 3
	const [maxReviewsLength, setMaxReviewsLength] =
		useState<number>(initialItemsLength)
	const [itemsToShow, setItemsToShow] = useState(reviews)
	const [itemsFromDB, setItemsFromDB] = useState([])
	const [defaultItems, setDefaultItems] = useState([])
	const isMoreDataAvailable =
		maxReviewsLength <
		itemsToShow.filter(item => item.id !== undefined).length
	const isShowMoreButton = itemsToShow.length > initialItemsLength
	const buttonText = isMoreDataAvailable ? 'Show more' : 'Show less'

	const handleItemsToShowLength = () => {
		if (!isMoreDataAvailable) scrollToTop()

		const newMaxReviewsLength = isMoreDataAvailable
			? Math.min(
					maxReviewsLength + initialItemsLength,
					itemsToShow.length
			  )
			: initialItemsLength

		if (isMoreDataAvailable) {
			setMaxReviewsLength(newMaxReviewsLength)
		} else {
			setTimeout(() => {
				setMaxReviewsLength(newMaxReviewsLength)
			}, 600)
		}
	}

	const defineReviewSrc = () => {
		const itemsFromDB: IReviewCardFromDB[] = []
		const defaultItems: IReviewCard[] = []

		reviews.forEach(item => {
			if (item.authorId) {
				itemsFromDB.push(item)
			} else {
				defaultItems.push(item)
			}
		})

		setItemsFromDB(itemsFromDB)
		setDefaultItems(defaultItems)
	}

	useEffect(() => {
		defineReviewSrc()
	}, [reviews])

	useEffect(() => {
		const newItemsToShow = [...itemsFromDB, ...defaultItems]
		setItemsToShow(newItemsToShow)
	}, [itemsFromDB, defaultItems])

	useEffect(() => {
		if (userId) {
			const unsubscribe = reviewsListener(
				isCollectionList ? userId : movieId,
				itemsFromDB,
				setItemsFromDB,
				isCollectionList ? 'users' : 'movie'
			)

			return () => {
				unsubscribe()
			}
		}
	}, [itemsFromDB, userId])

	useEffect(() => {
		if (isCollectionList) {
			const unsubscribe = collectionRepliesListener(
				userId,
				setItemsToShow
			)

			return () => {
				unsubscribe()
			}
		}
	}, [userId])

	if (!itemsToShow.length) {
		return (
			<EmptyList
				title='Reviews'
				text={
					isCollectionList
						? `This collection is empty. Please add some items in this collection before you can see it here`
						: undefined
				}
			/>
		)
	}

	return (
		<div ref={listRef} className={classNames('mb-16', className)}>
			{isShowTitle && <Title>Reviews</Title>}
			<div>
				{itemsToShow
					.filter(item => item.id !== undefined)
					.slice(0, maxReviewsLength)
					.map(item => (
						<ReviewCard
							key={item.id}
							review={item}
							defaultCardMovieId={movieId}
							isLinkToMovie={isCollectionList}
							isCollectionItem={isCollectionList}
						/>
					))}
				{isShowMoreButton && (
					<Button
						className='mx-auto'
						context='empty'
						onClick={handleItemsToShowLength}
					>
						{buttonText}
					</Button>
				)}
			</div>
		</div>
	)
}

export default ReviewList
