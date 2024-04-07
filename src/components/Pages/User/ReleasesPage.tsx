'use client'
/**
 * @todo remove use client, useEffect/useState & pre-load data with getStaticProps
 * @link https://youtu.be/Urgstu-mCec?si=0ZDGNtvCBzHy2gQ-&t=398
 */
import React from 'react'
import NewReleasesSection from '../../PageComponents/NewReleases/NewReleasesSection'
import NewSinglesSection from '../../PageComponents/NewSingles/NewSinglesSection'
import UpcomingReleasesSection from '../../PageComponents/UpcomingReleases/UpcomingReleasesSection'
import NewSongsSection from '../../PageComponents/NewSongs/NewSongsSection'
// import NewSongsListSection from '../../PageComponents/NewSongs/NewSongsListSection'
import UpcomingSongsListSection from '../../PageComponents/UpcomingSongs/UpcomingSongsListSection'
import { ReleasesPagesProps } from '@/types/ReleasesPages'
import AppPage from '../../PagesType/AppPage'

interface ReleasesPageProps extends ReleasesPagesProps {}
export default function ReleasesPage({ ...props }: ReleasesPageProps) {
	return (
		<AppPage
			// loadingText="Loading releases page"
			oldPageTitle={'New Releases'}
			{...props}
		>
			{/* <ProfileLink /> */}

			<NewReleasesSection title="New Releases" newNav={props.newNav} />
			<NewSinglesSection title="New Singles" newNav={props.newNav} />
			<UpcomingReleasesSection title="Upcoming" newNav={props.newNav} />
			<NewSongsSection title="New Songs" newNav={props.newNav} />
			{/* <NewSongsListSection title="New Songs List" newNav={props.newNav} /> */}
			<UpcomingSongsListSection
				title="Upcoming Songs"
				newNav={props.newNav}
				full
			/>
		</AppPage>
	)
}
