'use client'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { IoRefreshCircleOutline } from 'react-icons/io5'
import moment from 'moment'
import styles from 'page.module.css'
import Section from '@/src/components/Section/Section'
import AlbumsCollectionView from '@/src/components/Views/Collections/AlbumsCollectionView/AlbumsCollectionView'
import SongsCollectionView from '@/src/components/Views/Collections/SongsCollectionView/SongsCollectionView'
import GridAlbumSection from '@/src/components/Layout/GridAlbumSection/GridAlbumSection'

// region api
const apiHeaders = {
	Accept: 'application/json',
	Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
}

const dateParams = {
	from: moment().subtract(7, 'days').format('YYYY-MM-DD'),
}

const apiParams = {
	sort: '-releaseDate',
	// weekly: 1,
	// weeks: 1,
}

const timestampParam = () => ({
	timestamp: new Date().getTime(),
})

async function getNewReleases() {
	return await axios.get(`${process.env.APP_URL}/api/user/releases`, {
		headers: apiHeaders,
		params: {
			...timestampParam(),
			...dateParams,
			...apiParams,
			hide_singles: 1,
			hide_eps: 0,
			hide_upcoming: 1,
		},
	})
}

async function getNewSingles() {
	return await axios.get(`${process.env.APP_URL}/api/user/releases`, {
		headers: apiHeaders,
		params: {
			...timestampParam(),
			...dateParams,
			...apiParams,
			hide_albums: 1,
			hide_eps: 1,
			hide_upcoming: 1,
		},
	})
}

async function getUpcoming() {
	return await axios.get(`${process.env.APP_URL}/api/user/releases`, {
		headers: apiHeaders,
		params: {
			...timestampParam(),
			...dateParams,
			sort: '-releaseDate',
			only_upcoming: 1,
		},
	})
}

async function getNewSongs() {
	return await axios.get(`${process.env.APP_URL}/api/user/releases/songs`, {
		headers: apiHeaders,
		params: {
			...timestampParam(),
			...dateParams,
			...apiParams,
			hide_upcoming: 1,
		},
	})
}

async function getUpcomingSongs() {
	return await axios.get(`${process.env.APP_URL}/api/user/releases/songs`, {
		headers: apiHeaders,
		params: {
			...timestampParam(),
			...dateParams,
			sort: '-releaseDate',
			only_upcoming: 1,
		},
	})
}
// endregion api

export default function Test() {
	const [newReleases, setNewReleases] = useState<any[]>([])
	const [newSingles, setNewSingles] = useState<any[]>([])
	const [upcoming, setUpcoming] = useState<any[]>([])
	const [newSongs, setNewSongs] = useState<any[]>([])
	const [upcomingSongs, setUpcomingSongs] = useState<any[]>([])

	const loadNewReleases = async () => {
		const res = await getNewReleases()
		setNewReleases(res.data)
	}
	const loadNewSingles = async () => {
		const res = await getNewSingles()
		setNewSingles(res.data)
	}
	const loadUpcoming = async () => {
		const res = await getUpcoming()
		setUpcoming(res.data)
	}
	const loadNewSongs = async () => {
		const res = await getNewSongs()
		setNewSongs(res.data)
	}
	const loadUpcomingSongs = async () => {
		const res = await getUpcomingSongs()
		setUpcomingSongs(res.data)
	}

	useEffect(() => {
		loadNewReleases()
		loadNewSingles()
		loadUpcoming()
		loadNewSongs()
		// loadUpcomingSongs()
	}, [])

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

	// throw new Error('testestestes')

	return (
		<>
			<div className="max-w-5xl mx-auto">
				<GridAlbumSection
					id={'newReleases'}
					title={'New Releases'}
					key={'newReleases'}
					items={newReleases}
					scroll={false}
					mobileScroll={true}
					rows={2}
				/>

				<GridAlbumSection
					id={'newSingles'}
					title={'New Singles'}
					key={'newSingles'}
					items={newSingles}
					scroll={true}
					rows={2}
				/>

				<GridAlbumSection
					id={'upcoming'}
					title={'Upcoming'}
					key={'upcoming'}
					items={upcoming}
					scroll={false}
					mobileScroll={true}
					rows={1}
				/>

				<Section id={'newSongs'} title={'New Songs'}>
					<SongsCollectionView key={'newSongs'} items={newSongs} />
				</Section>

				<Section id={'Upcoming Songs'} title={'Upcoming Songs'}>
					<SongsCollectionView
						key={'upcomingSongs'}
						items={upcomingSongs}
					/>
				</Section>
			</div>

			<hr />

			<div className="grid grid-cols-2 gap-4">
				{refreshButton('New Releases', loadNewReleases)}
				{refreshButton('New Singles', loadNewSingles)}
				{refreshButton('Upcoming', loadUpcoming)}
				{refreshButton('New Songs', loadNewSongs)}
				{refreshButton('Upcoming Songs', loadUpcomingSongs)}
			</div>

			<hr />

			<section className="w-full overflow-hidden">
				<ul>
					<li>APP_URL : {process.env.APP_URL}</li>
					<li>DEVELOPER_TOKEN : {process.env.DEVELOPER_TOKEN}</li>
					<li>TEST_USER_TOKEN : {process.env.TEST_USER_TOKEN}</li>
				</ul>
			</section>
		</>
	)
}
