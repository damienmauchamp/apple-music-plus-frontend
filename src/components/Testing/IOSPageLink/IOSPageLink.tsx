import React, { ReactNode, useEffect } from 'react'
import { useIOSTabContext } from '../iOSTab/iOSTabContext'

interface Props {
	nextPage?: any
	children?: ReactNode
}

const IOSPageLink = ({ children, nextPage }: Props) => {
	const { tabRef, tabInfo, getPagesRefs } = useIOSTabContext()

	useEffect(() => {
		console.log('[IOSPageLink] tabRef:', tabRef)
	}, [tabRef])

	useEffect(() => {
		console.log('[IOSPageLink] tabInfo:', tabInfo)
	}, [tabInfo])

	const nextPageHandler = () => {
		console.log('[iOSPageLink] nextPage:', nextPage)
		console.log('[iOSPageLink] tabRef:', tabRef)
		console.log('[iOSPageLink] tabInfo:', tabInfo)
		console.log(
			'[iOSPageLink] getPagesRefs:',
			getPagesRefs && getPagesRefs()
		)
	}

	return (
		<button data-nextpage={nextPage} onClick={() => nextPageHandler()}>
			{children}
		</button>
	)
}

export default IOSPageLink
