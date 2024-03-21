import React, { useEffect } from 'react'
import { IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSTab.module.css'
import { IOSTabContextProvider, useIOSTabContext } from './iOSTabContext'
import IOSTitleBarRoot from '../iOSTabTitleBarRoot/iOSTabTitleBarRoot'
import { useIOSAppContext } from '../iOSApp/iOSAppContext'
import IOSPage, { IOSPageProps } from '../iOSPage/iOSPage'

interface IOSTabProps extends IOSElementProps {
	selected?: boolean
	name: string
	pages?: IOSPageProps[]
	// pages?: (typeof IOSPage)[]
	page?: string
}

const IOSTab = ({
	pages = [],
	/*children,*/ selected,
	...props
}: IOSTabProps) => {
	const { addTabRef } = useIOSAppContext()
	const tabRef = addTabRef(props.name)
	useIOSTabContext({ tabRef: tabRef })

	useEffect(() => {
		console.log('[Tab] pages', pages)
	}, [pages])

	return (
		<IOSTabContextProvider tabRef={tabRef}>
			<div
				ref={tabRef}
				data-element="i-tab"
				className={`${styles.iTab} ${selected ? styles.selected : ''}`}
				{...props}
			>
				<IOSTitleBarRoot />
				<slot>
					{pages.map((page) => (
						<IOSPage key={page.id} {...page} />
					))}
				</slot>
				{/* <slot>{children}</slot> */}
			</div>
		</IOSTabContextProvider>
	)
}

export default IOSTab
