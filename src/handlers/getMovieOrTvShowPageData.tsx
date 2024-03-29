import { URL_TO_FETCH_SIMILAR_LIST } from '@/constants/linksToFetch'
import { fetchItemData } from '@/handlers/fetchItemData'
import { getResultsByPage } from '@/handlers/getResultsByPage'
import { UserCollections } from '@/constants/enum'
import { IItemCard, IMovieOrTVShowData } from '../../interfaces'
import { createItemCard } from '@/handlers/createItemCard'
import { getMovieOrTVShowReviewListFromStorage } from '@/firebase/handlers/reviewAndReplyHandlers/getMovieOrTVShowReviewListFromStorage'

export const getMovieOrTvShowPageData = async (
	itemId: string,
	collectionType: UserCollections.movie | UserCollections.tv
): Promise<IMovieOrTVShowData> => {
	try {
		const urlToFetchSimilarMovies = URL_TO_FETCH_SIMILAR_LIST.replace(
			'{itemId}',
			itemId
		).replace('{collectionType}', collectionType)

		const fetchReviewListFromStorage = async () => {
			const reviewListFromStorage =
				await getMovieOrTVShowReviewListFromStorage(
					itemId,
					UserCollections.reviews,
					collectionType
				)
			return reviewListFromStorage
		}

		const [
			basicInfo,
			credits,
			images,
			reviews,
			video,
			reviewListFromStorage,
			similarItemsList,
		] = await Promise.all([
			fetchItemData(collectionType, itemId, ''),
			fetchItemData(collectionType, itemId, '/credits'),
			fetchItemData(collectionType, itemId, '/images'),
			fetchItemData(collectionType, itemId, '/reviews'),
			fetchItemData(collectionType, itemId, '/videos'),
			fetchReviewListFromStorage(),
			getResultsByPage(urlToFetchSimilarMovies, 1),
		])

		const reviewsFromAPIAndStorage = [
			...reviews.results,
			...reviewListFromStorage,
		]

		const getCreditsItems = async (items: any[]) => {
			if (items.length > 0) {
				const itemCards = await createItemCard(items)
				return itemCards as IItemCard[]
			} else return []
		}

		const cast = await getCreditsItems(credits.cast)
		const crew = await getCreditsItems(credits.crew)

		return {
			basicInfo,
			credits: { cast: cast, crew: crew },
			images: images.backdrops,
			video: video.results,
			reviewsFromAPIAndStorage,
			similarItemsList,
		}
	} catch (error) {
		throw error
	}
}
