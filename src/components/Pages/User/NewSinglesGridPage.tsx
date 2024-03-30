'use client'
import useAuth from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import Loading from '../../Components/Loading/Loading'
import NewSinglesGridSection from '../../PageComponents/NewSingles/NewSinglesGridSection'
import PageNavigation from '../PageNavigation/PageNavigation'
import { ReleasesPagesProps } from '@/types/ReleasesPages'

interface NewSinglesGridPageProps extends ReleasesPagesProps {}
export default function NewSinglesGridPage({
	...props
}: NewSinglesGridPageProps) {
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

	const content = () =>
		!ready ? (
			<Loading subText="Loading new singles page" />
		) : (
			<NewSinglesGridSection />
		)

	if (!props.newNav) {
		return (
			<PageNavigation
				title={'New Singles'}
				goBack={true}
				largeTitle={true}
			>
				{content()}
			</PageNavigation>
		)
	}
	return content()
}
