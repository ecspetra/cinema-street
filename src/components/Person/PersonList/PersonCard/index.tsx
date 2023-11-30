import { IPersonCard } from '../../../../../interfaces'
import React, { FC } from 'react'
import defaultPersonImage from '../../../../app/assets/images/default-person-image.svg'
import Image from '../../../Images/Image'
import Link from 'next/link'
import Title from '../../../../app/components/UI/Title/Title'
import CollectionButton from '@/app/components/UI/Button/CollectionButton'
import { useCollectionButton } from '@/hooks/useCollectionButton'
import { CSSTransition } from 'react-transition-group'

type PropsType = {
	item: IPersonCard
	isShowButton?: boolean
	isShowRole?: boolean
	isCollectionListItem?: boolean
}

const PersonCard: FC<PropsType> = ({
	item,
	isShowButton = true,
	isShowRole = false,
	isCollectionListItem = false,
}) => {
	const {
		isMounted,
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		openConfirmationPopup,
	} = useCollectionButton(item, 'person')

	const { id, job, name, character, profile_path } = item

	const personCard = (
		<div className='flex flex-col w-full max-w-[232px] mb-8 mr-auto'>
			<Link
				href={`/person/[id]`}
				as={`/person/${id}`}
				className='group text-sm'
			>
				<Image
					className='duration-300 mb-4 group-hover:border-rose-600 border-4'
					src={`https://image.tmdb.org/t/p/w440_and_h660_face${profile_path}`}
					defaultImage={defaultPersonImage}
				/>
				<Title variant='h3'>{name}</Title>
				{isShowRole && <p className='text-xs'>{character ?? job}</p>}
			</Link>
			{isShowButton && (
				<CollectionButton
					className='mt-auto w-full'
					isLoadingCollection={isLoadingCollection}
					isCollectionItem={isCollectionItem}
					onClick={
						isCollectionItem
							? openConfirmationPopup
							: handleSetCollectionItem
					}
				/>
			)}
		</div>
	)

	return (
		<>
			{isCollectionListItem ? (
				<CSSTransition
					in={isMounted}
					timeout={500}
					classNames='collection-card'
					unmountOnExit
				>
					{personCard}
				</CSSTransition>
			) : (
				personCard
			)}
		</>
	)
}

export default PersonCard
