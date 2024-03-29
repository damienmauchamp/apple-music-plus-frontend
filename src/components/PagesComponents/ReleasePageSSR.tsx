import React from 'react'
// import IOSPage from '../Testing/iOSPage/iOSPage'
import AlbumsGridSection from '../LayoutComponents/AlbumsGridSection/AlbumsGridSection'
import SongsListSection from '../LayoutComponents/SongsListSection/SongsListSection'
import IOSPageLink from '../Testing/IOSPageLink/IOSPageLink'
import { Album, Song } from '@/types/Items'

interface ReleasesPageProps {
	newReleases?: Album[]
	newSingles?: Album[]
	upcoming?: Album[]
	newSongs?: Song[]
	upcomingSongs?: Song[]
}

const ReleasePage = ({
	newReleases = [] as Album[],
	newSingles = [] as Album[],
	upcoming = [] as Album[],
	newSongs = [] as Song[],
	upcomingSongs = [] as Song[],
}: ReleasesPageProps) => {
	console.log('ReleasePage', {
		newReleases,
		newSingles,
		upcoming,
		newSongs,
		upcomingSongs,
	})
	// xxx
	// xxx

	return (
		// <IOSPage
		// 	page="releases"
		// 	title="New Releases"
		// 	pages={[
		// 		{
		// 			// todo : only page path, eg: /new-singles
		// 			page: 'releases/new-singles',
		// 			title: 'New Singles',
		// 			children: (
		// 				<AlbumsGridSection
		// 					id={'newSingles'}
		// 					title={'New Singles'}
		// 					key={'newSingles'}
		// 					items={newSingles}
		// 					scroll={false}
		// 					mobileScroll={false}
		// 					// rows={2}
		// 					// seeAll={() => console.log('see all 1')}
		// 				/>
		// 			),
		// 		},
		// 	]}
		// >
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

			<IOSPageLink nextPage={'releases/new-singles'}>
				New Singles
			</IOSPageLink>
		</>
		// </IOSPage>
	)
}

export default ReleasePage
