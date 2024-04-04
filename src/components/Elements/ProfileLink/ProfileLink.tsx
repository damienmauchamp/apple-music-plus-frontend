import { Link } from 'framework7-react'
import React, { useEffect } from 'react'
import styles from './ProfileLink.module.css'
import { LinkProps } from 'framework7-react/components/link.js'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { useMusicKitContext } from '@/src/context/MusicKitContext'

interface ProfileLinkProps extends LinkProps {
	nav?: boolean
	popup?: boolean
}

// todo : popup https://framework7.io/react/popup
const ProfileLink = ({
	nav = false,
	popup = false,
	...props
}: ProfileLinkProps) => {
	const { logged, isAuthorized } = useMusicKitContext()

	const [isLogged, setIsLogged] = React.useState<boolean>(
		isAuthorized() || logged
	)

	useEffect(() => {
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

	const linkProps = () => {
		if (popup) {
			return {
				popupOpen: '.popup-profile',
			}
		}

		return {
			href: '/profile',
		}
	}

	const content = () => (
		<>
			<Link {...props} {...linkProps()}>
				<IoPersonCircleOutline
					size={'100%'}
					color={isLogged ? 'var(--f7-color-pink)' : 'gray'}
				/>
			</Link>
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
