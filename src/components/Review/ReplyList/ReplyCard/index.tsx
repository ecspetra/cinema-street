import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { IReplyCard } from '../../../../../interfaces'
import Image from '../../../Images/Image'
import defaultUserImage from '../../../../app/assets/images/default-user-image.svg'
import Button from '../../../../app/components/UI/Button'
import Title from '../../../../app/components/UI/Title/Title'
import moment from 'moment'
import classNames from 'classnames'
import { getUserAvatar, removeReviewItem } from '@/firebase/config'
import ReviewActions from '@/components/Review/ReviewList/ReviewCard/ReviewActions'
import EditReviewForm from '@/components/Review/Form/EditReviewForm'
import Dropdown from '@/app/components/UI/Dropdown'
import DropdownItem from '@/app/components/UI/Dropdown/DropdownItem'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'

type PropsType = {
	movieId: number
	userId: string
	reply: IReplyCard
	onReply: (userName: string) => void
}

const ReplyCard: FC<PropsType> = ({ movieId, userId, reply, onReply }) => {
	const { content, id, created_at, authorId, replyTo } = reply
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const [isShowEditForm, setIsShowEditForm] = useState<boolean>(false)
	const [isContentOpen, setIsContentOpen] = useState<boolean>(false)
	const [authorInfo, setAuthorInfo] = useState({
		photoURL: '',
		displayName: '',
	})
	const [isTruncateReview, setIsTruncateReview] = useState<boolean>(false)
	const [contentHeight, setContentHeight] = useState<number>(0)
	const contentRef = useRef<HTMLDivElement | null>(null)
	const isLongReviewContent = useMemo(() => content.length > 400, [content])
	const formattedDate = useMemo(
		() => moment(created_at).format('MMM Do YY'),
		[created_at]
	)
	const isShowTruncateDots =
		isLongReviewContent && !isContentOpen && isTruncateReview
	const isCurrentUserItem = userId === authorId

	const handleReplyContent = () => {
		setIsContentOpen(!isContentOpen)
	}

	useEffect(() => {
		if (contentRef.current) {
			setContentHeight(contentRef.current!.scrollHeight)
		}

		if (!isContentOpen) {
			setTimeout(() => {
				setIsTruncateReview(true)
			}, 500)
		} else setIsTruncateReview(false)
	}, [isContentOpen])

	useEffect(() => {
		getUserAvatar(authorId)
			.then(data => {
				setAuthorInfo({
					photoURL: data.photoURL,
					displayName: data.displayName,
				})
			})
			.then(() => {
				setIsMounted(true)
			})
	}, [])

	useEffect(() => {
		if (!userId) {
			setIsShowEditForm(false)
		}
	}, [userId])

	return (
		<CSSTransition
			in={isMounted}
			timeout={500}
			classNames='fade'
			unmountOnExit
		>
			<div className='mb-4 p-4 bg-gray-800 border border-gray-500 relative last:mb-0'>
				{isCurrentUserItem && (
					<Dropdown>
						<DropdownItem
							label='Edit'
							icon={faPenToSquare}
							onClick={() => setIsShowEditForm(true)}
						/>
						<DropdownItem
							label='Delete'
							icon={faTrash}
							onClick={() =>
								removeReviewItem(id, movieId, userId, 'replies')
							}
						/>
					</Dropdown>
				)}
				<div className='flex mb-2'>
					<div className='flex items-center'>
						<Image
							className='aspect-square !w-10 h-10 mr-3 rounded-md overflow-hidden'
							src={authorInfo.photoURL}
							defaultImage={defaultUserImage}
						/>
						<div>
							<Title variant='h3' className='mb-2 min-h-[22.5px]'>
								{authorInfo.displayName}
							</Title>
							<p className='text-xs'>{formattedDate}</p>
						</div>
					</div>
				</div>
				<div>
					{isShowEditForm ? (
						<EditReviewForm
							item={reply}
							movieId={movieId}
							onFormClose={setIsShowEditForm}
							isReply
						/>
					) : (
						<>
							<div className='mb-4'>
								<div
									style={{
										maxHeight: isContentOpen
											? contentHeight
											: '3rem',
									}}
									ref={contentRef}
									className='overflow-hidden transition-[max-height] duration-500'
								>
									<p
										className={classNames(
											isShowTruncateDots && 'line-clamp-2'
										)}
									>
										<span className='mr-1 font-semibold'>{`${replyTo},`}</span>
										{content}
									</p>
								</div>
								{isLongReviewContent && (
									<Button
										context='text'
										onClick={() => handleReplyContent()}
									>
										{isContentOpen ? 'Hide' : 'Show more'}
									</Button>
								)}
							</div>
							<ReviewActions
								reviewId={id}
								movieId={movieId}
								userId={userId}
								collectionName='replies'
								onReply={() => onReply(authorInfo.displayName)}
							/>
						</>
					)}
				</div>
			</div>
		</CSSTransition>
	)
}

export default ReplyCard
