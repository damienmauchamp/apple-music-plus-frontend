'use client'
/**
 * @todo remove use client, useEffect/useState & pre-load data with getStaticProps
 * @link https://youtu.be/Urgstu-mCec?si=0ZDGNtvCBzHy2gQ-&t=398
 */
import React, { useEffect, useState } from 'react'
import { IoRefreshCircleOutline } from 'react-icons/io5'
import moment from 'moment'
import AlbumsGridSection from '@/src/components/LayoutComponents/AlbumsGridSection/AlbumsGridSection'
import SongsListSection from '@/src/components/LayoutComponents/SongsListSection/SongsListSection'
import { Album, Song } from '@/types/Items'
import useAPI from '@/lib/useAPI'
import useAuth from '@/lib/useAuth'
import { useMusicKitContext } from '@/src/context/MusicKitContext'
import PageNavigation from '../PageNavigation/PageNavigation'
import Loading from '../../Components/Loading/Loading'

// todo : getStaticProps() for individual pages
// todo : export auth to page.tsx, see if static props can be used
// export const getStaticProps = async () => {
// 	return {
// 		props: {
// 			newReleasesData: [],
// 			newSinglesData: [],
// 			upcomingData: [],
// 			newSongsData: [],
// 			upcomingSongsData: [],
// 		},
// 	}
// }

interface ReleasesPageProps {
	// newReleasesData: Album[]
	// newSinglesData: Album[]
	// upcomingData: Album[]
	// newSongsData: Song[]
	// upcomingSongsData: Song[]
}

// Test.getStaticProps = async () => ({
// 	props: {
// 		newReleasesData: await api.getNewReleases(from),
// 		newSinglesData: [],
// 		upcomingData: [],
// 		newSongsData: [],
// 		upcomingSongsData: [],
// 	},
// })

export default function ReleasesPage(
	{
		// newReleasesData = [] as Album[],
		// newSinglesData = [] as Album[],
		// upcomingData = [] as Album[],
		// newSongsData = [] as Song[],
		// upcomingSongsData = [] as Song[],
	}: ReleasesPageProps
) {
	// Hooks
	const { logged } = useMusicKitContext()

	// Auth hook
	const { user, isLoading, hasTestToken } = useAuth({
		middleware: 'auth',
	}) // todo : redirect to previous page after login

	// State
	// const [ready, setReady] = useState<boolean>(false)
	// const [newReleases, setNewReleases] = useState<Album[]>(newReleasesData)
	// const [newSingles, setNewSingles] = useState<Album[]>(newSinglesData)
	// const [upcoming, setUpcoming] = useState<Album[]>(upcomingData)
	// const [newSongs, setNewSongs] = useState<Song[]>(newSongsData)
	// const [upcomingSongs, setUpcomingSongs] = useState<Song[]>(upcomingSongsData)
	const [ready, setReady] = useState<boolean>(false)
	const [dataLoaded, setDataLoaded] = useState<boolean>(false)

	//
	const [newReleases, setNewReleases] = useState<Album[]>([])
	const [newSingles, setNewSingles] = useState<Album[]>([])
	const [upcoming, setUpcoming] = useState<Album[]>([])
	const [newSongs, setNewSongs] = useState<Song[]>([])
	const [upcomingSongs, setUpcomingSongs] = useState<Song[]>([])

	//
	const [newReleasesLoaded, setNewReleasesLoaded] = useState<boolean>(false)
	const [newSinglesLoaded, setNewSinglesLoaded] = useState<boolean>(false)
	const [upcomingLoaded, setUpcomingLoaded] = useState<boolean>(false)
	const [newSongsLoaded, setNewSongsLoaded] = useState<boolean>(false)
	const [upcomingSongsLoaded, setUpcomingSongsLoaded] =
		useState<boolean>(false)

	// API hook
	const api = useAPI()

	// API calls
	const from = moment().subtract(7, 'days').format('YYYY-MM-DD')

	// region load data
	const loadNewReleases = async () => {
		const res = await api.getNewReleases(from)
		setNewReleases(res.data.data)
		setNewReleasesLoaded(true)
	}
	const loadNewSingles = async () => {
		const res = await api.getNewSingles(from)
		setNewSingles(res.data.data)
		setNewSinglesLoaded(true)
	}
	const loadUpcoming = async () => {
		const res = await api.getUpcoming(from)
		setUpcoming(res.data.data)
		setUpcomingLoaded(true)
	}
	const loadNewSongs = async () => {
		const res = await api.getNewSongs(from)
		setNewSongs(res.data.data)
		setNewSongsLoaded(true)
	}
	const loadUpcomingSongs = async () => {
		const res = await api.getUpcomingSongs(from)
		setUpcomingSongs(res.data.data)
		setUpcomingSongsLoaded(true)
	}
	// endregion

	//
	useEffect(() => {
		if (
			newReleasesLoaded &&
			newSinglesLoaded &&
			upcomingLoaded &&
			newSongsLoaded &&
			upcomingSongsLoaded
		) {
			setDataLoaded(true)
		}
	}, [
		newReleasesLoaded,
		newSinglesLoaded,
		upcomingLoaded,
		newSongsLoaded,
		upcomingSongsLoaded,
	])

	const loadData = async () => {
		if (!ready || dataLoaded) return
		await loadNewReleases()
		await loadNewSingles()
		await loadUpcoming()
		await loadNewSongs()
		await loadUpcomingSongs()

		// setDataLoaded(true)
	}

	// load data when ready
	useEffect(() => {
		loadData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ready])

	// load data on logging in
	useEffect(() => {
		loadData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [logged])

	useEffect(() => {
		// if (!isLoading && (user || hasTestToken)) {
		if (!isLoading) {
			setReady(true)
		}
	}, [isLoading, user, hasTestToken])

	// Helpers

	const refreshButton = (title: string, handleClick: () => void) => {
		return (
			<button
				onClick={handleClick}
				className="flex gap-2 bg-blue-500 rounded-xl border-white p-2"
			>
				{title} <IoRefreshCircleOutline />
			</button>
		)
	}

	const page = () => {
		return (
			<>
				<div className="max-w-5xl mx-auto">
					<AlbumsGridSection
						id={'newReleases'}
						title={'New Releases'}
						key={'newReleases'}
						items={newReleases}
						scroll={false}
						mobileScroll={true}
						rows={2}
						seeAllPath={'/new-releases'}
						// seeAll={() => console.log('see all 1')}
					/>
					<AlbumsGridSection
						id={'newSingles'}
						title={'New Singles'}
						key={'newSingles'}
						items={newSingles}
						scroll={true}
						// mobileScroll={true}
						rows={2}
						seeAllPath={'/new-singles'}
						// seeAll={() => console.log('see all 2')}
					/>
					<AlbumsGridSection
						id={'upcoming'}
						title={'Upcoming'}
						key={'upcoming'}
						items={upcoming}
						scroll={false}
						mobileScroll={true}
						rows={1}
						seeAllPath={'/upcoming'}
					/>
					<SongsListSection
						id={'newSongs'}
						title={'New Songs With Scroll'}
						key={'newSongs'}
						items={newSongs}
						// items={newSongs.slice(0, 16)}
						//
						scroll={true}
						rows={4}
						seeAllPath={'/new-songs'}
					/>
					<SongsListSection
						id={'newSongsList'}
						title={'New Songs'}
						key={'newSongsList'}
						items={newSongs}
						header={false}
						// todo
						seeAllPath={'/new-songs'}
					/>
					<SongsListSection
						id={'upcomingSongs'}
						title={'Upcoming Songs'}
						key={'upcomingSongs'}
						items={upcomingSongs}
						// todo
						seeAllPath={'/upcoming-songs'}
					/>
				</div>

				<hr />

				<div className="grid grid-cols-2 gap-4">
					{refreshButton('New Releases', loadNewReleases)}
					{refreshButton('New Singles', loadNewSingles)}
					{refreshButton('Upcoming', loadUpcoming)}
					{refreshButton('New Songs', loadNewSongs)}
					{refreshButton('Upcoming Songs', loadUpcomingSongs)}
				</div>
			</>
		)
	}

	return (
		<PageNavigation title={'New Releases'}>
			{!ready ? (
				<Loading subText="Loading releases page" />
			) : dataLoaded ? (
				page()
			) : (
				<Loading subText="Fetching releases" />
			)}
		</PageNavigation>
	)
}
