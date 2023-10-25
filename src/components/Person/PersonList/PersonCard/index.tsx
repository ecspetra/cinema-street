import { IPersonCard } from '../../../../../interfaces'
import React, { FC } from 'react'
import defaultPersonImage from '../../../../app/assets/images/default-person-image.svg'
import Image from '../../../Images/Image'
import Button from '../../../../app/components/UI/Button'
import Link from 'next/link'
import Title from '../../../../app/components/UI/Title/Title'
import CollectionButton from '@/app/components/UI/Button/CollectionButton'
import { useAuth } from '@/context/AuthProvider'
import { useCollectionButton } from '@/hooks/useCollectionButton'

type PropsType = {
	person: IPersonCard
	isShowButton?: boolean
	isShowRole?: boolean
}

const PersonCard: FC<PropsType> = ({
	person,
	isShowButton = true,
	isShowRole = false,
}) => {
	const { currentUser } = useAuth()
	const userId = currentUser?.uid
	const {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		handleRemoveCollectionItem,
	} = useCollectionButton(person, 'persons')

	const { id, job, name, character, profile_path } = person

	return (
		<div className='flex flex-col w-full max-w-[232px] mb-8 mr-auto'>
			<Link
				href={`/person/[id]`}
				as={`/person/${id}`}
				className='group text-sm'
			>
				<Image
					className='duration-300 mb-4 group-hover:shadow-red-700/30 group-hover:shadow-2xl'
					src={`https://image.tmdb.org/t/p/w440_and_h660_face${profile_path}`}
					defaultImage={defaultPersonImage}
				/>
				<Title className='relative z-10' variant='h3'>
					{name}
				</Title>
				{isShowRole && (
					<p className='relative z-10 text-xs'>{character ?? job}</p>
				)}
			</Link>
			{isShowButton && (
				<CollectionButton
					className='mt-auto w-full'
					isLoadingCollection={isLoadingCollection}
					isCollectionItem={isCollectionItem}
					onClick={
						isCollectionItem
							? () => handleRemoveCollectionItem(id, userId)
							: () => handleSetCollectionItem(person)
					}
				/>
			)}
		</div>
	)
}

export default PersonCard