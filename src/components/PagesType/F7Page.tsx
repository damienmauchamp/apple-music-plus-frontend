import React, { useEffect, useState } from 'react'
import { NavTitleLarge, Navbar, Page, f7ready } from 'framework7-react'
import ProfileLink from '../Elements/ProfileLink/ProfileLink'
import ProfilePagePopup from '../Popups/ProfilePagePopup'
import { PageProps } from 'framework7-react/components/page.js'

export interface F7PageProps extends PageProps {
	name: string
	title: string
	backLink?: string
	fixed?: React.ReactNode
	children?: React.ReactNode
	home?: boolean
	// nav
	navBarLarge?: boolean
	hideTitle?: boolean
}

const F7Page = ({
	name = '',
	title,
	backLink,
	fixed,
	children,
	home = false,
	// nav
	navBarLarge = true,
	hideTitle = false,
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
	// console.log(`%c[F7Page:${name}] RENDER`, 'color:cyan;')

	// title
	const titleVisible = () => !hideTitle && ready && (!home || (home && ready))

	// nav
	const [navbarCollapsed, setNavbarCollapsed] = useState(false) // !navBarLarge

	return (
		<>
			<Page
				className={`page-${name} !bg-white dark:!bg-black ${navbarCollapsed ? 'page-with-navbar-large-collapsed' : ''} `}
				{...props}
			>
				{/* todo : ProfileLink */}
				{fixed && <div slot="fixed">{fixed}</div>}
				<Navbar
					title={titleVisible() && title}
					// title={title}
					backLink={backLink}
					large={navBarLarge}
					transparent
					sliding
					outline={false}
					onNavbarCollapse={() => setNavbarCollapsed(true)}
					onNavbarExpand={() => setNavbarCollapsed(false)}
				>
					{titleVisible() && (
						<NavTitleLarge>
							<>
								{title}
								<ProfileLink nav popup />
							</>
						</NavTitleLarge>
					)}
				</Navbar>
				{children}
				<ProfilePagePopup />
			</Page>
		</>
	)
}

export default F7Page
