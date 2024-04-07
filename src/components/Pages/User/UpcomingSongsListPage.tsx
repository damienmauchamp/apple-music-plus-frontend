'use client'
import UpcomingSongsListSection from '../../PageComponents/UpcomingSongs/UpcomingSongsListSection'
import { ReleasesPagesProps } from '@/types/ReleasesPages'
import AppPage from '../../PagesType/AppPage'

interface UpcomingSongsListPageProps extends ReleasesPagesProps {}
export default function UpcomingSongsListPage({
	...props
}: UpcomingSongsListPageProps) {
	return (
		<AppPage
			// loadingText="Loading upcoming songs page"
			oldPageTitle={'Upcoming Songs'}
			oldGoBack
			oldLargeTitle
			{...props}
		>
			<UpcomingSongsListSection header full />
		</AppPage>
	)
}
