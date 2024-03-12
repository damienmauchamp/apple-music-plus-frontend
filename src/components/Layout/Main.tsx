'use client'
import React from 'react'
import Header from './Header'
import { MusicKitContextProvider } from '@/src/context/MusicKitContext'

function Main({
	children,
}: Readonly<{
	children?: React.ReactNode
}>) {
	return (
		<MusicKitContextProvider>
			<>
				<Header />
				<main>{children}</main>
			</>
		</MusicKitContextProvider>
	)
}

export default Main
