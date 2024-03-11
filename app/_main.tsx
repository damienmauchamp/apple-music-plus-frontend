'use client'
import Header from '@/src/components/tests/header'
import { MusicKitContextProvider } from '@/src/context/MusicKitContext'
import React from 'react'

function Main({
	children,
}: Readonly<{
	children: React.ReactNode
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
