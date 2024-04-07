import React, { HTMLAttributes } from 'react'
import styles from './Loading.module.css'

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
	text?: string
	subText?: string
	children?: React.ReactNode
	className?: string
	textClassName?: string
	subTextClassName?: string
}

const Loading = ({
	text = 'Loading...',
	subText = '',
	children,
	className,
	textClassName,
	subTextClassName,
	...props
}: LoadingProps) => {
	return (
		<div
			className={`flex flex-col justify-center items-center w-full bg-red p-4 text-items-secondary dark:text-items-secondary-dark ${className} ${styles.fadeIn}`}
			{...props}
		>
			{text && <div className={`text-xl ${textClassName}`}>{text}</div>}
			{children}
			{subText && (
				<div className={`text-sm ${subTextClassName}`}>{subText}</div>
			)}
		</div>
	)
}

export default Loading
