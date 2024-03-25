import React, { ReactNode, useEffect } from 'react'
import { useIOSTabContext } from '../iOSTab/iOSTabContext'

export interface iOSPageLinkProps {
	back?: boolean
	nextPage?: any
	children?: ReactNode
}

const IOSPageLink = ({
	children,
	back = false,
	nextPage,
}: iOSPageLinkProps) => {
	const { tabRef, tabInfo, getPagesRefs, goBack, openPage } =
		useIOSTabContext()

	// useEffect(() => {
	// 	console.log('[IOSPageLink] tabRef:', tabRef)
	// }, [tabRef])

	// useEffect(() => {
	// 	console.log('[IOSPageLink] tabInfo:', tabInfo)
	// }, [tabInfo])

	const nextPageHandler = () => {
		if (back) {
			// console.log('[iOSPageLink] going back')
			goBack()
			return
		}
		// console.log('[iOSPageLink] nextPage:', nextPage)
		// console.log('[iOSPageLink] tabRef:', tabRef)
		// console.log('[iOSPageLink] tabInfo:', tabInfo)
		// console.log(
		// 	'[iOSPageLink] getPagesRefs:',
		// 	getPagesRefs && getPagesRefs()
		// )

		openPage(nextPage)
	}

	return (
		<button data-nextpage={nextPage} onClick={() => nextPageHandler()}>
			{children}
		</button>
	)
}

export default IOSPageLink
