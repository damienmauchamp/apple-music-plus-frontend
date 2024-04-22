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
			{[...Array(6)].map((value, index) => (
				<NewReleasesGridSection
					full={index === 0}
					key={`NewReleasesGridSection${index}`}
					id={`newReleases-w-${index}`}
					weeks={-index}
				/>
			))}
		</AppPage>
	)
}
