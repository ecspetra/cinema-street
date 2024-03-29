import { FC } from 'react'
import Image from '../../../components/Images/Image'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import {
	IBackdrop,
	IDetailsItem,
	IMovieOrTVShowBasicInfo,
	IReviewItemCard,
} from '../../../../interfaces'
import ImagesList from '../../../components/Images/ImagesList'
import Rating from '../../../components/Rating'
import Mark from '../../../components/Mark'
import ReviewList from '../../Review/ReviewList'
import NewReviewForm from '../../Review/Form/NewReviewForm'
import Title from '../../../app/components/UI/Title/Title'
import { useAuth } from '@/context/AuthProvider'
import CollectionButton from '../../../app/components/UI/Button/CollectionButton'
import { useCollectionButton } from '@/hooks/useCollectionButton'
import ReactPlayer from 'react-player'
import TVSeasonsList from '@/components/Movie/MovieOrTVShowBasicInfo/TVSeasonList'
import TagList from '@/components/Tag/TagList'
import DetailsList from '@/components/Details/DetailsList'
import { UserCollections } from '@/constants/enum'
import { CARD_IMAGE_SRC } from '@/constants/images'

type PropsType = {
	basicInfo: IMovieOrTVShowBasicInfo
	images: IBackdrop[]
	reviews: IReviewItemCard[]
	video: string
	collectionType: UserCollections.movie | UserCollections.tv
}

const MovieOrTVShowBasicInfo: FC<PropsType> = ({
	basicInfo,
	images,
	reviews,
	video,
	collectionType,
}) => {
	const { userId } = useAuth()

	const {
		title,
		name,
		id,
		genres,
		overview,
		production_companies,
		tagline,
		poster_path,
		production_countries,
		release_date,
		first_air_date,
		vote_count,
		vote_average,
		seasons,
	} = basicInfo

	const isTVShowItem = collectionType === UserCollections.tv

	const details: IDetailsItem[] = [
		isTVShowItem
			? first_air_date && {
					type: 'first_air_date',
					title: 'First air date:',
					text: first_air_date,
			  }
			: {
					type: 'release_date',
					title: 'Release date:',
					text: release_date,
			  },
		{
			type: 'production_countries',
			title: 'Production countries:',
			text: production_countries,
		},
		{
			type: 'production_companies',
			title: 'Production companies:',
			text: production_companies,
		},
	].filter(Boolean) as IDetailsItem[]

	const {
		isLoadingCollection,
		isCollectionItem,
		handleSetCollectionItem,
		openConfirmationPopup,
	} = useCollectionButton(basicInfo, collectionType)

	const imageFullSrc = poster_path
		? CARD_IMAGE_SRC.replace('{imageSrc}', poster_path)
		: ''

	return (
		<div className='flex gap-7 py-7 mb-16 flex-wrap md:flex-nowrap'>
			<div className='w-full max-w-[240px] md:max-w-[340px] mx-auto mt-24 md:mt-0'>
				<div className='sticky top-28'>
					<Image
						src={imageFullSrc}
						defaultImage={defaultMovieImage}
						className='border-4'
					/>
				</div>
			</div>
			<div className='w-full'>
				<Title className='text-3xl md:text-7xl after:hidden pb-0'>
					{title ? title : name}
				</Title>
				{tagline && (
					<Title variant='h2' className='text-gray-400'>
						{tagline}
					</Title>
				)}
				<TagList tags={genres} className='mb-5' />
				<DetailsList itemsList={details} />
				<Rating rating={vote_average} voteCount={vote_count} />
				<Mark markedItemId={id} collectionType={collectionType} />
				<p className='mb-6'>{overview}</p>
				<CollectionButton
					className='mb-12'
					isLoadingCollection={isLoadingCollection}
					isCollectionItem={isCollectionItem}
					onClick={
						isCollectionItem
							? openConfirmationPopup
							: handleSetCollectionItem
					}
				/>
				{isTVShowItem && <TVSeasonsList seasonsList={seasons || []} />}
				<ImagesList images={images} />
				<ReviewList
					reviewedItemId={id}
					collectionType={collectionType}
					reviews={reviews}
				/>
				<NewReviewForm
					reviewedItemId={id}
					userId={userId}
					reviewedItemCollectionType={collectionType}
				/>
				{video && (
					<div className='mt-16'>
						<Title>Trailer</Title>
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${video}`}
							controls={true}
							width={'100%'}
							height={'auto'}
							style={{
								aspectRatio: '16/9',
							}}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default MovieOrTVShowBasicInfo
