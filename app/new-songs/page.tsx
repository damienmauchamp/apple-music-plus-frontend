'use client'
import useAPI from '@/lib/useAPI'
import useAuth from '@/lib/useAuth'
import Loading from '@/src/components/Components/Loading/Loading'
import SongsListSection from '@/src/components/LayoutComponents/SongsListSection/SongsListSection'
import PageNavigation from '@/src/components/Pages/PageNavigation/PageNavigation'
import { Song } from '@/types/Items'
import moment from 'moment'
import { useEffect, useState } from 'react'

export default function Home() {
	// Hooks
	// const { logged } = useMusicKitContext()

	// Auth hook
	const { user, isLoading, hasTestToken } = useAuth({ middleware: 'auth' }) // todo : redirect to previous page after login
	const [ready, setReady] = useState<boolean>(false)
	const [newSongs, setNewSongs] = useState<Song[]>([])

	// API hook
	const api = useAPI()

	// API calls
	const from = moment().subtract(7, 'days').format('YYYY-MM-DD')

	const loadNewSongs = async () => {
		const res = await api.getNewSongs(from)
		setNewSongs(res.data.data)
	}
	const loadData = () => {
		if (!ready) return
		loadNewSongs()
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
		return <Loading subText="Loading new songs page" />
	}

	return (
		<PageNavigation title={'New Songs'} goBack={true} largeTitle={false}>
			<SongsListSection
				id={'newSongs'}
				title={'New Songs'}
				key={'newSongs'}
				items={newSongs}
				scroll={false}
				// rows={2}
				// seeAll={() => console.log('see all 1')}
			/>
		</PageNavigation>
	)
}
