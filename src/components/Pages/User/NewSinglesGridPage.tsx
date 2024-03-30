'use client'
import useAuth from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import NewSinglesGridSection from '../../PageComponents/NewSingles/NewSinglesGridSection'
import PageNavigation from '../PageNavigation/PageNavigation'

interface NewSinglesGridPageProps {}
export default function NewSinglesGridPage({}: NewSinglesGridPageProps) {
	// Auth hook
	const { user, isLoading, hasTestToken } = useAuth({
		middleware: 'auth',
	})

	// State
	const [ready, setReady] = useState<boolean>(false)

	useEffect(() => {
		if (!isLoading) {
			setReady(true)
		}
	}, [isLoading, user, hasTestToken])

	if (!ready) {
		return <Loading subText="Loading new releases page" />
	}

	return (
		<PageNavigation title={'New Singles'} goBack={true} largeTitle={true}>
			<NewSinglesGridSection />
		</PageNavigation>
	)
}
