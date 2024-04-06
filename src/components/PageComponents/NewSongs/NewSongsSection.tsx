import React, { useCallback, useEffect, useState } from 'react'
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

	newNav?: boolean
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
	const [newSongsLoading, setNewSongsLoading] = useState<boolean>(false)
	const [newSongsLoaded, setNewSongsLoaded] = useState<boolean>(false)

	const loadNewSongs = useCallback(
		async (signal?: AbortSignal) => {
			try {
				if (!hasData && !newSongsLoaded && !newSongsLoading) {
					const res = await api.getNewSongs(from, { signal })
					setNewSongs(res.data.data)
					setNewSongsLoading(true)
				}
				setNewSongsLoaded(true)
			} catch (error) {
				if (!api.isCancel(error)) throw error
			} finally {
				setNewSongsLoading(false)
			}
		},
		[api, from, hasData, newSongsLoading, newSongsLoaded]
	)

	useEffect(() => {
		if (newSongsLoaded) setIsLoading(false)
	}, [newSongsLoaded])

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		try {
			loadNewSongs(signal)
		} catch (error) {
			if (!api.isCancel(error)) console.error(error)
		}

		return () => {
			// Cancel the request when the component unmounts
			abortController.abort()
		}
	}, [loadNewSongs, api])

	const sectionProps = useCallback(() => {
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
	}, [header, list, props])

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
