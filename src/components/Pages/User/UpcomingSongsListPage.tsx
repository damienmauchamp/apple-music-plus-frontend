'use client'
import useAuth from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import UpcomingSongsListSection from '../../PageComponents/UpcomingSongs/UpcomingSongsListSection'
import PageNavigation from '../PageNavigation/PageNavigation'

interface UpcomingSongsListPageProps {}
export default function UpcomingSongsListPage({}: UpcomingSongsListPageProps) {
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
		return <Loading subText="Loading upcoming songs page" />
	}

	return (
		<PageNavigation
			title={'Upcoming Songs'}
			goBack={true}
			largeTitle={true}
		>
			<UpcomingSongsListSection header />
		</PageNavigation>
	)
}
