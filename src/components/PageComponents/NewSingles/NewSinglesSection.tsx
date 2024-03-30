import React, { useEffect, useState } from 'react'
import { Album } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import AlbumsSection from '../../LayoutComponents/AlbumsSection/AlbumsSection'

export interface NewSinglesSectionProps {
	data?: Album[]
	grid?: boolean

	id?: string
	title?: string
	rows?: number
}

function NewSinglesSection({
	data = [] as Album[],
	grid = false,
	...props
}: NewSinglesSectionProps) {
	const api = useAPI()
	const from = getFrom()

	const hasData = Boolean(data.length)

	const [newSingles, setNewSingles] = useState<Album[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [newSinglesLoaded, setNewSinglesLoaded] = useState<boolean>(false)

	const loadNewSingles = async () => {
		if (!hasData && !newSinglesLoaded) {
			const res = await api.getNewSingles(from)
			setNewSingles(res.data.data)
		}
		setNewSinglesLoaded(true)
	}

	useEffect(() => {
		if (newSinglesLoaded) setIsLoading(false)
	}, [newSinglesLoaded])

	useEffect(() => {
		loadNewSingles()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const sectionProps = () => {
		if (!grid)
			return {
				...props,
				rows: props.rows || 2,
				seeAllPath: '/new-singles', // todo : new page
				// mobileScroll: true,
				scroll: true,
			}

		return { ...props, scroll: false }
	}

	return (
		<AlbumsSection
			id={props.id || 'newSingles'}
			title={props.title}
			key={props.id || 'newSingles'}
			items={newSingles}
			// mobileScroll={true}
			loading={isLoading} // todo
			grid={grid} // todo
			{...sectionProps()}
		/>
	)
}

export default NewSinglesSection
