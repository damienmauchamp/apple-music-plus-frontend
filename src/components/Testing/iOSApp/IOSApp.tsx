import React, { useEffect } from 'react'
import styles from './IOSApp.module.css'
import { IOSAppContextProvider, useIOSAppContext } from './iOSAppContext'

// export class IOSAnimationId {}
export interface IOSElementProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode
}

interface IOSAppProps extends IOSElementProps {}

function IOSApp({ children, ...props }: IOSAppProps) {
	const { appRef, getTabsRefs } = useIOSAppContext()

	useEffect(() => {
		console.log('App.getTabsRefs', getTabsRefs())
	}, [getTabsRefs])

	return (
		<IOSAppContextProvider>
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
