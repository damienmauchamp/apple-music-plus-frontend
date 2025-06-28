import useAPI from '@/lib/useAPI'
import { getFromViaWeeks, getToViaWeeks } from '@/src/helpers/releases'
import { Album } from '@/types/Items'
import { useCallback, useEffect, useMemo, useState } from 'react'
import AlbumsSection from '../../LayoutComponents/AlbumsSection/AlbumsSection'
import { pagePtrSectionEl } from '../../PagesType/F7Page'

export interface NewSinglesSectionProps {
	data?: Album[]
	grid?: boolean

	id?: string
	title?: string
	rows?: number

	newNav?: boolean
	full?: boolean

	weeks?: number
}

function NewSinglesSection({
	data = [] as Album[],
	grid = false,
	weeks = 0,
	title,
	...props
}: NewSinglesSectionProps) {
	const api = useAPI()
	// const from = getFrom()
	const from = getFromViaWeeks(weeks)

	const params = useMemo(
		() =>
			weeks
				? {
					// weekly: 1,
					// weeks: weeks * -1,
					weekly: 0,
					to: getToViaWeeks(weeks),
					}
				: {},
		[weeks]
	)
	if (!title && weeks) {
		// title = `${weeks} week${weeks > 1 ? 's' : ''} ago`
		title = getFromViaWeeks(weeks, 'll')
	}

	console.log('weeks;', weeks)

	const hasData = Boolean(data.length)

	const [newSingles, setNewSingles] = useState<Album[]>(data)
	const [isLoading, setIsLoading] = useState<boolean>(!hasData)
	const [newSinglesLoading, setNewSinglesLoading] = useState<boolean>(false)
	const [newSinglesLoaded, setNewSinglesLoaded] = useState<boolean>(false)

	// region pull to refresh
	const [isReloading, setIsReloading] = useState(false)
	const reload = () => {
		setIsReloading(true)
		setNewSinglesLoaded(false)
		setIsLoading(true)
	}
	useEffect(() => {
		const pagePtrHandler = (e: Event) => {
			const event = e as CustomEvent
			const sectionEl = pagePtrSectionEl(props.id || 'newSingles')

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

	const loadNewSingles = useCallback(
		async (signal?: AbortSignal) => {
			try {
				if (
					!hasData &&
					(!newSinglesLoaded || isReloading) &&
					!newSinglesLoading
				) {
					const parameters = isReloading
						? { ...params, 'no-cache': 1 }
						: params
					const res = await api.getNewSingles(from, parameters, {
						signal,
					})
					setNewSingles(res.data.data)
					setNewSinglesLoading(true)
				}
				setNewSinglesLoaded(true)
			} catch (error) {
				if (!api.isCancel(error)) throw error
			} finally {
				setNewSinglesLoading(false)
				setIsReloading(false)
			}
		},
		[
			api,
			from,
			params,
			hasData,
			newSinglesLoading,
			newSinglesLoaded,
			isReloading,
		]
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
			if (!api.isCancel(error)) console.error(error)
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
			title={title}
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
