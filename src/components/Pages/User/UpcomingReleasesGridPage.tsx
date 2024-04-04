'use client'
import useAuth from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import UpcomingReleasesGridSection from '../../PageComponents/UpcomingReleases/UpcomingReleasesGridSection'
import PageNavigation from '../PageNavigation/PageNavigation'
import { ReleasesPagesProps } from '@/types/ReleasesPages'
import AppPage from '../../PagesType/AppPage'

interface UpcomingReleasesGridPageProps extends ReleasesPagesProps {}
export default function UpcomingReleasesGridPage({
	...props
}: UpcomingReleasesGridPageProps) {
	return (
		<AppPage
			loadingText="Loading upcoming releases page"
			oldPageTitle={'Upcoming'}
			oldGoBack
			oldLargeTitle
			{...props}
		>
			<UpcomingReleasesGridSection />
		</AppPage>
	)

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

	const content = () =>
		!ready ? (
			<Loading subText="Loading new releases page" />
		) : (
			<UpcomingReleasesGridSection />
		)

	if (!props.newNav) {
		return (
			<PageNavigation title={'Upcoming'} goBack={true} largeTitle={true}>
				{content()}
			</PageNavigation>
		)
	}
	return content()
}
