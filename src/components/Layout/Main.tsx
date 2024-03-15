'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { MusicKitContextProvider } from '@/src/context/MusicKitContext'
import UINavigation from '../Components/UINavigation/UINavigation'

function Main({
	children,
}: Readonly<{
	children?: React.ReactNode
}>) {
	const [title, setTitle] = useState<string>('Home')
	const [search, setSearch] = useState<boolean>(true)

	useEffect(() => {
		setTitle('Home')
		setSearch(true)
	}, [])

	return (
		<MusicKitContextProvider>
			<>
				<UINavigation title={title} search={search}>
					<Header />
					<main>{children}</main>
				</UINavigation>
			</>
		</MusicKitContextProvider>
	)
}

export default Main
