import { Button, Link } from 'framework7-react'
import React from 'react'
import PopupDOM from '../PopupsTypes/PopupDOM'
import ProfilePagePopup from '../Popups/ProfilePagePopup'

interface Props {}

function PopupTests({}: Props) {
	// const [ready, setReady] = useState(false)

	// useEffect(() => {
	// 	f7ready(() => {
	// 		setReady(true)
	// 	})
	// }, [])

	// todo : fix "Close"

	const popupTest = () => {
		// return null
		return (
			<div className="grid gap-4">
				<Link href="/profile/">/profile</Link>
				<Link href="/new-releases/">/new-releases</Link>
				Popup
				{/* <Link href="/profile-popup/">/profile-popup</Link> */}
				{/* {ready && <HasBackdrop />} */}
				{/* -- */}
				{/* BUTTON CLASS OK */}
				<Button fill popupOpen=".demo-popup-push">
					Popup Push
				</Button>
				<PopupDOM
					title={'Popup Push'}
					className={'demo-popup-push'}
					push
					swipeToClose
				>
					Yooooooo
				</PopupDOM>
				<Button fill popupOpen=".popup-profile">
					Popup Profile
				</Button>
				<ProfilePagePopup />
			</div>
		)
	}

	return (
		<div>
			PopupTests
			{popupTest()}
		</div>
	)
}

export default PopupTests
