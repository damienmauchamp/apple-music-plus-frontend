import axios from 'axios'

export const axiosHeaders = {
	'X-Requested-With': 'XMLHttpRequest',
}
export const axiosConfig = {
	baseURL: String(process.env.APP_URL).replace(/\/+$/, ''),
	headers: axiosHeaders,
	// withCredentials: true,
}
export default axios.create(axiosConfig)
