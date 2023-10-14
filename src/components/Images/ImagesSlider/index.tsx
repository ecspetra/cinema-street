import React, { FC } from 'react'
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../../../app/components/UI/Button/index'
import { IBackdrop } from '../../../../interfaces'
import useImagesSlider from '../../../hooks/useImagesSlider'
import defaultMovieImage from '../../../app/assets/images/default-movie-image.svg'
import Image from '../Image/index'

type PropsType = {
	images: Array<IBackdrop>
	initialSliderImageIdx: number
	isPersonImages?: boolean
}

const ImagesSlider: FC<PropsType> = ({
	images,
	initialSliderImageIdx,
	isPersonImages,
}) => {
	const { currentImageIdx, showNextImage, showPrevImage } = useImagesSlider(
		images,
		initialSliderImageIdx
	)

	return (
		<div>
			<Image
				className={isPersonImages ? 'aspect-[2/3]' : 'aspect-[215/121]'}
				src={`https://image.tmdb.org/t/p/original${images[currentImageIdx].file_path}`}
				defaultImage={defaultMovieImage}
			/>
			<Button
				context='icon'
				className='!absolute inset-y-1/2 -translate-y-1/2 right-4'
				onClick={showNextImage}
			>
				<FontAwesomeIcon icon={faChevronRight} className='w-6 h-6' />
			</Button>
			<Button
				context='icon'
				className='!absolute inset-y-1/2 -translate-y-1/2 left-4'
				onClick={showPrevImage}
			>
				<FontAwesomeIcon icon={faChevronLeft} className='w-6 h-6' />
			</Button>
		</div>
	)
}

export default ImagesSlider
