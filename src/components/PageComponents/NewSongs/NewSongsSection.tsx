import React, { useEffect, useState } from 'react'
import { Song } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import SongsListSection from '../../LayoutComponents/SongsSection/SongsListSection'

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
	header = false,
	...props
}: NewSongsSectionProps) {
	const api = useAPI()
	const from = getFrom()

	const hasData = Boolean(data.length)

	const [newSongs, setNewSongs] = useState<Song[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [newSongsLoaded, setNewSongsLoaded] = useState<boolean>(false)

	const loadNewSongs = async () => {
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
				...props,
				header: header,
				rows: props.rows || 4,
				scroll: props.scroll !== undefined ? props.scroll : true,
			}

		return {
			...props,
			header: header,
			scroll: false,
		}
	}

	return (
		<SongsListSection
			{...props}
			id={props.id || 'newSongs'}
			title={props.title}
			key={props.id || 'newSongs'}
			items={newSongs}
			loading={isLoading} // todo
			seeAllPath={'/new-songs'} // todo : new page
			{...sectionProps()}
		/>
	)
}

export default NewSongsSection
