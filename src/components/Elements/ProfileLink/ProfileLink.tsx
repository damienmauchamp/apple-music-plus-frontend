import { Link } from 'framework7-react'
import React, { useEffect } from 'react'
import styles from './ProfileLink.module.css'
import { LinkProps } from 'framework7-react/components/link.js'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { useMusicKitContext } from '@/src/context/MusicKitContext'

interface ProfileLinkProps extends LinkProps {
	nav?: boolean
}

// todo : popup https://framework7.io/react/popup
const ProfileLink = ({ nav = false, ...props }: ProfileLinkProps) => {
	const { logged, isAuthorized } = useMusicKitContext()

	const [isLogged, setIsLogged] = React.useState<boolean>(
		isAuthorized() || logged
	)

	useEffect(() => {
		console.log('[ProfileLink] uE', {
			isAuthorized: isAuthorized(),
			logged: logged,
		})
		setIsLogged(isAuthorized() || logged)
	}, [isAuthorized, logged])

	useEffect(() => {
		const checkLogged = () => isAuthorized() || logged

		const intervalId = setInterval(() => {
			if (checkLogged() !== isLogged) {
				setIsLogged(checkLogged())
			}
		}, 500)
		return () => clearInterval(intervalId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const content = () => (
		<>
			<Link {...props} href={'/profile/'}>
				<IoPersonCircleOutline
					size={'100%'}
					color={isLogged ? 'var(--f7-color-pink)' : 'gray'}
				/>
			</Link>
			{/* <Button fill popupOpen=".demo-popup-push"> */}
			{/* </Button> */}
		</>
	)

	if (nav) {
		return (
			<div className={`${styles.container} ${styles.containerNav}`}>
				{content()}
			</div>
		)
	}

	return (
		<div className={`${styles.container} ${styles.containerPage}`}>
			{content()}
		</div>
	)
}

export default ProfileLink
