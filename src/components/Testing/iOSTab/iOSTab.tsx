import React from 'react'
import { IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSTab.module.css'

interface IOSTabProps extends IOSElementProps {
	selected?: boolean
	name?: string
	page?: string
}

const iOSTab = ({ children, selected, ...props }: IOSTabProps) => {
	return (
		<div
			data-element="i-tab"
			className={`${styles.iTab} ${selected ? styles.selected : ''}`}
			{...props}
		>
			{children}
		</div>
	)
}

export default iOSTab
