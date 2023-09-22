import React, { FC } from 'react'
import Image from '../../../components/Images/Image'
import defaultMovieImage from '@/app/assets/images/default-movie-image.svg'
import {
	faBolt,
	faCalendarCheck,
	faFlag,
} from '@fortawesome/free-solid-svg-icons'
import Button from '../../../app/components/UI/Button'
import Genre from '../../../components/Genre'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	IBackdrop,
	IMovieCard,
	IMovieInfo,
	IReview,
} from '../../../../interfaces'
import ImagesList from '../../../components/Images/ImagesList'
import Rating from '../../../components/Rating'
import Mark from '../../../components/Mark'
import ReviewsList from '../../Review/ReviewsList'
import NewReviewForm from '../../Review/NewReviewForm'
import Title from '../../../app/components/UI/Title/Title'
import { setNewFavoriteMovie } from '@/firebase/config'
import { useAuth } from '@/context/AuthProvider'
import { useModal } from '@/context/ModalProvider'
import { openLoginModal } from '@/handlers/openLoginModal'

type PropsType = {
	movieInfo: IMovieInfo
	movieImages: Array<IBackdrop>
	movieReviews: Array<IReview>
}

const MovieInfo: FC<PropsType> = ({ movieInfo, movieImages, movieReviews }) => {
	const { currentUser } = useAuth()
	const { showModal } = useModal()
	const isLoggedIn = currentUser !== null

	const setFavoriteMovie = (movie: IMovieCard) => {
		if (isLoggedIn) {
			const newMovie: IMovieCard = {
				id: movie.id,
				poster_path: movie.poster_path,
				release_date: movie.release_date,
				title: movie.title,
				genre_ids: movie.genre_ids,
				genres: movie.genres,
			}
			setNewFavoriteMovie(newMovie, currentUser.uid)
		} else openLoginModal(showModal)
	}

	return (
		<div className='flex gap-x-7 py-7'>
			<div className='w-full max-w-[340px]'>
				<Image
					src={`https://image.tmdb.org/t/p/w440_and_h660_face${movieInfo.poster_path}`}
					defaultImage={defaultMovieImage}
				/>
			</div>
			<div className='w-full'>
				<Title className='text-7xl'>{movieInfo.title}</Title>
				{movieInfo.tagline && (
					<Title variant='h2' className='text-slate-400'>
						{movieInfo.tagline}
					</Title>
				)}
				{movieInfo.adult && <span>{movieInfo.adult}</span>}
				<div className='flex mb-5'>
					{movieInfo.genres.map((item, idx) => {
						return <Genre key={idx} genre={item} />
					})}
				</div>
				<div className='mb-5'>
					<div className='flex items-center text-sm'>
						<FontAwesomeIcon
							className='mr-1.5'
							icon={faCalendarCheck}
						/>
						<span className='mr-1.5'>Release date:</span>
						{new Intl.DateTimeFormat('en-GB', {
							month: 'long',
							day: '2-digit',
							year: 'numeric',
						}).format(new Date(movieInfo.release_date))}
					</div>
					<div className='flex items-center text-sm'>
						<FontAwesomeIcon className='mr-1.5' icon={faFlag} />
						<span className='mr-1.5'>Production countries:</span>
						{movieInfo.production_countries.map((item, idx) => {
							return (
								<span className='mr-1' key={item.name}>
									{idx ===
									movieInfo.production_countries.length - 1
										? item.name
										: item.name + ','}
								</span>
							)
						})}
					</div>
					<div className='flex items-center text-sm flex-wrap'>
						<FontAwesomeIcon className='mr-1.5' icon={faBolt} />
						<span className='mr-1.5'>Production companies:</span>
						{movieInfo.production_companies.map((item, idx) => {
							return (
								<span className='mr-1' key={item.name}>
									{idx ===
									movieInfo.production_companies.length - 1
										? item.name
										: item.name + ','}
								</span>
							)
						})}
					</div>
				</div>
				<Rating
					rating={movieInfo.vote_average}
					voteCount={movieInfo.vote_count}
				/>
				<Mark movieId={movieInfo.id} />
				<p className='mb-6'>{movieInfo.overview}</p>
				<Button
					className='mb-12'
					onClick={() => setFavoriteMovie(movieInfo)}
				>
					Add to favorites
				</Button>
				<ImagesList images={movieImages} />
				<ReviewsList reviews={movieReviews} />
				<NewReviewForm />
			</div>
		</div>
	)
}

export default MovieInfo
