import React, { useEffect } from 'react'
import F7Page from '../PagesType/F7Page'
import { BlockTitle, List, ListButton, ListItem } from 'framework7-react'
import useAuth from '@/lib/useAuth'
import { useMusicKitContext } from '@/src/context/MusicKitContext'

export type ProfilePageProps = {
	home?: boolean
}

const ProfilePage = ({}: ProfilePageProps) => {
	// Auth hook
	const { user, logout } = useAuth({
		middleware: 'auth',
	})

	// MK hook
	const { logged, getInstance, updateLogin, isAuthorized } =
		useMusicKitContext()
	const [isLogged, setIsLogged] = React.useState<boolean>(
		isAuthorized() || logged
	)
	useEffect(() => {
		setIsLogged(isAuthorized() || logged)
	}, [isAuthorized, logged])

	// MK auth

	// const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)
	// const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

	const handleLogin = () => {
		if (getInstance().isAuthorized) {
			// Already logged
			console.log('(handleLogin) Already logged')
			updateLogin()
			return
		}

		// setIsLoggingIn(true)

		return getInstance()
			.authorize()
			.then((response: any) => {
				console.log('(handleLogin) authorized reponse:', response, {
					musicKit: getInstance(),
					unauthorize: getInstance().unauthorize || 'ta mère',
				})
				afterLogin()
				// todo
				setIsLogged(true)
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
		// setIsLoggingIn(false)
	}

	const handleLogout = async () => {
		// Logging out
		// setIsLoggingOut(true)

		await getInstance().unauthorize()

		const intervalId = setInterval(() => {
			if (!getInstance().isAuthorized) {
				clearInterval(intervalId)
				// Updating
				// setIsLoggingOut(false)
				// props.onLogout && props.onLogout()
				updateLogin()
				// todo
				setIsLogged(false)
			}
		}, 500)
	}

	return (
		<F7Page
			name="profile"
			title="Profile"
			backLink={'New Releases'}
			navBarLarge={false}
			home={false}
		>
			<List strong outline mediaList>
				<ListItem
					link
					chevronCenter
					mediaItem
					title={user?.name || 'Unknown'}
					subtitle={user?.email || 'Unknown'}
				></ListItem>
			</List>

			{/* <BlockTitle>Authentication</BlockTitle> */}
			<List inset strong>
				<ListButton
					title={`Apple Music ${isLogged ? 'Logout' : 'Login'}`}
					color={isLogged ? 'red' : 'blue'}
					onClick={isLogged ? handleLogout : handleLogin}
				/>
				<ListButton title="Logout" color="red" onClick={logout} />
			</List>

			<BlockTitle>External Links</BlockTitle>
			<List strong outline dividers>
				<ListItem
					external
					target="_blank"
					link={'https://github.com/damienmauchamp'}
					title="Follow me on Github"
				/>
				<ListItem
					external
					target="_blank"
					link={
						'https://github.com/damienmauchamp/apple-music-plus-frontend'
					}
					title="Project on Github"
				/>
				<ListItem
					external
					target="_blank"
					link={
						'https://github.com/damienmauchamp/apple-music-plus-backend'
					}
					title="Backend project on Github"
				/>
			</List>
		</F7Page>
	)
}

export default ProfilePage
