'use client'
import useAuth from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import NewSongsListSection from '../../PageComponents/NewSongs/NewSongsListSection'
import PageNavigation from '../PageNavigation/PageNavigation'
import { ReleasesPagesProps } from '@/types/ReleasesPages'
import AppPage from '../../PagesType/AppPage'

interface NewSongsListPageProps extends ReleasesPagesProps {}
export default function NewSongsListPage({ ...props }: NewSongsListPageProps) {
	return (
		<AppPage
			loadingText="Loading new songs page"
			oldPageTitle={'New Spongs'}
			oldGoBack
			oldLargeTitle
			{...props}
		>
			<NewSongsListSection header />
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
			<NewSongsListSection header />
		)

	if (!props.newNav) {
		return (
			<PageNavigation title={'New Songs'} goBack={true} largeTitle={true}>
				{content()}
			</PageNavigation>
		)
	}
	return content()
}
