'use client'
import useAuth from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import NewReleasesGridSection from '../../PageComponents/NewReleases/NewReleasesGridSection'
import PageNavigation from '../PageNavigation/PageNavigation'

interface NewReleasesGridPageProps {}
export default function NewReleasesGridPage({}: NewReleasesGridPageProps) {
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
		return <Loading subText="Loading new releases page" />
	}

	return (
		<PageNavigation title={'New Releases'} goBack={true} largeTitle={true}>
			<NewReleasesGridSection />
		</PageNavigation>
	)
}
