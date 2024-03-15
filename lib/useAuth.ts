import useSWR from 'swr'
import { axiosWithCredentials as axios } from './axios'
// import router from 'next/router'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'

interface MiddlewareType {
	middleware?: string
}

interface User {
	id: number
	name: string
	email: string
	email_verified_at: string | null
	created_at: string
	updated_at: string
}

export interface RegisterType {
	name: string
	email: string
	password: string
	setErrors: Dispatch<SetStateAction<string[]>>
}

export interface LoginType {
	email: string
	password: string
	remember: boolean
	setErrors: Dispatch<SetStateAction<string[]>>
}

export type RegisterFunction = ({
	setErrors,
	...props
}: RegisterType) => Promise<void>
export type LoginFunction = ({
	setErrors,
	...props
}: LoginType) => Promise<void>
export type LogoutFunction = () => Promise<void>

interface AuthType {
	user: User
	csrf: () => Promise<AxiosResponse>
	register: RegisterFunction
	// login: ({ setErrors, ...props }: LoginType) => Promise<void>
	login: LoginFunction
	logout: LogoutFunction
	isLoading: boolean
	hasTestToken: boolean
}

const useAuth = ({ middleware }: MiddlewareType = {}): AuthType => {
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(true)

	const {
		data: user,
		error,
		mutate,
	} = useSWR('/api/user', () =>
		axios.get('/api/user').then((response) => response.data)
	)

	// todo : env ?
	const hasTestToken = Boolean(process.env.TEST_USER_TOKEN)

	useEffect(() => {
		if (user || error) {
			setIsLoading(false)
		}

		if (middleware == 'guest' && user) router.push('/')
		if (middleware == 'auth' && !user && !hasTestToken && error)
			router.push('/login')
	}, [user, error, middleware, router, hasTestToken])

	const csrf = () => axios.get('/sanctum/csrf-cookie')

	const register = async ({ setErrors, ...props }: RegisterType) => {
		setErrors([])

		axios
			.post('/api/auth/register', props)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			.then(() => mutate() && router.push(`/login?email=${props.email}`))
			.catch((error) => {
				// if (error.response.status !== 422) throw error
				setErrors([error.response.data.message])
			})
	}

	const login = async ({ setErrors, ...props }: LoginType) => {
		setErrors([])

		await csrf()

		axios
			.post('/api/auth/login', props)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			.then(() => mutate() && router.push('/'))
			.catch((error) => {
				// if (error.response.status !== 422) throw error
				setErrors([error.response.data.message])
			})
	}

	const logout = async () => {
		await axios.post('/api/auth/logout')

		mutate(null)

		return router.push('/login')
	}

	return {
		user,
		csrf,
		register,
		login,
		logout,
		isLoading,
		hasTestToken,
	}
}

export default useAuth
