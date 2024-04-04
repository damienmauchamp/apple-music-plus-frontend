import useAuth from '@/lib/useAuth'
import { useState, useEffect } from 'react'
import Loading from '../Components/Loading/Loading'
import PageNavigation from '../Pages/PageNavigation/PageNavigation'

interface Props {
	children?: React.ReactNode
	loadingText?: string
	// new
	newNav?: boolean
	// old
	oldPageTitle?: string
	oldGoBack?: boolean
	oldLargeTitle?: boolean
}

export default function AppPage({
	children,
	loadingText = 'Loading',
	oldPageTitle,
	oldGoBack = false,
	oldLargeTitle = false,
	...props
}: Props) {
	// todo

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
		return <Loading subText={loadingText} />
	}

	const content = () =>
		!ready ? <Loading subText={loadingText} /> : children

	if (!props.newNav) {
		return (
			<PageNavigation
				title={oldPageTitle}
				goBack={oldGoBack}
				largeTitle={oldLargeTitle}
			>
				{content()}
			</PageNavigation>
		)
	}
	return <>{content()}</>
}
