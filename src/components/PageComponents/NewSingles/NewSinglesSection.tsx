import React, { useCallback, useEffect, useState } from 'react'
import { Album } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import AlbumsSection from '../../LayoutComponents/AlbumsSection/AlbumsSection'

export interface NewSinglesSectionProps {
	data?: Album[]
	grid?: boolean

	id?: string
	title?: string
	rows?: number

	newNav?: boolean
}

function NewSinglesSection({
	data = [] as Album[],
	grid = false,
	...props
}: NewSinglesSectionProps) {
	const api = useAPI()
	const from = getFrom()

	const hasData = Boolean(data.length)

	const [newSingles, setNewSingles] = useState<Album[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [newSinglesLoading, setNewSinglesLoading] = useState<boolean>(false)
	const [newSinglesLoaded, setNewSinglesLoaded] = useState<boolean>(false)

	const loadNewSingles = useCallback(
		async (signal?: AbortSignal) => {
			try {
				if (!hasData && !newSinglesLoaded && !newSinglesLoading) {
					const res = await api.getNewSingles(from, { signal })
					setNewSingles(res.data.data)
					setNewSinglesLoading(true)
				}
				setNewSinglesLoaded(true)
				setNewSinglesLoading(false)
			} catch (error) {
				if (!api.isCancel(error)) throw error
			}
		},
		[api, from, hasData, newSinglesLoading, newSinglesLoaded]
	)

	useEffect(() => {
		if (newSinglesLoaded) setIsLoading(false)
	}, [newSinglesLoaded])

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		try {
			loadNewSingles(signal)
		} catch (error) {
			if (!api.isCancel(error)) {
				console.error(error)
			}
		}

		return () => {
			// Cancel the request when the component unmounts
			abortController.abort()
		}
	}, [loadNewSingles, api])

	const sectionProps = useCallback(() => {
		if (!grid)
			return {
				...props,
				rows: props.rows || 2,
				seeAllPath: '/new-singles', // todo : new page
				// mobileScroll: true,
				scroll: true,
			}

		return { ...props, scroll: false }
	}, [props, grid])

	return (
		<AlbumsSection
			id={props.id || 'newSingles'}
			title={props.title}
			key={props.id || 'newSingles'}
			items={newSingles}
			// mobileScroll={true}
			loading={isLoading} // todo
			grid={grid} // todo
			{...sectionProps()}
		/>
	)
}

export default NewSinglesSection
