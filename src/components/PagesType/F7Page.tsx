import React, { useEffect, useState } from 'react'
import {
	NavTitle,
	NavTitleLarge,
	Navbar,
	Page,
	f7ready,
} from 'framework7-react'
import ProfileLink from '../Elements/ProfileLink/ProfileLink'

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
	console.log('F7 name:', name)

	// F7
	const [ready, setReady] = useState<any>(false)
	useEffect(() => {
		f7ready((f7) => {
			setReady(true)
			console.log('[F7Page] Page', name, 'ready', f7)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const titleVisible = () => ready && (!home || (home && ready))

	return (
		<>
			<Page
				colorTheme="pink"
				className={`page-${name} !bg-white dark:!bg-black`}
			>
				<Navbar
					// title={(!home && title) || (home && ready && title)}
					title={titleVisible() && title}
					backLink={backLink}
					large={navBarLarge}
					transparent
					sliding
				>
					<NavTitle>{titleVisible() && title}</NavTitle>
					{/* <NavTitleLarge>{titleVisible() && title}</NavTitleLarge> */}
					<NavTitleLarge>
						{titleVisible() && (
							<>
								{title}
								<ProfileLink nav={true} />
							</>
						)}
					</NavTitleLarge>
				</Navbar>
				{children}
			</Page>
		</>
	)
}

export default F7Page
