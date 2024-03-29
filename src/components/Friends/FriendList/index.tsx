import { FC, useEffect, useState } from 'react'
import Button from '@/app/components/UI/Button'
import Title from '@/app/components/UI/Title/Title'
import EmptyList from '@/components/List/EmptyList'
import ProfileIconSmall from '@/components/Profile/ProfileInfo/ProfileIcon/ProfileIconSmall'
import { useModal } from '@/context/ModalProvider'
import { openFriendsModal } from '@/handlers/handleModals'
import { IFullUserInfo, IUser } from '../../../../interfaces'

type PropsType = {
	friends: any[]
	onRemove: (profileInfo: IUser, modalId?: string | null) => void
}

const FriendList: FC<PropsType> = ({ friends, onRemove }) => {
	const { showModal } = useModal()
	const [itemsList, setItemsList] = useState<IFullUserInfo[]>([])
	const initialItemsLength = 3
	const isShowMoreButton = friends.length > initialItemsLength

	useEffect(() => {
		setItemsList(friends)
	}, [friends])

	if (!itemsList.length)
		return <EmptyList title='Friends' text='No friends yet' />

	return (
		<div className='mb-16'>
			<Title>Friends</Title>
			<div className='flex justify-start items-center'>
				<div className='flex justify-start items-center'>
					{itemsList.map((item, idx) => {
						if (idx < initialItemsLength) {
							return (
								<ProfileIconSmall
									key={item.info.id}
									userId={item.info.id}
									photoURL={item.info.photoURL}
									isLinkToProfile
								/>
							)
						}
					})}
				</div>
				{isShowMoreButton && (
					<Button
						context='text'
						onClick={() =>
							openFriendsModal(showModal, itemsList, onRemove)
						}
					>
						Show all
					</Button>
				)}
			</div>
		</div>
	)
}

export default FriendList
