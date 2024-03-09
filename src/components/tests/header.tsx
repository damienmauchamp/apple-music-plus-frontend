'use client'
import useAuth from '@/lib/useAuth'
import React from 'react'

// type Props = {}

const Header = ({}) => {
	const { user, logout, isLoading } = useAuth()

	return (
		<header className="p-4 bg-gray-200 dark:bg-gray-700">
			<div className="flex justify-between">
				<div>
					<a href="/">Home</a>
				</div>

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
	)
}

export default Header
