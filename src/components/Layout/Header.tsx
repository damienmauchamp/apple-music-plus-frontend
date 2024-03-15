'use client'
import useAuth from '@/lib/useAuth'
import { useMusicKitContext } from '@/src/context/MusicKitContext'
import React, { useState } from 'react'
import { IoEllipse } from 'react-icons/io5'

// type Props = {}

const Header = ({}) => {
	const { user, logout, isLoading, hasTestToken } = useAuth()
	const { logged, loading, getInstance, updateLogin } = useMusicKitContext()

	const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)
	const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

	const handleLogin = () => {
		if (getInstance().isAuthorized) {
			// Already logged
			console.log('(handleLogin) Already logged')
			updateLogin()
			return
		}

		setIsLoggingIn(true)

		return getInstance()
			.authorize()
			.then((response: any) => {
				console.log('(handleLogin) authorized reponse:', response, {
					musicKit: getInstance(),
					unauthorize: getInstance().unauthorize || 'ta mère',
				})
				afterLogin()
			})
			.catch((err: any) => {
				console.log('(handleLogin) authorized ERROR:', err)
				console.error(err)
				afterLogin()
			})
	}

	const afterLogin = () => {
		// Updating
		updateLogin()
		// props.onLogin && props.onLogin()
		setIsLoggingIn(false)
	}

	const handleLogout = async () => {
		// Logging out
		setIsLoggingOut(true)

		await getInstance().unauthorize()

		const intervalId = setInterval(() => {
			if (!getInstance().isAuthorized) {
				clearInterval(intervalId)
				// Updating
				afterLogout()
			}
		}, 500)
	}

	const afterLogout = () => {
		setIsLoggingOut(false)
		// props.onLogout && props.onLogout()
		updateLogin()
	}

	return (
		<>
			<header className="p-4 bg-gray-200 dark:bg-gray-700">
				<div className="flex justify-between">
					<div>
						<a href="/">Home</a>
					</div>

					{hasTestToken && (
						<div>
							<IoEllipse
								color="yellow"
								title="DEV MODE"
							></IoEllipse>
						</div>
					)}

					{!isLoading &&
						(user ? (
							<div>
								<a href="#" onClick={logout}>
									Logout
								</a>
							</div>
						) : (
							<>
								<div>
									<a href="/login">Login</a>
								</div>
								<div>
									<a href="/register">Register</a>
								</div>
							</>
						))}
				</div>
			</header>
			<header className="p-4 bg-gray-400 dark:bg-gray-600">
				<div className="flex justify-between">
					{loading ? (
						'loading'
					) : !logged ? (
						<div>
							<a href="#" onClick={handleLogin}>
								AM Login
								{isLoggingIn && '...'}
							</a>
						</div>
					) : (
						<div>
							<a href="#" onClick={handleLogout}>
								AM Logout
								{isLoggingOut && '...'}
							</a>
						</div>
					)}
				</div>
			</header>
		</>
	)
}

export default Header
