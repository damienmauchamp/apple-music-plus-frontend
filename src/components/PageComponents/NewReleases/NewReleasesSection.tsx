import React, { useEffect, useState } from 'react'
import { Album } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import AlbumsSection from '../../LayoutComponents/AlbumsSection/AlbumsSection'

export interface NewReleasesSectionProps {
	data?: Album[]
	grid?: boolean

	id?: string
	title?: string
	rows?: number

	newNav?: boolean
}

function NewReleasesSection({
	data = [] as Album[],
	grid = false,
	...props
}: NewReleasesSectionProps) {
	const api = useAPI()
	const from = getFrom()

	const hasData = Boolean(data.length)

	const [newReleases, setNewReleases] = useState<Album[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [newReleasesLoaded, setNewReleasesLoaded] = useState<boolean>(false)

	const loadNewReleases = async () => {
		if (!hasData && !newReleasesLoaded) {
			const res = await api.getNewReleases(from)
			setNewReleases(res.data.data)
		}
		setNewReleasesLoaded(true)
	}

	useEffect(() => {
		if (newReleasesLoaded) setIsLoading(false)
	}, [newReleasesLoaded])

	useEffect(() => {
		loadNewReleases()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const sectionProps = () => {
		if (!grid)
			return {
				...props,
				rows: props.rows || 2,
				seeAllPath: '/new-releases', // todo : new page
				mobileScroll: true,
			}

		return { ...props, mobileScroll: false }
	}

	return (
		<AlbumsSection
			id={props.id || 'newReleases'}
			title={props.title}
			key={props.id || 'newReleases'}
			items={newReleases}
			scroll={false}
			loading={isLoading} // todo
			grid={grid} // todo
			{...sectionProps()}
		/>
	)
}

export default NewReleasesSection
