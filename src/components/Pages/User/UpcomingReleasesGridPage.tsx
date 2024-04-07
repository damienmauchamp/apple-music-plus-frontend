'use client'
import UpcomingReleasesGridSection from '../../PageComponents/UpcomingReleases/UpcomingReleasesGridSection'
import { ReleasesPagesProps } from '@/types/ReleasesPages'
import AppPage from '../../PagesType/AppPage'

interface UpcomingReleasesGridPageProps extends ReleasesPagesProps {}
export default function UpcomingReleasesGridPage({
	...props
}: UpcomingReleasesGridPageProps) {
	return (
		<AppPage
			// loadingText="Loading upcoming releases page"
			oldPageTitle={'Upcoming'}
			oldGoBack
			oldLargeTitle
			{...props}
		>
			<UpcomingReleasesGridSection full />
		</AppPage>
	)
}
