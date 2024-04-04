import React, { useEffect, useState } from 'react'
import {
	NavTitle,
	NavTitleLarge,
	Navbar,
	Page,
	f7ready,
} from 'framework7-react'
import ProfileLink from '../Elements/ProfileLink/ProfileLink'
import ProfilePagePopup from '../Popups/ProfilePagePopup'

export interface F7PageProps {
	name: string
	title: string
	backLink?: string
	children?: React.ReactNode
	home?: boolean
	// nav
	navBarLarge?: boolean
}

const F7Page = ({
	name = '',
	title,
	backLink,
	children,
	home = false,
	// nav
	navBarLarge = true,
}: F7PageProps) => {
	// F7
	const [ready, setReady] = useState<any>(false)
	useEffect(() => {
		f7ready(() => {
			// (f7)
			setReady(true)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const titleVisible = () => ready && (!home || (home && ready))

	return (
		<>
			<Page
				className={`page-${name} !bg-white dark:!bg-black`}
				// colorTheme="pink"
			>
				<Navbar
					title={titleVisible() && title}
					backLink={backLink}
					large={navBarLarge}
					transparent
					sliding
					// colorTheme="pink"
				>
					<NavTitle>{titleVisible() && title}</NavTitle>
					{/* <NavTitleLarge>{titleVisible() && title}</NavTitleLarge> */}
					<NavTitleLarge>
						{titleVisible() && (
							<>
								{title}
								<ProfileLink nav popup />
							</>
						)}
					</NavTitleLarge>
				</Navbar>
				{children}
				<ProfilePagePopup />
			</Page>
		</>
	)
}

export default F7Page
