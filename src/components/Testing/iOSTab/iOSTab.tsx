import React from 'react'
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
	const { addTabRef } = useIOSAppContext()
	// const { getTabsRefs } = useIOSTabContext()

	const tabRef = addTabRef(props.name)

	return (
		<div
			ref={tabRef}
			data-element="i-tab"
			className={`${styles.iTab} ${selected ? styles.selected : ''}`}
			{...props}
		>
			<IOSTabContextProvider>
				<IOSTitleBarRoot />
				<slot>
					{pages.map((page) => (
						<IOSPage key={page.id} {...page} />
					))}
				</slot>
				{/* <slot>{children}</slot> */}
			</IOSTabContextProvider>
		</div>
	)
}

export default IOSTab
