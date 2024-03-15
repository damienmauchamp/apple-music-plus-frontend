import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosWithCredentialsConfig } from './axios'
import { useMusicKitContext } from '@/src/context/MusicKitContext'

// const api = axiosWithCredentials
const api = axios.create({
	...axiosWithCredentialsConfig,
	headers: {
		Accept: 'application/json',
		// Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
		// 'Music-Token': `${process.env.TEST_USER_MUSIC_TOKEN}`,
	},
})

// export default api

const timestamps = () => ({
	timestamp: new Date().getTime(),
})

export default function useAPI() {
	const { logged, getInstance } = useMusicKitContext()

	const intercept = () => {
		// Set the Music-Token token for any request
		api.interceptors.request.use(function (config) {
			if (process.env.TEST_USER_TOKEN) {
				config.headers['Authorization'] =
					`Bearer ${process.env.TEST_USER_TOKEN}`
			}
			if (process.env.TEST_USER_MUSIC_TOKEN) {
				config.headers['Music-Token'] =
					process.env.TEST_USER_MUSIC_TOKEN
			}
			config.headers['Music-Token'] = logged
				? getInstance().musicUserToken || ''
				: ''
			return config
		})
	}

	intercept()

	/* region extending axios */
	const get = <T = any, R = AxiosResponse<T>, D = any>(
		url: string,
		config?: AxiosRequestConfig<D>
	): Promise<R> => {
		intercept()
		return api.get(url, config)
	}
	const post = <T = any, R = AxiosResponse<T>, D = any>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>
	): Promise<R> => {
		intercept()
		return api.post(url, data, config)
	}
	const put = <T = any, R = AxiosResponse<T>, D = any>(
		url: string,
		data?: D,
		config?: AxiosRequestConfig<D>
	): Promise<R> => {
		intercept()
		return api.put(url, data, config)
	}
	const del = <T = any, R = AxiosResponse<T>, D = any>(
		url: string,
		config?: AxiosRequestConfig<D>
	): Promise<R> => {
		intercept()
		return api.delete(url, config)
	}
	/* endregion extending axios */

	/* region API */
	const getNewReleases = (from: string) => {
		return get(`/api/user/releases`, {
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
		return get(`/api/user/releases`, {
			params: {
				...timestamps(),
				from: from,
				sort: '-releaseDate',
				hide_albums: 1,
				hide_eps: 1,
				hide_upcoming: 1,
			},
		})
	}
	const getUpcoming = (from: string) => {
		return get(`/api/user/releases`, {
			params: {
				...timestamps(),
				from: from,
				sort: 'releaseDate',
				only_upcoming: 1,
			},
		})
	}
	const getNewSongs = (from: string) => {
		return get(`/api/user/releases/songs`, {
			params: {
				...timestamps(),
				from: from,
				sort: '-releaseDate',
				hide_upcoming: 1,
			},
		})
	}
	const getUpcomingSongs = (from: string) => {
		return get(`/api/user/releases/songs`, {
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

	const getUserArtists = () => get(`/api/user/artists`)
	/* endregion API */

	return {
		...api,
		api: api,
		//
		get: get,
		post: post,
		put: put,
		delete: del,
		//
		getNewReleases,
		getNewSingles,
		getUpcoming,
		getNewSongs,
		getUpcomingSongs,
		addResourceToLibrary,
		getUserArtists,
	}
}
