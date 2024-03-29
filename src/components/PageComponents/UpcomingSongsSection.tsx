import React, { useEffect, useState } from 'react'
import { Song } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import SongsListSection from '../LayoutComponents/SongsListSection/SongsListSection'

export interface UpcomingSongsSectionProps {
	data?: Song[]
	list?: boolean

	id?: string
	title?: string
	scroll?: boolean
	rows?: number
	header?: boolean
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
	const [upcomingSongsLoaded, setUpcomingSongsLoaded] =
		useState<boolean>(false)

	console.log('[UpcomingSongsSection] data:', data, {
		hasData,
		upcomingSongs,
		isLoading,
		upcomingSongsLoaded,
	})

	const loadUpcomingSongs = async () => {
		console.log('[UpcomingSongsSection] loadUpcomingSongs', {
			hasData: hasData,
			isLoading: isLoading,
		})

		if (!hasData && !upcomingSongsLoaded) {
			const res = await api.getUpcomingSongs(from)
			setUpcomingSongs(res.data.data)
		}
		setUpcomingSongsLoaded(true)
	}

	useEffect(() => {
		if (upcomingSongsLoaded) setIsLoading(false)
	}, [upcomingSongsLoaded])

	useEffect(() => {
		loadUpcomingSongs()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const sectionProps = () => {
		if (!list)
			return {
				rows: props.rows || 4,
				scroll: props.scroll !== undefined ? props.scroll : true,
			}

		return { header: props.header !== undefined ? props.header : false }
	}

	return (
		<SongsListSection
			{...props}
			id={props.id || 'upcomingSongs'}
			title={props.title || 'Upcoming Songs'}
			key={props.id || 'upcomingSongs'}
			items={upcomingSongs}
			loading={isLoading} // todo
			seeAllPath={'/new-songs'} // todo : new page
			{...sectionProps()}
		/>
	)
}

export default UpcomingSongsSection
