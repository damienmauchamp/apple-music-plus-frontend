import axios from 'axios'
import { axiosWithCredentialsConfig } from './axios'

// const api = axiosWithCredentials
const api = axios.create({
	...axiosWithCredentialsConfig,
	headers: {
		Accept: 'application/json',
		// Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
		// todo : MusicKit
		'Music-Token': `${process.env.TEST_USER_MUSIC_TOKEN}`,
	},
})

// export default api

const timestamps = () => ({
	timestamp: new Date().getTime(),
})

export default function useAPI() {
	const getNewReleases = (from: string) => {
		return api.get(`/api/user/releases`, {
			params: {
				...timestamps(),
				from: from,
				sort: '-releaseDate',
				// weekly: 1,
				// weeks: 1,
				hide_singles: 1,
				hide_eps: 0,
				hide_upcoming: 1,
			},
		})
	}

	const getNewSingles = (from: string) => {
		return api.get(`/api/user/releases`, {
			params: {
				...timestamps(),
				from: from,
				hide_albums: 1,
				hide_eps: 1,
				hide_upcoming: 1,
			},
		})
	}
	const getUpcoming = (from: string) => {
		return api.get(`/api/user/releases`, {
			params: {
				...timestamps(),
				from: from,
				sort: '-releaseDate',
				only_upcoming: 1,
			},
		})
	}
	const getNewSongs = (from: string) => {
		return api.get(`/api/user/releases/songs`, {
			params: {
				...timestamps(),
				from: from,
				sort: '-releaseDate',
				hide_upcoming: 1,
			},
		})
	}
	const getUpcomingSongs = (from: string) => {
		return api.get(`/api/user/releases/songs`, {
			params: {
				...timestamps(),
				from: from,
				sort: '-releaseDate',
				only_upcoming: 1,
			},
		})
	}

	//

	const addResourceToLibrary = (
		storeIds: string[],
		type: string = 'albums'
	) => {
		// todo : use MusicKit API
		return api.post(
			`/api/applemusic/library`,
			{},
			{
				params: {
					ids: storeIds,
					type: type,
				},
			}
		)
	}

	//

	const getUserArtists = () => api.get(`/api/user/artists`)

	return {
		...api,
		getNewReleases,
		getNewSingles,
		getUpcoming,
		getNewSongs,
		getUpcomingSongs,
		addResourceToLibrary,
		getUserArtists,
	}
}