'use client'
import useAuth from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import NewSongsListSection from '../../PageComponents/NewSongs/NewSongsListSection'
import PageNavigation from '../PageNavigation/PageNavigation'

interface NewSongsListPageProps {}
export default function NewSongsListPage({}: NewSongsListPageProps) {
	// Auth hook
	const { user, isLoading, hasTestToken } = useAuth({
		middleware: 'auth',
	})

	// State
	const [ready, setReady] = useState<boolean>(false)

	useEffect(() => {
		if (!isLoading) {
			setReady(true)
		}
	}, [isLoading, user, hasTestToken])

	if (!ready) {
		return <Loading subText="Loading new songs page" />
	}

	return (
		<PageNavigation title={'New Songs'} goBack={true} largeTitle={true}>
			<NewSongsListSection header />
		</PageNavigation>
	)
}
