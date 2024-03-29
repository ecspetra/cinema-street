import { IMark } from '../../../../interfaces'
import { ref, set } from 'firebase/database'
import { uuidv4 } from '@firebase/util'
import { database } from '@/firebase/config'

export const createNewMarkForMovieOrTVShow = async (
	markData: IMark,
	userId: string
) => {
	const newMarkPath = `users/${userId}/collection/marks/${
		markData.collectionType
	}/${uuidv4()}`
	const newMarkRef = ref(database, newMarkPath)

	const newMarkData = {
		markedItemId: markData.markedItemId,
		markValue: markData.markValue,
		collectionType: markData.collectionType,
	}

	await set(newMarkRef, newMarkData)
}
