import axios from 'axios'

export const axiosHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Content-Type': 'application/json',
	'X-Requested-With': 'XMLHttpRequest',
}
export const axiosConfig = {
	baseURL: String(process.env.APP_URL).replace(/\/+$/, ''),
	headers: axiosHeaders,
	// withCredentials: true,
}
export const axiosWithCredentialsConfig = {
	...axiosConfig,
	withCredentials: true,
	withXSRFToken: true,
}
export default axios.create(axiosConfig)

export const axiosWithCredentials = axios.create(axiosWithCredentialsConfig)
