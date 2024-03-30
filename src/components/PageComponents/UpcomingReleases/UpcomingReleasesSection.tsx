import React, { useEffect, useState } from 'react'
import { Album } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import AlbumsSection from '../../LayoutComponents/AlbumsSection/AlbumsSection'

export interface UpcomingReleasesSectionProps {
	data?: Album[]
	grid?: boolean

	id?: string
	title?: string
	rows?: number
}

function UpcomingReleasesSection({
	data = [] as Album[],
	grid = false,
	...props
}: UpcomingReleasesSectionProps) {
	const api = useAPI()
	const from = getFrom()

	const hasData = Boolean(data.length)

	const [upcomingReleases, setUpcomingReleases] = useState<Album[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [upcomingReleasesLoaded, setUpcomingReleasesLoaded] =
		useState<boolean>(false)

	const loadUpcomingReleases = async () => {
		if (!hasData && !upcomingReleasesLoaded) {
			const res = await api.getUpcomingReleases(from)
			setUpcomingReleases(res.data.data)
		}
		setUpcomingReleasesLoaded(true)
	}

	useEffect(() => {
		if (upcomingReleasesLoaded) setIsLoading(false)
	}, [upcomingReleasesLoaded])

	useEffect(() => {
		loadUpcomingReleases()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const sectionProps = () => {
		if (!grid)
			return {
				...props,
				rows: props.rows || 1,
				seeAllPath: '/upcoming-releases', // todo : new page
				mobileScroll: true,
			}

		return { ...props, mobileScroll: false }
	}

	return (
		<AlbumsSection
			id={props.id || 'upcomingReleases'}
			title={props.title}
			key={props.id || 'upcomingReleases'}
			items={upcomingReleases}
			scroll={false}
			loading={isLoading} // todo
			grid={grid} // todo
			{...sectionProps()}
		/>
	)
}

export default UpcomingReleasesSection
