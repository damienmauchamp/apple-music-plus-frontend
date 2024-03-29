import React, { useEffect, useState } from 'react'
import { Song } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import SongsListSection from '../LayoutComponents/SongsListSection/SongsListSection'

export interface NewSongsSectionProps {
	data?: Song[]
	list?: boolean

	id?: string
	title?: string
	scroll?: boolean
	rows?: number
	header?: boolean
}

function NewSongsSection({
	data = [] as Song[],
	list = false,
	...props
}: NewSongsSectionProps) {
	const api = useAPI()
	const from = getFrom()

	const hasData = Boolean(data.length)

	const [newSongs, setNewSongs] = useState<Song[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [newSongsLoaded, setNewSongsLoaded] = useState<boolean>(false)

	console.log('[NewSongsSection] data:', data, {
		hasData,
		newSongs,
		isLoading,
		newSongsLoaded,
	})

	const loadNewSongs = async () => {
		console.log('[NewSongsSection] loadNewSongs', {
			hasData: hasData,
			isLoading: isLoading,
		})

		if (!hasData && !newSongsLoaded) {
			const res = await api.getNewSongs(from)
			setNewSongs(res.data.data)
		}
		setNewSongsLoaded(true)
	}

	useEffect(() => {
		if (newSongsLoaded) setIsLoading(false)
	}, [newSongsLoaded])

	useEffect(() => {
		loadNewSongs()
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
			id={props.id || 'newSongs'}
			title={props.title || 'New Songs'}
			key={props.id || 'newSongs'}
			items={newSongs}
			loading={isLoading} // todo
			seeAllPath={'/new-songs'} // todo : new page
			{...sectionProps()}
		/>
	)
}

export default NewSongsSection
