'use client'
import useAuth from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import NewReleasesGridSection from '../../PageComponents/NewReleases/NewReleasesGridSection'
import PageNavigation from '../PageNavigation/PageNavigation'
import { ReleasesPagesProps } from '@/types/ReleasesPages'
import AppPage from '../../PagesType/AppPage'

interface NewReleasesGridPageProps extends ReleasesPagesProps {}
export default function NewReleasesGridPage({
	...props
}: NewReleasesGridPageProps) {
	return (
		<AppPage
			loadingText="Loading new releases page"
			oldPageTitle={'New Releases'}
			oldGoBack
			oldLargeTitle
			{...props}
		>
			<NewReleasesGridSection />
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

	if (!ready) {
		return <Loading subText="Loading new releases page" />
	}

	const content = () =>
		!ready ? (
			<Loading subText="Loading new releases page" />
		) : (
			<NewReleasesGridSection />
		)

	if (!props.newNav) {
		return (
			<PageNavigation
				title={'New Releases'}
				goBack={true}
				largeTitle={true}
			>
				{content()}
			</PageNavigation>
		)
	}
	return content()
}
