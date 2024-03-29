import React, { useEffect, useState } from 'react'
import { Album } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import AlbumsGridSection from '../LayoutComponents/AlbumsGridSection/AlbumsGridSection'

export interface NewReleasesSection {
	data?: Album[]
}

function NewReleasesSection({ data = [] as Album[] }: NewReleasesSection) {
	const api = useAPI()
	const from = getFrom()

	const hasData = Boolean(data.length)

	const [newReleases, setNewReleases] = useState<Album[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [newReleasesLoaded, setNewReleasesLoaded] = useState<boolean>(false)

	console.log('[NewReleasesSection] data:', data, {
		hasData,
		newReleases,
		isLoading,
		newReleasesLoaded,
	})

	const loadNewReleases = async () => {
		console.log('[NewReleasesSection] loadNewReleases', {
			hasData: hasData,
			isLoading: isLoading,
		})

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

	return (
		<AlbumsGridSection
			id={'newReleases'}
			title={'New Releases'}
			key={'newReleases'}
			items={newReleases}
			scroll={false}
			mobileScroll={true}
			rows={2}
			loading={isLoading} // todo
			seeAllPath={'/new-releases'} // todo : new page
			// seeAll={() => console.log('see all 1')}
		/>
	)
}

export default NewReleasesSection
