import { Dispatch, SetStateAction } from 'react'
import { IFullUserInfo } from '../../../../interfaces'
import { DataSnapshot, ref } from 'firebase/database'
import { onValue } from '@firebase/database'
import { database } from '@/firebase/config'

export const userProfileInfoListener = (
	userId: string,
	setProfile: Dispatch<SetStateAction<IFullUserInfo['info'] | null>>
) => {
	const userRef = ref(database, `users/${userId}/info`)

	const onInfoChanged = (snapshot: DataSnapshot) => {
		const profileData = snapshot.val()
		setProfile(profileData)
	}
	const unsubscribe = onValue(userRef, onInfoChanged)

	return () => {
		unsubscribe()
	}
}
