import { UserCollections } from '@/constants/enum'
import { ref, set } from 'firebase/database'
import { database } from '@/firebase/config'
import { removeReviewOrReplyReaction } from '@/firebase/handlers/reactionHandlers/removeReviewOrReplyReaction'

export const createNewReviewOrReplyReaction = async (
	userId: string,
	itemConfig: {
		reviewId: string
		reviewedItemId: number
		collectionType: UserCollections.reviews | UserCollections.replies
		reactionType: 'like' | 'dislike'
		reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
	}
) => {
	const {
		reviewId,
		reviewedItemId,
		collectionType,
		reactionType,
		reviewedItemCollectionType,
	} = itemConfig
	const reactionTypeToCreate = reactionType === 'like' ? 'likes' : 'dislikes'
	const reactionTypeToRemove = reactionType === 'like' ? 'dislike' : 'like'
	const collectionPathForUserReaction = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${reviewId}/${reactionTypeToCreate}/${userId}`
	const generalCollectionPathForUserReaction = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/${reactionTypeToCreate}/${userId}`

	const collectionRefForUserReaction = ref(
		database,
		collectionPathForUserReaction
	)
	const generalCollectionRefForUserReaction = ref(
		database,
		generalCollectionPathForUserReaction
	)

	await set(collectionRefForUserReaction, reviewId)
	await set(generalCollectionRefForUserReaction, reviewId)
	await removeReviewOrReplyReaction(userId, {
		...itemConfig,
		reactionType: reactionTypeToRemove,
	})
}
