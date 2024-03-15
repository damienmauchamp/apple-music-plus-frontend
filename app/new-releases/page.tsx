'use client'
import useAPI from '@/lib/useAPI'
import useAuth from '@/lib/useAuth'
import AlbumsGridSection from '@/src/components/LayoutComponents/AlbumsGridSection/AlbumsGridSection'
import PageNavigation from '@/src/components/Pages/PageNavigation/PageNavigation'
import { Album } from '@/types/Items'
import moment from 'moment'
import { useEffect, useState } from 'react'

export default function Home() {
	// Hooks
	// const { logged } = useMusicKitContext()

	// Auth hook
	const { user, isLoading, hasTestToken } = useAuth({ middleware: 'auth' }) // todo : redirect to previous page after login
	const [ready, setReady] = useState<boolean>(false)
	const [newReleases, setNewReleases] = useState<Album[]>([])

	// API hook
	const api = useAPI()

	// API calls
	const from = moment().subtract(7, 'days').format('YYYY-MM-DD')

	const loadNewSingles = async () => {
		const res = await api.getNewReleases(from)
		setNewReleases(res.data.data)
	}
	const loadData = () => {
		if (!ready) return
		loadNewSingles()
	}

	useEffect(() => {
		if (!isLoading && (user || hasTestToken)) {
			setReady(true)
		}
	}, [isLoading, user, hasTestToken])

	useEffect(() => {
		// if (ready) {
		loadData()
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ready])

	if (isLoading || !(user || hasTestToken)) {
		return <>Loading...</>
	}

	return (
		<PageNavigation title={'New Releases'} goBack={true} largeTitle={false}>
			<AlbumsGridSection
				id={'newReleases'}
				title={'New Releases'}
				key={'newReleases'}
				items={newReleases}
				scroll={false}
				mobileScroll={false}
				// rows={2}
				// seeAll={() => console.log('see all 1')}
			/>
		</PageNavigation>
	)
}
