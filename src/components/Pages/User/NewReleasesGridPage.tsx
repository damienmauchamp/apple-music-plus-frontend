'use client'
import NewReleasesGridSection from '../../PageComponents/NewReleases/NewReleasesGridSection'
import { ReleasesPagesProps } from '@/types/ReleasesPages'
import AppPage from '../../PagesType/AppPage'

interface NewReleasesGridPageProps extends ReleasesPagesProps {}
export default function NewReleasesGridPage({
	...props
}: NewReleasesGridPageProps) {
	return (
		<AppPage
			// loadingText="Loading new releases page"
			oldPageTitle={'New Releases'}
			oldGoBack
			oldLargeTitle
			{...props}
		>
			<NewReleasesGridSection full />
		</AppPage>
	)
}
