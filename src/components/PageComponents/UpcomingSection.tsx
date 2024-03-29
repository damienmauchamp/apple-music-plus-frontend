import React, { useEffect, useState } from 'react'
import { Album } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import AlbumsGridSection from '../LayoutComponents/AlbumsGridSection/AlbumsGridSection'

export interface UpcomingSection {
	data?: Album[]
}

function UpcomingSection({ data = [] as Album[] }: UpcomingSection) {
	const api = useAPI()
	const from = getFrom()

	const hasData = Boolean(data.length)

	const [upcoming, setUpcoming] = useState<Album[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [upcomingLoaded, setUpcomingLoaded] = useState<boolean>(false)

	console.log('[UpcomingSection] data:', data, {
		hasData,
		upcoming,
		isLoading,
		upcomingLoaded,
	})

	const loadUpcoming = async () => {
		console.log('[UpcomingSection] loadUpcoming', {
			hasData: hasData,
			isLoading: isLoading,
		})

		if (!hasData && !upcomingLoaded) {
			const res = await api.getUpcoming(from)
			setUpcoming(res.data.data)
		}
		setUpcomingLoaded(true)
	}

	useEffect(() => {
		if (upcomingLoaded) setIsLoading(false)
	}, [upcomingLoaded])

	useEffect(() => {
		loadUpcoming()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<AlbumsGridSection
			id={'upcoming'}
			title={'Upcoming'}
			key={'upcoming'}
			items={upcoming}
			scroll={false}
			mobileScroll={true}
			rows={1}
			loading={isLoading} // todo
			seeAllPath={'/upcoming'} // todo : new page
		/>
	)
}

export default UpcomingSection
