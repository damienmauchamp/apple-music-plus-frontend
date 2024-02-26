'use client'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

const apiHeaders = {
	Accept: 'application/json',
	Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
}

const apiParams = {
	sort: '-releaseDate',
	weekly: 1,
	weeks: 1,
}

async function getNewReleases() {
	return await axios.get(`${process.env.APP_URL}/api/user/releases`, {
		headers: apiHeaders,
		params: {
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
			sort: '-releaseDate',
			only_upcoming: 1,
		},
	})
}

async function getNewSongs() {
	return await axios.get(`${process.env.APP_URL}/api/user/releases/songs`, {
		headers: apiHeaders,
		params: {
			...apiParams,
			hide_upcoming: 1,
		},
	})
}

async function getUpcomingSongs() {
	return await axios.get(`${process.env.APP_URL}/api/user/releases/songs`, {
		headers: apiHeaders,
		params: {
			sort: '-releaseDate',
			only_upcoming: 1,
		},
	})
}
// todo : first display
// todo : different display (songs, albums)
// todo : sections components

export default function Test() {
	const getNewReleasesHandler = async () => {
		const res = await getNewReleases()
		console.log('res', res)
	}

	const [newReleases, setNewReleases] = useState<any>(null)
	const [newSingles, setNewSingles] = useState<any>(null)
	const [upcoming, setUpcoming] = useState<any>(null)
	const [newSongs, setNewSongs] = useState<any>(null)
	const [upcomingSongs, setUpcomingSongs] = useState<any>(null)

	// useEffect(() => {})

	// const getNewReleases = async () => {
	// 	const res = await getNewReleases()
	// 	setNewReleases(res.data)
	// }

	return (
		<>
			<div className="flex flex-col gap-4">
				<button
					onClick={() => {
						getNewReleases().then((res) => {
							console.log('[getNewReleases] res', res)
							console.log('[getNewReleases] data', res.data)
						})
					}}
				>
					getNewReleases()
				</button>
				<button
					onClick={() => {
						getNewSingles().then((res) => {
							console.log('[getNewSingles] res', res)
							console.log('[getNewSingles] data', res.data)
						})
					}}
				>
					getNewSingles()
				</button>
				<button
					onClick={() => {
						getUpcoming().then((res) => {
							console.log('[getUpcoming] res', res)
							console.log('[getUpcoming] data', res.data)
						})
					}}
				>
					getUpcoming()
				</button>
				<button
					onClick={() => {
						getNewSongs().then((res) => {
							console.log('[getNewSongs] res', res)
							console.log('[getNewSongs] data', res.data)
						})
					}}
				>
					getNewSongs()
				</button>
				<button
					onClick={() => {
						getUpcomingSongs().then((res) => {
							console.log('[getUpcomingSongs] res', res)
							console.log('[getUpcomingSongs] data', res.data)
						})
					}}
				>
					getUpcomingSongs()
				</button>
			</div>

			<div></div>

			<ul>
				<li>APP_URL : {process.env.APP_URL}</li>
				<li>DEVELOPER_TOKEN : {process.env.DEVELOPER_TOKEN}</li>
				<li>TEST_USER_TOKEN : {process.env.TEST_USER_TOKEN}</li>
			</ul>
		</>
	)
}
