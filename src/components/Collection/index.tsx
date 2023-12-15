import CollectionWrap from '@/components/Collection/CollectionWrap'
import React, { FC } from 'react'
import {
	IFetchedResult,
	IItemCard,
	IMark,
	IReviewCard,
} from '../../../interfaces'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	movies: IFetchedResult<IItemCard> | null
	tvShows: IFetchedResult<IItemCard> | null
	persons: IFetchedResult<IItemCard> | null
	marks: IFetchedResult<IMark>['items']
	reviews: IFetchedResult<IReviewCard>['items']
	isCurrentUserCollection?: boolean
}

const GeneralUserCollection: FC<PropsType> = ({
	movies,
	tvShows,
	persons,
	marks,
	reviews,
	isCurrentUserCollection = true,
}) => {
	return (
		<div>
			<CollectionWrap
				title='Movies'
				collectionType={UserCollections.movie}
				items={movies ? movies.items : []}
				isMoreDataAvailable={
					movies ? movies.isMoreDataAvailable : false
				}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
			<CollectionWrap
				title='TV shows'
				collectionType={UserCollections.tv}
				items={tvShows ? tvShows.items : []}
				isMoreDataAvailable={
					tvShows ? tvShows.isMoreDataAvailable : false
				}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
			<CollectionWrap
				title='Persons'
				collectionType={UserCollections.person}
				items={persons ? persons.items : []}
				isMoreDataAvailable={
					persons ? persons.isMoreDataAvailable : false
				}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
			<CollectionWrap
				title='Marks'
				collectionType={UserCollections.marks}
				items={marks ? marks : []}
				isMoreDataAvailable={false}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
			<CollectionWrap
				title='Reviews'
				collectionType={UserCollections.reviews}
				items={reviews ? reviews : []}
				isMoreDataAvailable={false}
				isCurrentUserCollection={isCurrentUserCollection}
			/>
		</div>
	)
}

export default GeneralUserCollection
