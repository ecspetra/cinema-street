import Title from '@/app/components/UI/Title/Title'
import InputField from '@/app/components/UI/Input/InputField'
import React, { ChangeEvent, FC, useState } from 'react'
import { ERROR_MESSAGES } from '@/constants/errorMessages'
import Loader from '@/components/Loader'
import Button from '@/app/components/UI/Button'
import Error from '@/app/components/UI/Error'
import SelectOption from '@/app/components/UI/Input/Select/SelectOption'
import Select from '@/app/components/UI/Input/Select'
import FilterTagList from '@/components/Tag/FilterTagList'
import Search from '@/app/components/UI/Search'
import { generateYearsList } from '@/handlers/generateYearsList'
import Checkbox from '../UI/Input/Checkbox'
import { FilterFields } from '@/constants/enum'
import Tag from '@/components/Tag'
import { LINK_TO_SEARCH_LIST_ITEMS } from '@/constants/linksToFetch'

type PropsType = {
	onApply: (formData: FilterFormData) => void
	type: 'movie' | 'person'
	fields: (keyof FilterFormData)[]
}

interface FilterFormData {
	primary_release_year: number
	first_air_date_year: number
	include_adult: boolean
	vote_average: number
	with_people: Array<string>
	with_companies: Array<string>
	with_genres: Array<string>
	with_origin_country: string
	with_keywords: Array<string>
}

const Filter: FC<PropsType> = ({ onApply, type, fields }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isTouched, setIsTouched] = useState<boolean>(false)
	const [formData, setFormData] = useState<FilterFormData>({})
	const [error, setError] = useState<string>('')
	const releaseYears = generateYearsList(1930)
	console.log(formData)

	const handleSelectChange = (field: keyof FilterFormData, value: any) => {
		setIsTouched(true)
		setFormData(prevData => ({ ...prevData, [field]: value }))
	}

	const handleArrayFieldChange = (
		field: keyof FilterFormData,
		value: object
	) => {
		setIsTouched(true)
		setFormData(prevData => {
			const currentValue = prevData[field]

			const updatedArray = Array.isArray(currentValue)
				? [...currentValue, value]
				: [value]
			return { ...prevData, [field]: updatedArray }
		})
	}

	const handleStringFieldChange = (
		field: keyof FilterFormData,
		value: string
	) => {
		setIsTouched(true)
		setFormData(prevData => ({ ...prevData, [field]: value }))
	}

	const handleBooleanFieldChange = (
		field: keyof FilterFormData,
		value: boolean
	) => {
		setIsTouched(true)
		setFormData(prevData => {
			const updatedData = {
				...prevData,
				[field]: value,
			}

			if (!value) {
				const { [field]: removedField, ...restData } = updatedData
				return restData
			}

			return updatedData
		})
	}

	const handleRemoveFilterTag = (tag: any) => {
		setFormData(prevData => {
			const currentValue = prevData[tag.field]

			const updatedArray = Array.isArray(currentValue)
				? currentValue.filter(item => item.name !== tag.name)
				: []

			const updatedData = { ...prevData, [tag.field]: updatedArray }

			if (updatedArray.length === 0) {
				const { [tag.field]: removedField, ...restData } = updatedData
				return restData
			}

			return updatedData
		})
	}

	const handleToggleTag = (field: keyof FilterFormData, tag, isChecked) => {
		setIsTouched(true)

		setFormData(prevData => {
			const currentValue = prevData[field]

			if (isChecked) {
				const updatedArray = Array.isArray(currentValue)
					? currentValue.filter(item => item.name !== tag.name)
					: []

				const updatedData = { ...prevData, [field]: updatedArray }
				if (updatedArray.length === 0) {
					const { [field]: removedField, ...restData } = updatedData
					return restData
				}

				return updatedData
			} else {
				const updatedArray = Array.isArray(currentValue)
					? [...currentValue, tag]
					: [tag]
				return { ...prevData, [field]: updatedArray }
			}
		})
	}

	const getQuery = () => {
		let queryArray = []

		for (const key in formData) {
			if (formData.hasOwnProperty(key)) {
				const value = formData[key]

				if (Array.isArray(value)) {
					queryArray.push(
						`${key}=${value.map(item => item?.id).join(',')}`
					)
				} else if (
					typeof value === 'string' ||
					typeof value === 'boolean'
				) {
					queryArray.push(`${key}=${value || ''}`)
				}
			}
		}

		return queryArray.join('&').replace(/\s/g, '')
	}

	const handleSearch = async (event: React.FormEvent) => {
		event.preventDefault()
		setIsLoading(true)

		const isFormValid = true

		if (isFormValid && isTouched) {
			try {
				const query = getQuery()
				console.log(query)
				onApply(
					LINK_TO_SEARCH_LIST_ITEMS.replace('{type}', type).replace(
						'{searchQuery}',
						query
					)
				)
				setError('')
			} catch (error: any) {
				setError(error.toString())
			} finally {
				setIsLoading(false)
			}
		} else {
			setError(isFormValid ? '' : ERROR_MESSAGES.REQUIRED_FIELD)
			setIsLoading(false)
		}
	}

	const groupedFields = [
		'primary_release_year',
		'first_air_date_year',
		'vote_average',
		'with_people',
		'with_companies',
		'with_origin_country',
		'with_keywords',
	]

	const ungroupedFields = ['with_genres', 'include_adult']

	const getField = (field: keyof FilterFormData) => {
		switch (field) {
			case 'primary_release_year':
			case 'first_air_date_year':
				return (
					<Select
						key={field}
						label={FilterFields[field]}
						name={field}
						onChange={handleSelectChange}
					>
						{releaseYears.map((year, idx) => (
							<SelectOption
								key={year}
								value={year}
								label={year}
							/>
						))}
					</Select>
				)
			case 'with_people':
			case 'with_companies':
			case 'with_keywords':
				return (
					<Search
						key={field}
						name={field}
						label={FilterFields[field]}
						onSearch={handleArrayFieldChange}
					/>
				)
			case 'vote_average':
			case 'with_origin_country':
				return (
					<InputField
						key={field}
						id={field}
						label={FilterFields[field]}
						value={formData[field] || ''}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							handleStringFieldChange(field, e.target.value)
						}
					/>
				)
			case 'with_genres':
				return (
					<FilterTagList
						key={field}
						tags={formData[field]}
						onToggle={handleToggleTag}
						name={field}
					/>
				)
			case 'include_adult':
				return (
					<Checkbox
						key={field}
						name={field}
						label={FilterFields[field]}
						onToggle={handleBooleanFieldChange}
						isSelected={formData[field] !== undefined}
					/>
				)
		}
	}

	return (
		<div className='mb-16 bg-gray-950 p-4'>
			<Title>Filter</Title>
			<form onSubmit={handleSearch}>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
					{fields.map((field: keyof FilterFormData) => {
						if (groupedFields.includes(field))
							return getField(field)
					})}
				</div>
				<div>
					{fields.map((field: keyof FilterFormData) => {
						if (ungroupedFields.includes(field))
							return getField(field)
					})}
				</div>
				<div className='flex justify-start items-start border-t'>
					{Object.values(formData).map((value, idx) => {
						if (Array.isArray(value)) {
							return value.map(item => {
								return (
									<Tag
										key={item.name}
										tag={{
											name: item.name,
											field: Object.keys(formData)[idx],
										}}
										isEdit
										onRemove={handleRemoveFilterTag}
									/>
								)
							})
						} else {
							return (
								<Tag
									key={value}
									tag={{
										name:
											typeof value === 'boolean'
												? FilterFields[
														Object.keys(formData)[
															idx
														]
												  ]
												: value,
										field: Object.keys(formData)[idx],
									}}
									isEdit
									onRemove={handleRemoveFilterTag}
								/>
							)
						}
					})}
				</div>
				<Button className='mt-8 mx-auto' type='submit'>
					{isLoading ? <Loader isShowText type='static' /> : 'Apply'}
				</Button>
				{error && (
					<Error
						className='px-4 py-2 bg-rose-600/20 w-full rounded-md'
						error={error}
					/>
				)}
			</form>
		</div>
	)
}

export default Filter