import React from 'react'
import styles from './IOSApp.module.css'
// export class IOSAnimationId {}

export interface IOSElementProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode
}

interface IOSAppProps extends IOSElementProps {}

function IOSApp({ children, ...props }: IOSAppProps) {
	return (
		<div data-element="i-root" className={styles.iRoot}>
			<div data-element="i-app" className={styles.iApp} {...props}>
				{children}
			</div>
		</div>
	)
}

export default IOSApp
