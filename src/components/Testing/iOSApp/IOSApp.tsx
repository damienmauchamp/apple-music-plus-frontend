import React, { useEffect } from 'react'
import styles from './IOSApp.module.css'
import { IOSAppContextProvider, useIOSAppContext } from './iOSAppContext'
import { getHash } from '@/src/helpers/iOSPage'

export class IOSAnimationId {}

export interface IOSElementProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode
}

interface IOSAppProps extends IOSElementProps {}

function IOSApp({ children, ...props }: IOSAppProps) {
	const { appRef, getTabsRefs } = useIOSAppContext()

	const startHash = getHash()

	console.log('[APP] START', startHash)
	useEffect(() => {
		console.log('[APP] INIT', startHash)
		// todo : select right tab
		// openPage(getHash())
	}, [])

	useEffect(() => {
		console.log('[APP] appRef', appRef)
	}, [appRef])

	useEffect(() => {
		// console.log('App.getTabsRefs', getTabsRefs())
	}, [getTabsRefs])

	return (
		<IOSAppContextProvider startHash={startHash}>
			<div data-element="i-root" className={styles.iRoot}>
				<div
					data-element="i-app"
					ref={appRef}
					className={styles.iApp}
					{...props}
				>
					{/* <button
						onClick={() => {
							console.log('getTabsRefs', getTabsRefs())
						}}
					>
						xxx
					</button> */}
					{children}
				</div>
			</div>
		</IOSAppContextProvider>
	)
}

export default IOSApp
