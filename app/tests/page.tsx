import React from 'react'
import ReleasesPage from '@/src/components/Pages/User/releases'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'New Releases',
}

interface TestProps {}

export default function Test({}: TestProps) {
	return <ReleasesPage></ReleasesPage>
}
