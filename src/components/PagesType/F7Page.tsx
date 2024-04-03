import React, { useEffect, useState } from 'react'
import { Navbar, Page, f7ready } from 'framework7-react'

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

	return (
		<>
			<Page className={`page-${name}`}>
				<Navbar
					title={(!home && title) || (home && ready && title)}
					backLink={backLink}
					large
					transparent
					sliding
				/>
				{children}
			</Page>
		</>
	)
}

export default F7Page
