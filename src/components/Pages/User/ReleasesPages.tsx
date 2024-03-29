'use client'
/**
 * @todo remove use client, useEffect/useState & pre-load data with getStaticProps
 * @link https://youtu.be/Urgstu-mCec?si=0ZDGNtvCBzHy2gQ-&t=398
 */
import React, { useEffect, useState } from 'react'
import useAuth from '@/lib/useAuth'
import PageNavigation from '../PageNavigation/PageNavigation'
import Loading from '../../Components/Loading/Loading'
import NewReleasesSection from '../../PageComponents/NewReleasesSection'
import NewSinglesSection from '../../PageComponents/NewSinglesSection'
import UpcomingSection from '../../PageComponents/UpcomingSection'
import NewSongsSection from '../../PageComponents/NewSongsSection'
import NewSongsListSection from '../../PageComponents/NewSongsListSection'
import UpcomingSongsListSection from '../../PageComponents/UpcomingSongsListSection'

interface ReleasesPageProps {}
export default function ReleasesPage({}: ReleasesPageProps) {
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
		if (!isLoading) {
			setReady(true)
		}
	}, [isLoading, user, hasTestToken])

	// Helpers

	// const refreshButton = (title: string, handleClick: () => void) => {
	// 	return (
	// 		<button
	// 			onClick={handleClick}
	// 			className="flex gap-2 bg-blue-500 rounded-xl border-white p-2"
	// 		>
	// 			{title} <IoRefreshCircleOutline />
	// 		</button>
	// 	)
	// }

	// const debug = () => {
	// 	return (
	// 		<>
	// 			<div className="grid grid-cols-2 gap-4">
	// 				{/* {refreshButton('New Releases', loadNewReleases)} */}
	// 				{/* {refreshButton('New Singles', loadNewSingles)} */}
	// 				{/* {refreshButton('Upcoming', loadUpcoming)} */}
	// 				{/* {refreshButton('New Songs', loadNewSongs)} */}
	// 				{/* {refreshButton('Upcoming Songs', loadUpcomingSongs)} */}
	// 			</div>
	// 		</>
	// 	)
	// }

	return (
		<PageNavigation title={'New Releases'}>
			{!ready ? (
				<Loading subText="Loading releases page" />
			) : (
				<>
					<div className="w-full max-w-5xl mx-auto">
						<NewReleasesSection />
						<NewSinglesSection />
						<UpcomingSection />
						<NewSongsSection />
						<NewSongsListSection title="New Songs List" />
						<UpcomingSongsListSection title="Upcoming Songs List" />
					</div>
				</>
			)}
		</PageNavigation>
	)
}
