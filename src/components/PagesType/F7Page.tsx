import React, { useEffect, useState } from 'react'
import { NavTitleLarge, Navbar, Page, f7ready } from 'framework7-react'
import ProfileLink from '../Elements/ProfileLink/ProfileLink'
import ProfilePagePopup from '../Popups/ProfilePagePopup'
import { PageProps } from 'framework7-react/components/page.js'

export interface F7PageProps extends PageProps {
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
	...props
}: F7PageProps) => {
	// F7
	const [ready, setReady] = useState<any>(false)
	useEffect(() => {
		// console.log(`%c[F7Page:${name}] MOUNTED`, 'color:green;')

		f7ready(() => {
			// (f7)
			setReady(true)
		})

		return () => {
			// console.log(`%c[F7Page:${name}] UNMOUNTED`, 'color:red;')
		}
	}, [])

	const titleVisible = () => ready && (!home || (home && ready))

	// console.log(`%c[F7Page:${name}] RENDER`, 'color:cyan;')

	return (
		<>
			<Page
				className={`page-${name} !bg-white dark:!bg-black`}
				{...props}
			>
				<Navbar
					title={titleVisible() && title}
					// title={title}
					backLink={backLink}
					large={navBarLarge}
					transparent
					sliding
				>
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
