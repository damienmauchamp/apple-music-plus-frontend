'use client'
import useAuth from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import UpcomingSongsListSection from '../../PageComponents/UpcomingSongs/UpcomingSongsListSection'
import PageNavigation from '../PageNavigation/PageNavigation'
import { ReleasesPagesProps } from '@/types/ReleasesPages'
import AppPage from '../../PagesType/AppPage'

interface UpcomingSongsListPageProps extends ReleasesPagesProps {}
export default function UpcomingSongsListPage({
	...props
}: UpcomingSongsListPageProps) {
	return (
		<AppPage
			loadingText="Loading upcoming songs page"
			oldPageTitle={'Upcoming Songs'}
			oldGoBack
			oldLargeTitle
			{...props}
		>
			<UpcomingSongsListSection header />
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
			<UpcomingSongsListSection header />
		)

	if (!props.newNav) {
		return (
			<PageNavigation
				title={'Upcoming Songs'}
				goBack={true}
				largeTitle={true}
			>
				{content()}
			</PageNavigation>
		)
	}
	return content()
}
