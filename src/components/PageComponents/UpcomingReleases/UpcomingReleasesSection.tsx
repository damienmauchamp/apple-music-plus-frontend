import React, { useCallback, useEffect, useState } from 'react'
import { Album } from '@/types/Items'
import { getFrom } from '@/src/helpers/releases'
import useAPI from '@/lib/useAPI'
import AlbumsSection from '../../LayoutComponents/AlbumsSection/AlbumsSection'
import { pagePtrSectionEl } from '../../PagesType/F7Page'

export interface UpcomingReleasesSectionProps {
	data?: Album[]
	grid?: boolean

	id?: string
	title?: string
	rows?: number

	newNav?: boolean
	full?: boolean
}

function UpcomingReleasesSection({
	data = [] as Album[],
	grid = false,
	...props
}: UpcomingReleasesSectionProps) {
	const api = useAPI()
	const from = getFrom()

	const hasData = Boolean(data.length)

	const [upcomingReleases, setUpcomingReleases] = useState<Album[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [upcomingReleasesLoading, setUpcomingReleasesLoading] =
		useState<boolean>(false)
	const [upcomingReleasesLoaded, setUpcomingReleasesLoaded] =
		useState<boolean>(false)

	// region pull to refresh
	const [isReloading, setIsReloading] = useState(false)
	const reload = () => {
		setIsReloading(true)
		setUpcomingReleasesLoaded(false)
		setIsLoading(true)
	}
	useEffect(() => {
		const pagePtrHandler = (e: Event) => {
			const event = e as CustomEvent
			const sectionEl = pagePtrSectionEl(props.id || 'upcomingReleases')

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

	const loadUpcomingReleases = useCallback(
		async (signal?: AbortSignal) => {
			try {
				if (
					!hasData &&
					(!upcomingReleasesLoaded || isReloading) &&
					!upcomingReleasesLoading
				) {
					const parameters = isReloading ? { 'no-cache': 1 } : {}
					const res = await api.getUpcomingReleases(
						from,
						parameters,
						{ signal }
					)
					setUpcomingReleases(res.data.data)
					setUpcomingReleasesLoading(true)
				}
				setUpcomingReleasesLoaded(true)
			} catch (error) {
				if (!api.isCancel(error)) throw error
			} finally {
				setUpcomingReleasesLoading(false)
				setIsReloading(false)
			}
		},
		[
			api,
			from,
			hasData,
			upcomingReleasesLoading,
			upcomingReleasesLoaded,
			isReloading,
		]
	)

	useEffect(() => {
		if (upcomingReleasesLoaded) setIsLoading(false)
	}, [upcomingReleasesLoaded])

	useEffect(() => {
		const abortController = new AbortController()
		const signal = abortController.signal

		try {
			loadUpcomingReleases(signal)
		} catch (error) {
			if (!api.isCancel(error)) console.error(error)
		}

		return () => {
			// Cancel the request when the component unmounts
			abortController.abort()
		}
	}, [loadUpcomingReleases, api])

	const sectionProps = useCallback(() => {
		if (!grid)
			return {
				...props,
				rows: props.rows || 1,
				seeAllPath: '/upcoming-releases', // todo : new page
				mobileScroll: true,
			}

		return { ...props, mobileScroll: false }
	}, [props, grid])

	return (
		<AlbumsSection
			id={props.id || 'upcomingReleases'}
			title={props.title}
			key={props.id || 'upcomingReleases'}
			items={upcomingReleases}
			scroll={false}
			loading={isLoading} // todo
			grid={grid} // todo
			{...sectionProps()}
		/>
	)
}

export default UpcomingReleasesSection
