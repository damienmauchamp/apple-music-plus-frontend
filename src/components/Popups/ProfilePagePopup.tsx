import React from 'react'
import PopupDOM, { PopupDOMProps } from '../PopupsTypes/PopupDOM'
import ProfilePage from '../Pages/ProfilePage'

interface ProfilePagePopupProps extends PopupDOMProps {}

const ProfilePagePopup = ({ ...props }: ProfilePagePopupProps) => {
	return (
		<PopupDOM
			title={'Profile'}
			className={'popup-profile'}
			push
			swipeToClose={'to-bottom'}
			{...props}
		>
			<ProfilePage popup />
		</PopupDOM>
	)
}

export default ProfilePagePopup
