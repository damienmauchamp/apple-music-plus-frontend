'use client'
import NewSongsListSection from '../../PageComponents/NewSongs/NewSongsListSection'
import { ReleasesPagesProps } from '@/types/ReleasesPages'
import AppPage from '../../PagesType/AppPage'

interface NewSongsListPageProps extends ReleasesPagesProps {}
export default function NewSongsListPage({ ...props }: NewSongsListPageProps) {
	return (
		<AppPage
			// loadingText="Loading new songs page"
			oldPageTitle={'New Spongs'}
			oldGoBack
			oldLargeTitle
			{...props}
		>
			<NewSongsListSection header full />
		</AppPage>
	)
}
