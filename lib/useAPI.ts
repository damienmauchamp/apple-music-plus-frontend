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

// export const getMusicKitVersion = process.env.MUSICKIT_VERSION || 1;

const timestamps = () => ({
	timestamp: new Date().getTime(),
})

const defaultParams = () => ({
	...timestamps(),
	musickit: 0,
})

const generateUserCacheToken = () =>
	'AMPUAPIUID' + String(Date.now()) + '-' + String(Math.random() * 100000)
let userCacheToken = generateUserCacheToken()
const updateUserCacheToken = () => {
	userCacheToken = generateUserCacheToken()
	return userCacheToken
}
const getUserCacheToken = () =>
	process.env.TEST_USER_CACHE_TOKEN || userCacheToken

export default function useAPI() {
	const { logged, isAuthorized, getInstance } = useMusicKitContext()

	const intercept = () => {
		// Set the Music-Token token for any request
		api.interceptors.request.use(function (config) {
			if (userCacheToken)
				config.headers['User-Cache-Token'] = getUserCacheToken()

			if (process.env.TEST_USER_TOKEN)
				config.headers['Authorization'] =
					`Bearer ${process.env.TEST_USER_TOKEN}`
			if (process.env.TEST_USER_MUSIC_TOKEN)
				config.headers['Music-Token'] =
					process.env.TEST_USER_MUSIC_TOKEN

			if (logged || isAuthorized())
				config.headers['Music-Token'] =
					getInstance().musicUserToken || ''

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

	// releases
	const getNewReleases = (
		from: string,
		params: object = {},
		config?: AxiosRequestConfig<any> | undefined
	) => {
		return get(`/api/user/releases`, {
			...config,
			params: {
				...defaultParams(),
				from: from,
				...params,
				sort: '-releaseDate',
				// weekly: 1,
				// weeks: 1,
				hide_singles: 1,
				hide_eps: 0,
				hide_upcoming: 1,
			},
		})
	}
	const getNewSingles = (
		from: string,
		params: object = {},
		config?: AxiosRequestConfig<any> | undefined
	) => {
		return get(`/api/user/releases`, {
			...config,
			params: {
				...defaultParams(),
				from: from,
				...params,
				sort: '-releaseDate',
				hide_albums: 1,
				hide_eps: 1,
				hide_upcoming: 1,
			},
		})
	}
	const getUpcomingReleases = (
		from: string,
		params: object = {},
		config?: AxiosRequestConfig<any> | undefined
	) => {
		return get(`/api/user/releases`, {
			...config,
			params: {
				...defaultParams(),
				from: from,
				...params,
				sort: 'releaseDate',
				only_upcoming: 1,
			},
		})
	}
	const getNewSongs = (
		from: string,
		params: object = {},
		config?: AxiosRequestConfig<any> | undefined
	) => {
		return get(`/api/user/releases/songs`, {
			...config,
			params: {
				...defaultParams(),
				from: from,
				...params,
				sort: '-releaseDate',
				hide_upcoming: 1,
			},
		})
	}
	const getUpcomingSongs = (
		from: string,
		params: object = {},
		config?: AxiosRequestConfig<any> | undefined
	) => {
		return get(`/api/user/releases/songs`, {
			...config,
			params: {
				...defaultParams(),
				from: from,
				...params,
				sort: '-releaseDate',
				only_upcoming: 1,
			},
		})
	}

	// catalog
	interface SearchTypeResource {
		data: MusicKit.Resource[]
		next?: string
		href: string
	}
	interface SearchResource {
		albums: SearchTypeResource
		artists: SearchTypeResource
		'music-videos': SearchTypeResource
		songs: SearchTypeResource
	}
	const searchCatalogArtists = async (term: string, params: object = {}) => {
		const mkAPI = getInstance().api
		const mkVersion = Number(process.env.MUSICKIT_VERSION)

		if (mkVersion === 3) {
			const res = await (mkAPI as MusicKitV3.APIV3).music(
				'v1/catalog/fr/search',
				{
					term: term,
					types: 'artists',
					limit: 25,
					...params,
				}
			)
			return res.data.results.artists?.data || []
		}

		const res = await mkAPI.search(term, {
			types: 'artists',
			limit: 25,
			...params,
		})
		return (res as unknown as SearchResource).artists.data
	}

	// library
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

	// artists
	const getUserArtists = (config?: AxiosRequestConfig<any> | undefined) =>
		get(`/api/user/artists`, {
			...config,
			params: {
				limit: 1000,
			},
		})
	/* endregion API */

	return {
		...api,
		axios: axios,
		...axios,
		api: api,
		//
		userCacheToken,
		getUserCacheToken,
		updateUserCacheToken,
		//
		get: get,
		post: post,
		put: put,
		delete: del,
		//
		getNewReleases,
		getNewSingles,
		getUpcomingReleases,
		getNewSongs,
		getUpcomingSongs,
		searchCatalogArtists,
		addResourceToLibrary,
		getUserArtists,
	}
}
