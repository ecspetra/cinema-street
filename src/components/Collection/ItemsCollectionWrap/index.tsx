import { FC } from 'react'
import { IItemCard } from '../../../../interfaces'
import Link from 'next/link'
import { useAuth } from '@/context/AuthProvider'
import ItemCard from '../../List/ItemsListWrap/ItemsList/ItemCard'
import { UserCollections } from '@/constants/enum'

type PropsType = {
	items: IItemCard[]
	collectionType:
		| UserCollections.movie
		| UserCollections.tv
		| UserCollections.person
}

const ItemsCollectionWrap: FC<PropsType> = ({ items, collectionType }) => {
	const { userId } = useAuth()
	const maxListLength = 4

	return (
		<>
			<div className='grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center'>
				{items.map((item, idx) => {
					if (idx <= maxListLength) {
						return (
							<ItemCard
								item={item}
								collectionType={collectionType}
								key={idx}
								isShowButton={false}
							/>
						)
					}
				})}
			</div>
			<Link
				href={`/collection/[type]?uid=${userId}&type=${collectionType}`}
				as={`/collection/${collectionType}?uid=${userId}&type=${collectionType}`}
				className='w-full md:w-72 border-2 border-rose-600 duration-300 font-semibold leading-none text-rose-600 rounded-3xl hover:border-transparent hover:w-full hover:text-rose-500 p-3 flex justify-center items-center mx-auto mt-8'
			>
				{`View ${collectionType} collection`}
			</Link>
		</>
	)
}

export default ItemsCollectionWrap
