import { Link } from 'framework7-react'
import React, { useEffect } from 'react'
import styles from './ProfileLink.module.css'
import { LinkProps } from 'framework7-react/components/link.js'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { User } from '@/lib/useAuth'
import { useMusicKitContext } from '@/src/context/MusicKitContext'

interface ProfileLinkProps extends LinkProps {
	nav?: boolean
}

const ProfileLink = ({ nav = false, ...props }: ProfileLinkProps) => {
	const { logged, isAuthorized } = useMusicKitContext()

	const [isLogged, setIsLogged] = React.useState<boolean>(
		isAuthorized() || logged
	)

	useEffect(() => {
		setIsLogged(isAuthorized() || logged)
	}, [isAuthorized, logged])

	const content = () => (
		<Link {...props} href={'/profile/'}>
			<IoPersonCircleOutline
				size={'100%'}
				color={isLogged ? 'var(--f7-color-pink)' : 'gray'}
			/>
		</Link>
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
