import React, { useEffect, useState } from 'react'
import { IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSTab.module.css'
import { IOSTabContextProvider } from './iOSTabContext'
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
	// PAGES
	const [tabPages, setTabPages] = useState<IOSPageProps[]>(
		[pages[0]] || ([] as IOSPageProps[])
	)
	// const openTabPage = (name: string) => {}

	//
	const { addTabRef } = useIOSAppContext()
	const tabRef = addTabRef(props.name)
	// useIOSTabContext()

	useEffect(() => {
		console.log('[Tab] pages', pages)
	}, [pages])

	return (
		<IOSTabContextProvider
			tabRef={tabRef}
			tabInfo={{ name: props.name, pages: pages }}
			// setTabPages={setTabPages}
		>
			<div
				ref={tabRef}
				data-element="i-tab"
				className={`${styles.iTab} ${selected ? styles.selected : ''}`}
				{...props}
			>
				<IOSTitleBarRoot />
				<slot>
					{tabPages.map((page) => (
						<IOSPage key={page.id} {...page} />
					))}
				</slot>
				{/* <slot>{children}</slot> */}
			</div>
		</IOSTabContextProvider>
	)
}

export default IOSTab
