import React, { useEffect, useState } from 'react'
import {
	NavTitle,
	NavTitleLarge,
	Navbar,
	Page,
	f7ready,
} from 'framework7-react'

export interface F7PageProps {
	name: string
	title: string
	backLink?: string
	children?: React.ReactNode
	home?: boolean
}

const F7Page = ({
	name,
	title,
	backLink,
	children,
	home = false,
}: F7PageProps) => {
	// F7
	const [ready, setReady] = useState<any>(false)
	useEffect(() => {
		f7ready((f7) => {
			setReady(true)
			console.log('[F7Page] Page', name, 'ready', f7)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const titleVisible = () => !home || (home && ready)

	return (
		<>
			<Page
				colorTheme="pink"
				className={`page-${name} !bg-white dark:!bg-black`}
			>
				<Navbar
					// title={(!home && title) || (home && ready && title)}
					// title={titleVisible() && title}
					backLink={backLink}
					large
					transparent
					sliding
				>
					<NavTitle>{titleVisible() && title}</NavTitle>
					<NavTitleLarge>{titleVisible() && title}</NavTitleLarge>
					{/* <NavTitleLarge>
						{titleVisible() && (
							<>
								{title}
								<ProfileLink nav={true} />
							</>
						)}
					</NavTitleLarge> */}
				</Navbar>
				{children}
			</Page>
		</>
	)
}

export default F7Page
