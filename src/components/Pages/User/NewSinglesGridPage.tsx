'use client'
import NewSinglesGridSection from '../../PageComponents/NewSingles/NewSinglesGridSection'
import { ReleasesPagesProps } from '@/types/ReleasesPages'
import AppPage from '../../PagesType/AppPage'

interface NewSinglesGridPageProps extends ReleasesPagesProps {}
export default function NewSinglesGridPage({
	...props
}: NewSinglesGridPageProps) {
	return (
		<AppPage
			// loadingText="Loading new singles page"
			oldPageTitle={'New Singles'}
			oldGoBack
			oldLargeTitle
			{...props}
		>
			<NewSinglesGridSection full />
			<NewSinglesGridSection weeks={-1} />
			<NewSinglesGridSection weeks={-2} />
			<NewSinglesGridSection weeks={-3} />
			<NewSinglesGridSection weeks={-4} />
			<NewSinglesGridSection weeks={-5} />
			<NewSinglesGridSection weeks={-6} />
		</AppPage>
	)
}
