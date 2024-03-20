import React from 'react'
import { IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSTab.module.css'
import { IOSTabContextProvider } from './iOSTabContext'
import IOSTitleBarRoot from '../iOSTabTitleBarRoot/iOSTabTitleBarRoot'
import { useIOSAppContext } from '../iOSApp/iOSAppContext'

interface IOSTabProps extends IOSElementProps {
	selected?: boolean
	name: string
	page?: string
}

const IOSTab = ({ children, selected, ...props }: IOSTabProps) => {
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
				<slot>{children}</slot>
			</IOSTabContextProvider>
		</div>
	)
}

export default IOSTab
