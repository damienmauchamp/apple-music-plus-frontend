import React, { useEffect, useState } from 'react'
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

	const loadUpcomingSongs = async () => {
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
				...props,
				rows: props.rows || 4,
				scroll: props.scroll !== undefined ? props.scroll : true,
				seeAllPath: '/new-songs', // todo : new page
			}

		return {
			...props,
			header: props.header !== undefined ? props.header : false,
		}
	}

	return (
		<SongsListSection
			{...props}
			id={props.id || 'upcomingSongs'}
			title={props.title}
			key={props.id || 'upcomingSongs'}
			items={upcomingSongs}
			loading={isLoading} // todo
			{...sectionProps()}
		/>
	)
}

export default UpcomingSongsSection
