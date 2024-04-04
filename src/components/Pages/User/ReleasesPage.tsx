'use client'
/**
 * @todo remove use client, useEffect/useState & pre-load data with getStaticProps
 * @link https://youtu.be/Urgstu-mCec?si=0ZDGNtvCBzHy2gQ-&t=398
 */
import React, { useEffect, useState } from 'react'
import useAuth from '@/lib/useAuth'
import PageNavigation from '../PageNavigation/PageNavigation'
import Loading from '../../Components/Loading/Loading'
import NewReleasesSection from '../../PageComponents/NewReleases/NewReleasesSection'
import NewSinglesSection from '../../PageComponents/NewSingles/NewSinglesSection'
import UpcomingReleasesSection from '../../PageComponents/UpcomingReleases/UpcomingReleasesSection'
import NewSongsSection from '../../PageComponents/NewSongs/NewSongsSection'
import NewSongsListSection from '../../PageComponents/NewSongs/NewSongsListSection'
import UpcomingSongsListSection from '../../PageComponents/UpcomingSongs/UpcomingSongsListSection'
import { ReleasesPagesProps } from '@/types/ReleasesPages'

interface ReleasesPageProps extends ReleasesPagesProps {}
export default function ReleasesPage({ ...props }: ReleasesPageProps) {
	// Hooks
	// const { logged } = useMusicKitContext()

	// Auth hook
	const { user, isLoading, hasTestToken } = useAuth({
		middleware: 'auth',
	}) // todo : redirect to previous page after login

	// State
	const [ready, setReady] = useState<boolean>(false)

	useEffect(() => {
		// if (!isLoading && (user || hasTestToken)) {
		if (!isLoading && user) {
			// console.log('[ReleasesPage] READY:', {
			// 	user,
			// 	isLoading,
			// 	hasTestToken,
			// })
			setReady(true)
		}
	}, [isLoading, user, hasTestToken])

	const content = () =>
		!ready ? (
			<Loading subText="Loading releases page" />
		) : (
			<>
				{/* <ProfileLink /> */}

				<NewReleasesSection
					title="New Releases"
					newNav={props.newNav}
				/>
				<NewSinglesSection title="New Singles" newNav={props.newNav} />
				<UpcomingReleasesSection
					title="Upcoming"
					newNav={props.newNav}
				/>
				<NewSongsSection title="New Songs" newNav={props.newNav} />
				<NewSongsListSection
					title="New Songs List"
					newNav={props.newNav}
				/>
				<UpcomingSongsListSection
					title="Upcoming Songs"
					newNav={props.newNav}
				/>
			</>
		)

	if (!props.newNav) {
		return (
			<PageNavigation title={'New Releases'}>
				<div className="w-full max-w-5xl mx-auto">{content()}</div>
			</PageNavigation>
		)
	}
	return content()
}
