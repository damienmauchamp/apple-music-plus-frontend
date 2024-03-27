'use client'

import { useEffect, useState } from 'react'
import { HashRouter } from 'react-router-dom'

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const [ready, setReady] = useState(false)
	useEffect(() => {
		setReady(true)
	}, [])
	return ready && <HashRouter>{children}</HashRouter>
}

export default Layout
