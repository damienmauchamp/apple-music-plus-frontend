import React, { useCallback, useEffect, useState } from 'react'
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
	const [newReleasesLoading, setNewReleasesLoading] = useState<boolean>(false)
	const [newReleasesLoaded, setNewReleasesLoaded] = useState<boolean>(false)

	const loadNewReleases = useCallback(
		async (signal?: AbortSignal) => {
			try {
				if (!hasData && !newReleasesLoaded && !newReleasesLoading) {
					const res = await api.getNewReleases(from, { signal })
					setNewReleases(res.data.data)
					setNewReleasesLoading(true)
				}
				setNewReleasesLoaded(true)
			} catch (error) {
				if (!api.isCancel(error)) throw error
			} finally {
				setNewReleasesLoading(false)
			}
		},
		[api, from, hasData, newReleasesLoaded, newReleasesLoading]
	)

	useEffect(() => {
		if (newReleasesLoaded) setIsLoading(false)
	}, [newReleasesLoaded])

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		try {
			loadNewReleases(signal)
		} catch (error) {
			if (!api.isCancel(error)) console.error(error)
		}

		return () => {
			// Cancel the request when the component unmounts
			abortController.abort()
		}
	}, [loadNewReleases, api])

	const sectionProps = useCallback(() => {
		if (!grid)
			return {
				...props,
				rows: props.rows || 2,
				seeAllPath: '/new-releases', // todo : new page
				mobileScroll: true,
			}

		return { ...props, mobileScroll: false }
	}, [props, grid])

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
