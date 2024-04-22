import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Album } from '@/types/Items'
import { getFromViaWeeks, getToViaWeeks } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import AlbumsSection from '../../LayoutComponents/AlbumsSection/AlbumsSection'
import { pagePtrSectionEl } from '../../PagesType/F7Page'

export interface NewReleasesSectionProps {
	data?: Album[]
	grid?: boolean

	id?: string
	title?: string
	rows?: number

	newNav?: boolean
	full?: boolean

	weeks?: number
}

function NewReleasesSection({
	data = [] as Album[],
	grid = false,
	weeks = 0,
	title,
	...props
}: NewReleasesSectionProps) {
	const api = useAPI()
	// const from = getFrom()
	const from = getFromViaWeeks(weeks)
	const params = useMemo(
		() =>
			weeks
				? {
						// 	weekly: 1,
						// 	weeks: weeks * -1,
						weekly: 0,
						to: getToViaWeeks(weeks),
					}
				: {},
		[weeks]
	)
	if (!title && weeks) {
		title = getFromViaWeeks(weeks, 'll')
	}

	const hasData = Boolean(data.length)

	const [newReleases, setNewReleases] = useState<Album[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [newReleasesLoading, setNewReleasesLoading] = useState<boolean>(false)
	const [newReleasesLoaded, setNewReleasesLoaded] = useState<boolean>(false)

	// region pull to refresh
	const [isReloading, setIsReloading] = useState(false)
	const reload = () => {
		setIsReloading(true)
		setNewReleasesLoaded(false)
		setIsLoading(true)
	}
	useEffect(() => {
		const pagePtrHandler = (e: Event) => {
			const event = e as CustomEvent
			const sectionEl = pagePtrSectionEl(props.id || 'newReleases')

			if (
				!event.detail ||
				!event.detail.ref.el ||
				!event.detail.ref.el.contains(sectionEl)
			) {
				return
			}

			reload()
		}
		document.addEventListener('page-ptr', pagePtrHandler)
		return () => {
			document.removeEventListener('page-ptr', pagePtrHandler)
		}
	}, [props.id])
	// endregion pull to refresh

	const loadNewReleases = useCallback(
		async (signal?: AbortSignal) => {
			try {
				if (
					!hasData &&
					(!newReleasesLoaded || isReloading) &&
					!newReleasesLoading
				) {
					const parameters = isReloading
						? { ...params, 'no-cache': 1 }
						: params
					const res = await api.getNewReleases(from, parameters, {
						signal,
					})
					setNewReleases(res.data.data)
					setNewReleasesLoading(true)
				}
				setNewReleasesLoaded(true)
			} catch (error) {
				if (!api.isCancel(error)) throw error
			} finally {
				setNewReleasesLoading(false)
				setIsReloading(false)
			}
		},
		[
			api,
			from,
			params,
			hasData,
			newReleasesLoaded,
			newReleasesLoading,
			isReloading,
		]
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
			title={title}
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
