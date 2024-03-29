import {
	FC,
	FormEvent,
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
} from 'react'
import Textarea from '../../../../app/components/UI/Input/Textarea'
import Title from '../../../../app/components/UI/Title/Title'
import Button from '../../../../app/components/UI/Button'
import { uuidv4 } from '@firebase/util'
import moment from 'moment'
import { openLoginModal } from '@/handlers/handleModals'
import { useModal } from '@/context/ModalProvider'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import { IReviewItemCard } from '../../../../../interfaces'
import Loader from '@/components/Loader'
import { UserCollections } from '@/constants/enum'
import { createReviewOrReply } from '@/firebase/handlers/reviewAndReplyHandlers/createReviewOrReply'

type PropsType = {
	reviewedItemId: number
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
	userId: string
	reviewAuthorId?: string
	reviewId?: string
	replyToUser?: string
	isReplyItem?: boolean
	onFormClose?: Dispatch<SetStateAction<boolean>>
}

const NewReviewForm: FC<PropsType> = ({
	reviewedItemId,
	reviewedItemCollectionType,
	userId,
	reviewAuthorId,
	reviewId,
	replyToUser,
	isReplyItem = false,
	onFormClose,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [textareaValue, setTextareaValue] = useState<string>('')
	const [error, setError] = useState<string>('')
	const { showModal } = useModal()
	const buttonText = isLoading ? (
		<Loader type='static' />
	) : (
		<>{`${isReplyItem ? 'Submit reply' : 'Submit review'}`}</>
	)

	const handleTextareaChange = (newValue: string) => {
		setTextareaValue(newValue)
		setError('')
	}

	const handleCloseForm = () => {
		onFormClose && onFormClose(false)
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		setIsLoading(true)

		if (textareaValue.trim() !== '') {
			if (userId) {
				setError('')

				let newItem: IReviewItemCard

				if (isReplyItem) {
					newItem = {
						...(reviewAuthorId !== undefined && {
							reviewAuthorId: reviewAuthorId,
						}),
						reviewedItemId: reviewedItemId,
						replyToUser: replyToUser,
						reviewId: reviewId,
						id: uuidv4(),
						content: textareaValue,
						created_at: moment().format(),
						authorId: userId,
						reviewedItemCollectionType: reviewedItemCollectionType,
					}
				} else {
					newItem = {
						reviewedItemId: reviewedItemId,
						id: uuidv4(),
						content: textareaValue,
						created_at: moment().format(),
						authorId: userId,
						reviewedItemCollectionType: reviewedItemCollectionType,
					}
				}

				const itemConfig = {
					newItem,
					reviewedItemId,
					collectionType: isReplyItem
						? UserCollections.replies
						: (UserCollections.reviews as
								| UserCollections.reviews
								| UserCollections.replies),
					reviewedItemCollectionType,
				}

				await createReviewOrReply(userId, itemConfig)
				setTextareaValue('')

				if (isReplyItem) handleCloseForm()
			} else openLoginModal(showModal)
		} else {
			setError(ERROR_MESSAGES.REQUIRED_FIELD)
		}

		setIsLoading(false)
	}

	useEffect(() => {
		setTextareaValue('')
		setError('')
	}, [reviewedItemId])

	return (
		<>
			{isReplyItem ? (
				<Title variant='h3' className='mt-8'>
					{`Leave your reply to ${replyToUser}`}
				</Title>
			) : (
				<Title>Leave your review</Title>
			)}
			<form>
				<Textarea
					onChange={handleTextareaChange}
					value={textareaValue}
					error={error}
				/>
				<span className='mt-8 flex justify-start items-center'>
					<Button onClick={handleSubmit}>{buttonText}</Button>
					{isReplyItem && (
						<Button
							context='filledDark'
							className='ml-2'
							onClick={handleCloseForm}
						>
							Cancel
						</Button>
					)}
				</span>
			</form>
		</>
	)
}

export default NewReviewForm
