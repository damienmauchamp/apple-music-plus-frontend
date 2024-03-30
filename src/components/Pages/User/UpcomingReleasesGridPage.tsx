'use client'
import useAuth from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import UpcomingReleasesGridSection from '../../PageComponents/UpcomingReleases/UpcomingReleasesGridSection'
import PageNavigation from '../PageNavigation/PageNavigation'

interface UpcomingReleasesGridPageProps {}
export default function UpcomingReleasesGridPage({}: UpcomingReleasesGridPageProps) {
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
		return <Loading subText="Loading upcoming releases page" />
	}

	return (
		<PageNavigation title={'Upcoming'} goBack={true} largeTitle={true}>
			<UpcomingReleasesGridSection />
		</PageNavigation>
	)
}
