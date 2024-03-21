import React, { ReactNode, useEffect, useState } from 'react'
import { useIOSTabContext } from '../iOSTab/iOSTabContext'

interface Props {
	nextPage?: any
	children?: ReactNode
}

const IOSPageLink = ({ children, nextPage }: Props) => {
	const { tabRef, getPagesRefs, test } = useIOSTabContext()

	useEffect(() => {
		console.log('[IOSPageLink] tabRef:', tabRef)
	}, [tabRef])

	const nextPageHandler = () => {
		console.log('[iOSPageLink] nextPage:', nextPage)
		console.log('[iOSPageLink] tabRef:', tabRef, test)
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
