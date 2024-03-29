import { ref, remove } from 'firebase/database'
import { database } from '@/firebase/config'
import { UserCollections } from '@/constants/enum'

export const removeMarkForMovie = (
	userId: string,
	markConfig: {
		markKey: string
		collectionType: UserCollections.movie | UserCollections.tv
	}
): Promise<boolean> => {
	const { markKey, collectionType } = markConfig
	const removedMarkPath = `users/${userId}/collection/marks/${collectionType}/${markKey}`
	const removedMarkRef = ref(database, removedMarkPath)

	return new Promise(async resolve => {
		let isMarkRemovedFromCollection = false

		remove(removedMarkRef).then(() => {
			isMarkRemovedFromCollection = true
		})

		resolve(isMarkRemovedFromCollection)
	})
}
