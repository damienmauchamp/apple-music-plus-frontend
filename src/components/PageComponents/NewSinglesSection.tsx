import React, { useEffect, useState } from 'react'
import { Album } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import AlbumsGridSection from '../LayoutComponents/AlbumsGridSection/AlbumsGridSection'

export interface NewSinglesSection {
	data?: Album[]
}

function NewSinglesSection({ data = [] as Album[] }: NewSinglesSection) {
	const api = useAPI()
	const from = getFrom()

	const hasData = Boolean(data.length)

	const [newSingles, setNewSingles] = useState<Album[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [newSinglesLoaded, setNewSinglesLoaded] = useState<boolean>(false)

	console.log('[NewSinglesSection] data:', data, {
		hasData,
		newSingles,
		isLoading,
		newSinglesLoaded,
	})

	const loadNewSingles = async () => {
		console.log('[NewSinglesSection] loadNewSingles', {
			hasData: hasData,
			isLoading: isLoading,
		})

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

	return (
		<AlbumsGridSection
			id={'newSingles'}
			title={'New Singles'}
			key={'newSingles'}
			items={newSingles}
			scroll={true}
			// mobileScroll={true}
			rows={2}
			loading={isLoading} // todo
			seeAllPath={'/new-singles'} // todo : new page
			// seeAll={() => console.log('see all 1')}
		/>
	)
}

export default NewSinglesSection
