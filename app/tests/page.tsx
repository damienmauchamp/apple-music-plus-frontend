'use client'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { IoRefreshCircleOutline } from 'react-icons/io5'

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

// todo : sections components

export default function Test() {
	const [newReleases, setNewReleases] = useState<any[]>([])
	const [newSingles, setNewSingles] = useState<any[]>([])
	const [upcoming, setUpcoming] = useState<any[]>([])
	const [newSongs, setNewSongs] = useState<any[]>([])
	const [upcomingSongs, setUpcomingSongs] = useState<any[]>([])

	// useEffect(() => {})

	const handleNewReleases = async () => {
		const res = await getNewReleases()
		setNewReleases(res.data)
	}
	const handleNewSingles = async () => {
		const res = await getNewSingles()
		setNewSingles(res.data)
	}
	const handleUpcoming = async () => {
		const res = await getUpcoming()
		setUpcoming(res.data)
	}
	const handleNewSongs = async () => {
		const res = await getNewSongs()
		setNewSongs(res.data)
	}
	const handleUpcomingSongs = async () => {
		const res = await getUpcomingSongs()
		setUpcomingSongs(res.data)
	}

	//

	const section = (
		title: string,
		handleClick: () => void,
		data: any[],
		type: string = 'releases'
	) => {
		const displayReleases = (data: any[]) => {
			return (
				data && (
					<div className="grid grid-rows-2 grid-flow-col gap-4">
						{data.map(releaseMap)}
					</div>
				)
			)
		}
		const releaseMap = (item: any) => (
			<a
				className="flex flex-col basis-auto cols-3"
				target="_blank"
				href={`https://music.apple.com/${process.env.STOREFRONT}/album/${item.storeId}`}
			>
				<div>
					<Image
						src={item.artworkUrl.replace('{w}x{h}', '300x300')}
						alt={`${item.name} by ${item.artistName}`}
						width={300}
						height={300}
					></Image>
				</div>
				<div className="flex flex-col">
					<div>{item.name}</div>
					<div>{item.artistName}</div>
				</div>
			</a>
		)

		const displaySongs = (data: any[]) => {
			return (
				data && (
					<div className="flex flex-col basis-auto">
						{data.map(songsMap)}
					</div>
				)
			)
		}

		const songsMap = (item: any) => (
			<div className="flex flex-row">
				<a
					className="flex flex-col basis-auto cols-3"
					target="_blank"
					href={`https://music.apple.com/${process.env.STOREFRONT}/album/${item.albumId}?i=${item.storeId}`}
				>
					<Image
						src={item.artworkUrl.replace('{w}x{h}', '100x100')}
						alt={`${item.name} by ${item.artistName}`}
						width={100}
						height={100}
					></Image>
				</a>
				<div>{item.name}</div>
				<div>{item.artistName}</div>
				<div>{item.albumName}</div>
				<div>{item.durationInMillis}</div>
				<div>{item.contentRating}</div>
			</div>
		)

		return (
			<section className="flex flex-col bg-gray-800">
				<div>
					<h3>
						{title}{' '}
						<button
							onClick={() => {
								handleClick()
							}}
						>
							<IoRefreshCircleOutline />
						</button>
					</h3>
				</div>

				{type === 'releases'
					? displayReleases(data)
					: displaySongs(data)}

				<div className="grid grid-rows-2 grid-flow-col gap-4">
					{/* {newReleases &&
						newReleases.map((item: any) => ( */}
					{data &&
						(type === 'releases'
							? data.map(releaseMap)
							: data.map(songsMap))}
				</div>
			</section>
		)
	}

	return (
		<>
			{section('New Releases', handleNewReleases, newReleases)}
			{section('New Singles', handleNewSingles, newSingles)}
			{section('Upcoming', handleUpcoming, upcoming)}
			{section('New Songs', handleNewSongs, newSongs, 'tracks')}
			{section(
				'Upcoming Songs',
				handleUpcomingSongs,
				upcomingSongs,
				'tracks'
			)}

			<hr />
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
