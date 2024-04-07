import React, { useCallback, useEffect, useState } from 'react'
import { Song } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import SongsListSection from '../../LayoutComponents/SongsSection/SongsListSection'

export interface UpcomingSongsSectionProps {
	data?: Song[]
	list?: boolean

	id?: string
	title?: string
	scroll?: boolean
	rows?: number
	header?: boolean

	newNav?: boolean
	full?: boolean
}

function UpcomingSongsSection({
	data = [] as Song[],
	list = false,
	...props
}: UpcomingSongsSectionProps) {
	const api = useAPI()
	const from = getFrom()

	const hasData = Boolean(data.length)

	const [upcomingSongs, setUpcomingSongs] = useState<Song[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [upcomingSongsLoading, setUpcomingSongsLoading] =
		useState<boolean>(false)
	const [upcomingSongsLoaded, setUpcomingSongsLoaded] =
		useState<boolean>(false)

	const loadUpcomingSongs = useCallback(
		async (signal?: AbortSignal) => {
			try {
				if (!hasData && !upcomingSongsLoaded && !upcomingSongsLoading) {
					const res = await api.getUpcomingSongs(from, { signal })
					setUpcomingSongs(res.data.data)
					setUpcomingSongsLoading(true)
				}
				setUpcomingSongsLoaded(true)
			} catch (error) {
				if (!api.isCancel(error)) throw error
			} finally {
				setUpcomingSongsLoading(false)
			}
		},
		[api, from, hasData, upcomingSongsLoading, upcomingSongsLoaded]
	)

	useEffect(() => {
		if (upcomingSongsLoaded) setIsLoading(false)
	}, [upcomingSongsLoaded])

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		try {
			loadUpcomingSongs(signal)
		} catch (error) {
			if (!api.isCancel(error)) console.error(error)
		}

		return () => {
			// Cancel the request when the component unmounts
			abortController.abort()
		}
	}, [loadUpcomingSongs, api])

	const sectionProps = useCallback(() => {
		if (!list)
			return {
				...props,
				rows: props.rows || 4,
				scroll: props.scroll !== undefined ? props.scroll : true,
				seeAllPath: '/new-songs', // todo : new page
			}

		return {
			...props,
			header: props.header !== undefined ? props.header : false,
		}
	}, [list, props])

	return (
		<SongsListSection
			{...props}
			id={props.id || 'upcomingSongs'}
			title={props.title}
			key={props.id || 'upcomingSongs'}
			items={upcomingSongs}
			loading={isLoading} // todo
			seeAllPath={'/upcoming-songs'} // todo : new page
			{...sectionProps()}
		/>
	)
}

export default UpcomingSongsSection
