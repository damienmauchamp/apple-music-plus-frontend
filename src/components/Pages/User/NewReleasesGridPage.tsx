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
			{[...Array(6)].map((value, index) =>
				!index ? null : (
					<NewReleasesGridSection
						key={`NewReleasesGridSection${index}`}
						weeks={-index}
					/>
				)
			)}
		</AppPage>
	)
}
