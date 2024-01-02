import { initializeApp } from 'firebase/app'
import {
	createUserWithEmailAndPassword,
	EmailAuthProvider,
	getAuth,
	reauthenticateWithCredential,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
	updateProfile,
} from 'firebase/auth'
import {
	child,
	DataSnapshot,
	get,
	getDatabase,
	limitToFirst,
	onChildAdded,
	onChildChanged,
	onChildRemoved,
	orderByKey,
	query,
	ref,
	remove,
	set,
	startAfter,
	update,
} from 'firebase/database'
import { uuidv4 } from '@firebase/util'
import {
	IFetchedResult,
	IFullUserInfo,
	IItemCard,
	IMark,
	IMarkFromDB,
	IReviewCard,
	ITag,
} from '../../interfaces'
import { onValue } from '@firebase/database'
import { fetchItemData } from '@/handlers/fetchItemData'
import { createItemCard } from '@/handlers/createItemCard'
import { UserCollections } from '@/constants/enum'
import { Dispatch, SetStateAction } from 'react'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)
export { auth }

export interface AuthContextType {
	isLoggedIn: boolean
	userId: string
	photoURL: string
	userName: string
	updateUserProfile: () => void
}

// auth handlers

export const addUserToRealtimeDatabase = async (newUser: object) => {
	const newUserRef = ref(database, `users/${newUser.uid}`)

	const newUserData = {
		info: {
			displayName: newUser.displayName,
			id: newUser.uid,
			email: newUser.email,
			photoURL: newUser.photoURL,
		},
	}

	await set(newUserRef, newUserData)
}

export const updateUserInRealtimeDatabase = async (
	updateFields: object,
	userId: string
) => {
	const newUserRef = ref(database, `users/${userId}`)

	const existingUserData = (await get(newUserRef)).val()
	const newUserData = {
		info: {
			...existingUserData.info,
			...updateFields,
		},
	}

	await set(newUserRef, newUserData)
}

export const updateProfileIcon = async (newIcon: string) => {
	const currentUser = auth.currentUser
	const displayName = currentUser?.displayName
	const userId = currentUser?.uid
	const photoURL = newIcon

	const updateFields = {
		photoURL: newIcon,
	}

	await updateProfile(currentUser, { displayName, photoURL })
	await updateUserInRealtimeDatabase(updateFields, userId)
}

export const updateUserInfo = async (newInfo: object) => {
	const currentUser = auth.currentUser
	const displayName = newInfo.name.value
	const userId = currentUser?.uid
	const photoURL = currentUser?.photoURL

	const updateFields = {
		displayName: newInfo.name.value,
		country: newInfo.country.value,
		dateOfBirth: newInfo.dateOfBirth.value,
		about: newInfo.about.value,
	}

	await updateProfile(currentUser, { displayName, photoURL })
	await updateUserInRealtimeDatabase(updateFields, userId)
}

export const updateUserCredential = async (formData: object) => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const oldEmail = currentUser?.email
	const updateFields = {
		email: formData.email.value,
	}

	const credential = EmailAuthProvider.credential(
		oldEmail,
		formData.oldPassword.value
	)

	await reauthenticateWithCredential(currentUser, credential).then(
		async () => {
			await updateEmail(currentUser, formData.email.value)
			await updatePassword(currentUser, formData.newPassword.value)
			await updateUserInRealtimeDatabase(updateFields, userId)
		}
	)
}

export const updateProfileGenres = async (newGenres: ITag[]) => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const updateFields = {
		favoriteGenres: newGenres,
	}

	await updateUserInRealtimeDatabase(updateFields, userId)
}

export const signUp = async (
	email: string,
	password: string,
	displayName: string
) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		const newUser = userCredential.user
		const photoURL = `https://api.dicebear.com/5.x/thumbs/svg?seed=${newUser.uid}`

		await updateProfile(newUser, { displayName, photoURL })
		await addUserToRealtimeDatabase(newUser)
		await signInWithEmailAndPassword(auth, email, password)
	} catch (error) {
		throw error
	}
}

export const signIn = async (email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
	} catch (error) {
		throw error
	}
}

export const signOutUser = async () => {
	try {
		await signOut(auth)
	} catch (error) {
		throw error
	}
}

export const getUserInfo = async (userId: string): Promise<IFullUserInfo> => {
	const infoPath = `users/${userId}`
	const itemRef = ref(database, infoPath)

	return new Promise(async resolve => {
		get(itemRef).then(snapshot => {
			let userInfo = {}
			if (snapshot.exists()) {
				userInfo = snapshot.val()
			}

			resolve(userInfo)
		})
	})
}

export const getUserFriends = (friendIdsList): Promise<IFullUserInfo[]> => {
	return new Promise(async resolve => {
		let friendsInfo: IFullUserInfo[] = []

		const promises = Object.keys(friendIdsList).map(async (id: string) => {
			const friend = await getUserInfo(id)
			friendsInfo.push(friend)
		})

		await Promise.all(promises)

		resolve(friendsInfo)
	})
}

export const getIsFriend = (itemId: string): Promise<boolean> => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const collectionPath = `users/${userId}/friends/${itemId}`
	const itemRef = ref(database, collectionPath)

	return new Promise(async resolve => {
		let isCollectionItem = false

		get(itemRef).then(snapshot => {
			if (snapshot.exists()) isCollectionItem = true

			resolve(isCollectionItem)
		})
	})
}

export const userInfoListener = (
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

export const userFriendsListener = (
	userId: string,
	loadedItems: object[],
	setFriends: Dispatch<SetStateAction<IFullUserInfo[]>>
) => {
	const userRef = ref(database, `users/${userId}/friends`)

	const onFriendAdded = async (childSnapshot: DataSnapshot) => {
		const newFriendId = childSnapshot.val()

		if (
			loadedItems.length === 0 ||
			!loadedItems.some(
				existingItem => existingItem.info.id === newFriendId
			)
		) {
			const newFriend = await getUserInfo(newFriendId)
			setFriends(prevItems => [newFriend, ...prevItems])
		}
	}

	const onFriendRemoved = (childSnapshot: DataSnapshot) => {
		const removedItemId = childSnapshot.val()
		setFriends(prevItems =>
			prevItems.filter(item => item.info.id !== removedItemId)
		)
	}

	const unsubscribeFriendAdded = onChildAdded(userRef, onFriendAdded)
	const unsubscribeFriendRemoved = onChildRemoved(userRef, onFriendRemoved)

	return () => {
		unsubscribeFriendAdded()
		unsubscribeFriendRemoved()
	}
}

export const userContextListener = (
	userId: string,
	prevData: object,
	updateUserProfile: () => void
) => {
	const userRef = ref(database, `users/${userId}/info`)

	const onInfoChanged = (snapshot: DataSnapshot) => {
		const profileData = snapshot.val()

		if (
			prevData.photoURL !== profileData?.photoURL ||
			prevData.userName !== profileData?.displayName
		) {
			updateUserProfile()
		}
	}

	const unsubscribe = onValue(userRef, onInfoChanged)

	return () => {
		unsubscribe()
	}
}

// movie marks handlers

export const setNewMarkForMovie = async (markData: IMark, userId: string) => {
	const newMarkRef = ref(
		database,
		`users/${userId}/collection/marks/${
			markData.collectionType
		}/${uuidv4()}`
	)

	const newMarkData = {
		markedItemId: markData.markedItemId,
		markValue: markData.markValue,
		collectionType: markData.collectionType,
	}

	await set(newMarkRef, newMarkData)
}

export const getMarkForMovie = (
	markedItemId: number,
	userId: string,
	collectionType: string
): Promise<IMarkFromDB | undefined> => {
	const marksCollectionRef = ref(
		database,
		`users/${userId}/collection/marks/${collectionType}`
	)

	return new Promise(async resolve => {
		get(marksCollectionRef).then(snapshot => {
			let response

			snapshot.forEach(childSnapshot => {
				const mark = {
					key: childSnapshot.key,
					data: childSnapshot.val(),
				}

				if (mark.data.markedItemId === markedItemId) response = mark
			})

			resolve(response)
		})
	})
}

export const removeMarkForMovie = (
	markKey: string,
	userId: string,
	collectionType: string
) => {
	const markRef = ref(
		database,
		`users/${userId}/collection/marks/${collectionType}/${markKey}`
	)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(markRef).then(() => {
			isRemoved = true
		})

		resolve(isRemoved)
	})
}

// collection handlers

export const setNewCollectionItem = async (
	itemId: number,
	collectionType: UserCollections
) => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const collectionPath = `users/${userId}/collection/${collectionType}/${itemId}`
	const newCollectionItemRef = ref(database, collectionPath)

	const newItem = {
		id: itemId,
	}

	await set(newCollectionItemRef, newItem)
}

export const getCollectionItem = (
	itemId: number,
	collectionType: UserCollections
): Promise<boolean> => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const collectionPath = `users/${userId}/collection/${collectionType}/${itemId}`
	const itemRef = ref(database, collectionPath)

	return new Promise(async resolve => {
		let isCollectionItem = false

		get(itemRef).then(snapshot => {
			if (snapshot.exists()) isCollectionItem = true

			resolve(isCollectionItem)
		})
	})
}

export const removeCollectionItem = (
	itemId: number,
	collectionType: UserCollections
) => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const collectionPath = `users/${userId}/collection/${collectionType}/${itemId}`
	const itemRef = ref(database, collectionPath)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(itemRef).then(() => {
			isRemoved = true
		})

		resolve(isRemoved)
	})
}

export const getReviewsOrRepliesFromUserCollection = async (
	collectionOwnerId: string,
	collectionType: UserCollections.reviews | UserCollections.replies
) => {
	try {
		const collectionPath = `users/${collectionOwnerId}/collection/${collectionType}/`
		const userCollectionRef = ref(database, collectionPath)
		const paginationQuery = query(userCollectionRef, orderByKey())
		const snapshot = await get(paginationQuery)
		const data = snapshot.val() || {}
		const itemsFromDB = []

		for (const type in data) {
			const items = data[type]

			for (const itemId in items) {
				const review = items[itemId]
				itemsFromDB.push(review)
			}
		}

		return itemsFromDB
	} catch (error) {
		throw error
	}
}

export const getCollectionItemsList = async (
	collectionOwnerId: string,
	collectionType:
		| UserCollections.movie
		| UserCollections.person
		| UserCollections.tv
		| UserCollections.marks,
	itemsPerPage: number | null,
	lastItemId: string | undefined = undefined
): Promise<IFetchedResult<IReviewCard | IItemCard | IMark>> => {
	try {
		const userPath = `users/${collectionOwnerId}/`
		const userRef = ref(database, userPath)
		const userSnapshot = await get(userRef)

		if (!userSnapshot.exists()) {
			throw `Failed to fetch`
		}

		const collectionPath = `users/${collectionOwnerId}/collection/${collectionType}/`
		const userCollectionRef = ref(database, collectionPath)
		const collectionInfo = {
			type: collectionType,
			ref: userCollectionRef,
			userId: collectionOwnerId,
		}
		let paginationQuery

		if (lastItemId) {
			if (itemsPerPage !== null) {
				paginationQuery = query(
					userCollectionRef,
					orderByKey(),
					startAfter(lastItemId),
					limitToFirst(itemsPerPage + 1)
				)
			} else {
				paginationQuery = query(
					userCollectionRef,
					orderByKey(),
					startAfter(lastItemId)
				)
			}
		} else {
			if (itemsPerPage !== null) {
				paginationQuery = query(
					userCollectionRef,
					orderByKey(),
					limitToFirst(itemsPerPage + 1)
				)
			} else {
				paginationQuery = query(userCollectionRef, orderByKey())
			}
		}

		const snapshot = await get(paginationQuery)
		const data = snapshot.val() || {}
		const itemIds = Object.keys(data)
		let isMoreDataAvailable = false

		if (itemsPerPage !== null && itemIds.length > itemsPerPage) {
			isMoreDataAvailable = true
			itemIds.pop()
		}

		if (!itemIds.length) {
			return {
				isMoreDataAvailable,
				items: [],
			}
		}

		const items = await getCollectionItemsInfo(itemIds, collectionInfo)

		return {
			isMoreDataAvailable,
			items: items as (IItemCard | IReviewCard | IMark)[],
		}
	} catch (error) {
		throw error
	}
}

export const getCollectionItemsInfo = async (itemIds, collectionInfo) => {
	try {
		switch (collectionInfo.type) {
			case 'movie':
			case 'tv':
			case 'person':
				const itemsInfo = await Promise.all(
					itemIds.map(async itemId => {
						const itemInfo = await fetchItemData(
							collectionInfo.type,
							itemId,
							''
						)
						return itemInfo
					})
				)
				const items = createItemCard(itemsInfo)
				return items
			case 'reviews':
			case 'replies':
				return await Promise.all(
					itemIds.map(async itemId => {
						const itemSnapshot = await get(
							child(collectionInfo.ref, itemId)
						)
						return itemSnapshot.val()
					})
				)
			case 'marks':
				return await getCollectionMarksList(collectionInfo.userId)
		}
	} catch (error) {
		throw error
	}
}

export const getCollectionMarksList = async (userId: string) => {
	try {
		const getMarks = async type => {
			let items = []
			const collectionPath = `users/${userId}/collection/marks/${type}`
			const collectionRef = ref(database, collectionPath)
			const snapshot = await get(collectionRef)

			if (snapshot.exists()) {
				snapshot.forEach(childSnapshot => {
					const item = childSnapshot.val()
					items.push(item)
				})
			}

			return items
		}

		const movieMarks = await getMarks(UserCollections.movie)
		const tvMarks = await getMarks(UserCollections.tv)

		return [...movieMarks, ...tvMarks]
	} catch (error) {
		throw error
	}
}

export const collectionListener = (
	userId: string,
	collectionType: UserCollections,
	loadedItems: any[],
	setItems: ([]) => void,
	setIsMoreDataAvailable: (arg: boolean) => void
) => {
	const collectionRef = ref(
		database,
		`users/${userId}/collection/${collectionType}`
	)

	const getAllItemsFromCurrentCollection = () => {
		return new Promise(async resolve => {
			get(collectionRef).then(snapshot => {
				let items = []

				if (snapshot.exists()) {
					snapshot.forEach(childSnapshot => {
						items.push(childSnapshot.val())
					})
				}

				resolve(items)
			})
		})
	}

	const onItemRemoved = async (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		const allItemsFromCurrentCollection =
			await getAllItemsFromCurrentCollection()
		const totalItemsLength = allItemsFromCurrentCollection.length
		const loadedItemsLength = loadedItems.length
		const newItems = loadedItems.filter(
			existingItem => existingItem.id !== removedItem.id
		)
		setItems(newItems)
		setIsMoreDataAvailable(totalItemsLength > loadedItemsLength)
	}

	const unsubscribe = onChildRemoved(collectionRef, onItemRemoved)

	return () => {
		unsubscribe()
	}
}

// review handlers

export const setNewReviewItem = async (
	item: IReviewCard,
	userId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${item.id}`
	const generalCollectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${item.id}`
	const newCollectionItemRef = ref(database, collectionPath)
	const newGeneralCollectionItemRef = ref(database, generalCollectionPath)

	await set(newCollectionItemRef, item)
	await set(newGeneralCollectionItemRef, item)
}

export const updateReviewItem = async (
	item: IReviewCard,
	userId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const itemId = item.id
	const collectionPath = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}`
	const generalCollectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}`
	const itemRef = ref(database, collectionPath)
	const generalItemRef = ref(database, generalCollectionPath)
	const itemSnapshot = await get(itemRef)

	if (itemSnapshot.exists()) {
		await update(itemRef, item)
		await update(generalItemRef, item)
		return true
	} else {
		return false
	}
}

export const removeReviewItem = async (
	itemId: string,
	reviewedItemId: number,
	userId: string,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}`
	const generalCollectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}`

	const itemRef = ref(database, collectionPath)
	const generalCollectionItemRef = ref(database, generalCollectionPath)

	return new Promise(async resolve => {
		let isRemoved = false

		if (collectionType === UserCollections.reviews) {
			const repliesCollectionPath = `users/${userId}/collection/replies/${reviewedItemCollectionType}/`
			const repliesGeneralCollectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/replies/`

			const repliesCollectionRef = ref(database, repliesCollectionPath)
			const repliesGeneralCollectionRef = ref(
				database,
				repliesGeneralCollectionPath
			)

			const removeReviewRepliesInUserCollection = async () => {
				const snapshot = await get(repliesCollectionRef)

				if (snapshot.exists()) {
					snapshot.forEach(childSnapshot => {
						const reply = childSnapshot.val()
						if (reply.reviewId === itemId) {
							const replyPath = `users/${userId}/collection/replies/${reviewedItemCollectionType}/${childSnapshot.key}`
							const replyRef = ref(database, replyPath)
							remove(replyRef)
						}
					})
				}
			}

			const removeReviewRepliesInGeneralCollection = async () => {
				const snapshot = await get(repliesGeneralCollectionRef)

				if (snapshot.exists()) {
					snapshot.forEach(childSnapshot => {
						const reply = childSnapshot.val()
						if (reply.reviewId === itemId) {
							const replyPath = `${reviewedItemCollectionType}/${reviewedItemId}/replies/${childSnapshot.key}`
							const replyRef = ref(database, replyPath)
							remove(replyRef)
						}
					})
				}
			}

			await removeReviewRepliesInUserCollection()
			await removeReviewRepliesInGeneralCollection()
		}

		remove(itemRef).then(() => {
			remove(generalCollectionItemRef)
				.then(() =>
					removeAllReactions(
						userId,
						itemId,
						reviewedItemId,
						collectionType,
						reviewedItemCollectionType
					)
				)
				.then(() => {
					isRemoved = true
				})
		})
		resolve(isRemoved)
	})
}

export const getDBRepliesList = async (
	reviewedItemId: number,
	reviewId: string,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/replies/`
	const repliesCollectionRef = ref(database, collectionPath)
	try {
		const snapshot = await get(repliesCollectionRef)
		const replies = []

		if (snapshot.exists()) {
			snapshot.forEach(childSnapshot => {
				const reply = childSnapshot.val()
				if (reply.reviewId === reviewId) {
					replies.push(reply)
				}
			})
		}

		return replies
	} catch (error) {
		return []
	}
}

export const getReviewListFromStorage = async (
	reviewedItemId: string,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/`
	const reviewsCollectionRef = ref(database, collectionPath)

	try {
		const snapshot = await get(reviewsCollectionRef)

		if (snapshot.exists()) {
			const data = snapshot.val()
			const result = Object.values(data)
			return result
		} else {
			return []
		}
	} catch (error) {
		return []
	}
}

export const getReviewFromAnotherUserCollection = async (
	reviewAuthorId: string,
	reviewId: string,
	collectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `users/${reviewAuthorId}/collection/reviews/${collectionType}/${reviewId}`
	const reviewRef = ref(database, collectionPath)

	try {
		const snapshot = await get(reviewRef)

		if (snapshot.exists()) {
			const data = snapshot.val()
			return data
		} else {
			return
		}
	} catch (error) {
		return error
	}
}

export const reviewsListener = (
	collectionId: number | string,
	loadedItems: IReviewCard[],
	setItems: ([]) => void,
	reviewedItemCollectionType?: UserCollections.movie | UserCollections.tv
) => {
	const reviewsRef = ref(
		database,
		`${reviewedItemCollectionType}/${collectionId}/reviews/`
	)

	const onReviewAdded = (childSnapshot: DataSnapshot) => {
		const newItem = childSnapshot.val()
		if (!loadedItems.some(existingItem => existingItem.id === newItem.id)) {
			setItems(prevItems => [newItem, ...prevItems])
		}
	}

	const onReviewRemoved = (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		setItems(prevItems =>
			prevItems.filter(item => item.id !== removedItem.id)
		)
	}

	const onReviewChanged = (childSnapshot: DataSnapshot) => {
		const updatedItem = childSnapshot.val()
		setItems(prevItems => {
			const updatedIndex = prevItems.findIndex(
				item => item.id === updatedItem.id
			)
			if (updatedIndex !== -1) {
				prevItems[updatedIndex] = updatedItem
				return [...prevItems]
			}
			return prevItems
		})
	}

	const unsubscribeReviewAdded = onChildAdded(reviewsRef, onReviewAdded)
	const unsubscribeReviewRemoved = onChildRemoved(reviewsRef, onReviewRemoved)
	const unsubscribeReviewChanged = onChildChanged(reviewsRef, onReviewChanged)

	return () => {
		unsubscribeReviewAdded()
		unsubscribeReviewRemoved()
		unsubscribeReviewChanged()
	}
}

export const collectionReviewsListener = (
	collectionId: number | string,
	setItems: ([]) => void
) => {
	const tvShowReviewsRef = ref(
		database,
		`users/${collectionId}/collection/reviews/tv`
	)

	const movieReviewsRef = ref(
		database,
		`users/${collectionId}/collection/reviews/movie`
	)

	const onReviewRemoved = (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		setItems(prevItems =>
			prevItems.filter(item => item.id !== removedItem.id)
		)
	}

	const onReviewChanged = (childSnapshot: DataSnapshot) => {
		const updatedItem = childSnapshot.val()
		setItems(prevItems => {
			const updatedIndex = prevItems.findIndex(
				item => item.id === updatedItem.id
			)
			if (updatedIndex !== -1) {
				prevItems[updatedIndex] = updatedItem
				return [...prevItems]
			}
			return prevItems
		})
	}

	const unsubscribeTVShowReviewRemoved = onChildRemoved(
		tvShowReviewsRef,
		onReviewRemoved
	)
	const unsubscribeTVShowReviewChanged = onChildChanged(
		tvShowReviewsRef,
		onReviewChanged
	)

	const unsubscribeMovieReviewRemoved = onChildRemoved(
		movieReviewsRef,
		onReviewRemoved
	)
	const unsubscribeMovieReviewChanged = onChildChanged(
		movieReviewsRef,
		onReviewChanged
	)

	return () => {
		unsubscribeTVShowReviewRemoved()
		unsubscribeTVShowReviewChanged()
		unsubscribeMovieReviewRemoved()
		unsubscribeMovieReviewChanged()
	}
}

export const repliesListener = (
	reviewedItemId: number,
	reviewId: string,
	loadedItems: IReviewCard[],
	setItems: ([]) => void,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const repliesRef = ref(
		database,
		`${reviewedItemCollectionType}/${reviewedItemId}/replies/`
	)

	const onReplyAdded = (childSnapshot: DataSnapshot) => {
		const newItem = childSnapshot.val()
		if (
			!loadedItems.some(existingItem => existingItem.id === newItem.id) &&
			newItem.reviewId === reviewId
		) {
			setItems(prevItems => [newItem, ...prevItems])
		}
	}

	const onReplyRemoved = (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		setItems(prevItems =>
			prevItems.filter(item => item.id !== removedItem.id)
		)
	}

	const onReplyChanged = (childSnapshot: DataSnapshot) => {
		const updatedItem = childSnapshot.val()
		setItems(prevItems => {
			const updatedIndex = prevItems.findIndex(
				item => item.id === updatedItem.id
			)
			if (updatedIndex !== -1) {
				prevItems[updatedIndex] = updatedItem
				return [...prevItems]
			}
			return prevItems
		})
	}

	const unsubscribeReplyAdded = onChildAdded(repliesRef, onReplyAdded)
	const unsubscribeReplyRemoved = onChildRemoved(repliesRef, onReplyRemoved)
	const unsubscribeReplyChanged = onChildChanged(repliesRef, onReplyChanged)

	return () => {
		unsubscribeReplyAdded()
		unsubscribeReplyRemoved()
		unsubscribeReplyChanged()
	}
}

export const collectionRepliesListener = (
	userId: string,
	collectionOwnerId: string,
	setItems: ([]) => void
) => {
	const tvShowRepliesRef = ref(
		database,
		`users/${collectionOwnerId}/collection/replies/tv`
	)

	const movieRepliesRef = ref(
		database,
		`users/${collectionOwnerId}/collection/replies/movie`
	)

	const tvShowReviewsRef = ref(
		database,
		`users/${collectionOwnerId}/collection/reviews/tv`
	)

	const movieReviewsRef = ref(
		database,
		`users/${collectionOwnerId}/collection/reviews/movie`
	)

	const onReplyRemoved = async (childSnapshot: DataSnapshot) => {
		const removedItem = childSnapshot.val()
		let allRepliesSnapshot
		let allReplies
		let allReviewsSnapshot
		let allReviews

		if (removedItem.reviewedItemCollectionType === UserCollections.movie) {
			allRepliesSnapshot = await get(query(movieRepliesRef))
			allReplies = Object.values(allRepliesSnapshot.val() || {})
			allReviewsSnapshot = await get(query(movieReviewsRef))
			allReviews = Object.values(allReviewsSnapshot.val() || {})
		} else {
			allRepliesSnapshot = await get(query(tvShowRepliesRef))
			allReplies = Object.values(allRepliesSnapshot.val() || {})
			allReviewsSnapshot = await get(query(tvShowReviewsRef))
			allReviews = Object.values(allReviewsSnapshot.val() || {})
		}

		const review = allReviews.find(item => item.id === removedItem.reviewId)

		const isLastReplyInReview = !allReplies.some(
			item => item.reviewId === removedItem.reviewId
		)
		const isCurrentUserReview = review && review.authorId === userId
		const isReviewFromDefaultReviews = !review
		const isCurrentUserCollection = collectionOwnerId === userId

		if (
			(isLastReplyInReview &&
				!isCurrentUserReview &&
				isCurrentUserCollection) ||
			isReviewFromDefaultReviews
		) {
			setItems(prevItems =>
				prevItems.filter(item => item.id !== removedItem.reviewId)
			)
		}
	}

	const unsubscribeTVShowReplyRemoved = onChildRemoved(
		tvShowRepliesRef,
		onReplyRemoved
	)

	const unsubscribeMovieReplyRemoved = onChildRemoved(
		movieRepliesRef,
		onReplyRemoved
	)

	return () => {
		unsubscribeTVShowReplyRemoved()
		unsubscribeMovieReplyRemoved()
	}
}

export const setNewReviewOrReplyReaction = async (
	userId: string,
	itemId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	action: 'like' | 'dislike',
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${userId}`
	const generalCollectionPath = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${userId}`

	const itemRef = ref(database, collectionPath)
	const generalCollectionItemRef = ref(database, generalCollectionPath)

	await set(itemRef, itemId)
	await set(generalCollectionItemRef, itemId)
	await removeReviewReaction(
		userId,
		itemId,
		reviewedItemId,
		collectionType,
		action === 'like' ? 'dislike' : 'like',
		reviewedItemCollectionType
	)
}

export const removeReviewReaction = (
	userId: string,
	reviewId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	action: 'like' | 'dislike',
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const itemId = userId
	const collectionPath = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${reviewId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${itemId}`
	const generalCollectionPath = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/${
		action === 'like' ? 'likes' : 'dislikes'
	}/${itemId}`

	const itemRef = ref(database, collectionPath)
	const generalCollectionItemRef = ref(database, generalCollectionPath)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(itemRef).then(() => {
			remove(generalCollectionItemRef).then(() => {
				isRemoved = true
			})
		})

		resolve(isRemoved)
	})
}

export const removeAllReactions = (
	userId: string,
	itemId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const collectionPath = `users/${userId}/collection/${collectionType}/${reviewedItemCollectionType}/${itemId}`
	const generalCollectionPath = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}`

	const itemRef = ref(database, collectionPath)
	const generalCollectionItemRef = ref(database, generalCollectionPath)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(itemRef).then(() => {
			remove(generalCollectionItemRef).then(() => {
				isRemoved = true
			})
		})

		resolve(isRemoved)
	})
}

export const reviewReactionsListener = (
	reviewId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	setItems: ({ likes: [], dislikes: [] }) => void,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const likesCollectionRef = ref(
		database,
		`reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/likes`
	)
	const dislikesCollectionRef = ref(
		database,
		`reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${reviewId}/dislikes`
	)

	const likes = []
	const dislikes = []

	const unsubscribeLikes = onValue(
		likesCollectionRef,
		(snapshot: DataSnapshot) => {
			likes.length = 0
			snapshot.forEach(childSnapshot => {
				likes.push({
					key: childSnapshot.key,
					data: childSnapshot.val(),
				})
			})
			setItems(prevState => ({
				likes: likes,
				dislikes: prevState.dislikes,
			}))
		}
	)

	const unsubscribeDislikes = onValue(
		dislikesCollectionRef,
		(snapshot: DataSnapshot) => {
			dislikes.length = 0
			snapshot.forEach(childSnapshot => {
				dislikes.push({
					key: childSnapshot.key,
					data: childSnapshot.val(),
				})
			})
			setItems(prevState => ({
				likes: prevState.likes,
				dislikes: dislikes,
			}))
		}
	)

	return () => {
		unsubscribeLikes()
		unsubscribeDislikes()
	}
}

export const getReviewReactions = async (
	itemId: string,
	reviewedItemId: number,
	collectionType: UserCollections.reviews | UserCollections.replies,
	reviewedItemCollectionType: UserCollections.movie | UserCollections.tv
) => {
	const likesCollectionPath = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}/likes/`
	const dislikesCollectionPath = `reviewsReactions/${reviewedItemCollectionType}/${reviewedItemId}/${collectionType}/${itemId}/dislikes/`
	const likesCollectionRef = ref(database, likesCollectionPath)
	const dislikesCollectionRef = ref(database, dislikesCollectionPath)

	const getItemLikes = () => {
		return new Promise(async resolve => {
			get(likesCollectionRef).then(snapshot => {
				let response = []

				snapshot.forEach(childSnapshot => {
					const like = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					response.push(like)
				})

				resolve(response)
			})
		})
	}

	const getItemDislikes = () => {
		return new Promise(async resolve => {
			get(dislikesCollectionRef).then(snapshot => {
				let response = []

				snapshot.forEach(childSnapshot => {
					const dislike = {
						key: childSnapshot.key,
						data: childSnapshot.val(),
					}

					response.push(dislike)
				})

				resolve(response)
			})
		})
	}

	const likes = await getItemLikes()
	const dislikes = await getItemDislikes()

	return { likes, dislikes }
}

// friends handlers

export const setNewFriend = async (newFriendId: string) => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid
	const currentUserCollectionPath = `users/${userId}/friends/${newFriendId}/`
	const newFriendCollectionPath = `users/${newFriendId}/friends/${userId}/`

	const itemRef = ref(database, currentUserCollectionPath)
	const friendItemRef = ref(database, newFriendCollectionPath)

	await set(itemRef, newFriendId)
	await set(friendItemRef, userId)
}

export const removeFriend = (itemId: string): Promise<boolean> => {
	const currentUser = auth.currentUser
	const userId = currentUser?.uid

	const userCollectionFriendRef = ref(
		database,
		`users/${userId}/friends/${itemId}`
	)
	const friendRef = ref(database, `users/${itemId}/friends/${userId}`)

	return new Promise(async resolve => {
		let isRemoved = false

		remove(userCollectionFriendRef).then(() => {
			remove(friendRef).then(() => {
				isRemoved = true
			})
		})

		resolve(isRemoved)
	})
}
