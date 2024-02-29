'use client'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { IoRefreshCircleOutline } from 'react-icons/io5'
import moment from 'moment'
import styles from 'page.module.css'
import Section from '@/src/components/Section/Section'
import AlbumsCollectionView from '@/src/components/Views/Collections/AlbumsCollectionView/AlbumsCollectionView'
import SongsCollectionView from '@/src/components/Views/Collections/SongsCollectionView/SongsCollectionView'
import AlbumsGridSection from '@/src/components/Layout/AlbumsGridSection/AlbumsGridSection'
import SongsListSection from '@/src/components/Layout/SongsListSection/SongsListSection'

// region api
const apiHeaders = {
	Accept: 'application/json',
	Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
	'Music-Token': `${process.env.TEST_USER_MUSIC_TOKEN}`,
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
		setNewReleases(res.data.data)
	}
	const loadNewSingles = async () => {
		const res = await getNewSingles()
		setNewSingles(res.data.data)
	}
	const loadUpcoming = async () => {
		const res = await getUpcoming()
		setUpcoming(res.data.data)
	}
	const loadNewSongs = async () => {
		const res = await getNewSongs()
		setNewSongs(res.data.data)
	}
	const loadUpcomingSongs = async () => {
		const res = await getUpcomingSongs()
		setUpcomingSongs(res.data.data)
	}

	useEffect(() => {
		loadNewReleases()
		loadNewSingles()
		loadUpcoming()
		loadNewSongs()
		loadUpcomingSongs()
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
				<AlbumsGridSection
					id={'newReleases'}
					title={'New Releases'}
					key={'newReleases'}
					items={newReleases}
					scroll={false}
					mobileScroll={true}
					rows={2}
				/>
				<AlbumsGridSection
					id={'newSingles'}
					title={'New Singles'}
					key={'newSingles'}
					items={newSingles}
					scroll={true}
					rows={2}
				/>
				<AlbumsGridSection
					id={'upcoming'}
					title={'Upcoming'}
					key={'upcoming'}
					items={upcoming}
					scroll={false}
					mobileScroll={true}
					rows={1}
				/>
				<SongsListSection
					id={'newSongs'}
					title={'New Songs With Scroll'}
					key={'newSongs'}
					items={newSongs}
					//
					scroll={true}
					rows={4}
					// todo : display table header
				/>
				<SongsListSection
					id={'newSongs'}
					title={'New Songs'}
					key={'newSongs'}
					items={newSongs}
				/>
				<SongsListSection
					id={'upcomingSongs'}
					title={'Upcoming Songs'}
					key={'upcomingSongs'}
					items={upcomingSongs}
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

			<hr />

			<section className="w-full overflow-hidden">
				<ul>
					<li>APP_URL : {process.env.APP_URL}</li>
					<li>DEVELOPER_TOKEN : {process.env.DEVELOPER_TOKEN}</li>
					<li>TEST_USER_TOKEN : {process.env.TEST_USER_TOKEN}</li>
					<li>
						TEST_USER_MUSIC_TOKEN :{' '}
						{process.env.TEST_USER_MUSIC_TOKEN}
					</li>
				</ul>
			</section>
		</>
	)
}
