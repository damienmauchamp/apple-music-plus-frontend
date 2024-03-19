import React from 'react'
import { IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSPage.module.css'

interface IOSPageProps extends IOSElementProps {
	title: string
	titlebar?: string // titled
	//
	backTitle?: string
}

const iOSPage = ({
	children,
	title,
	titlebar = 'titled',
	backTitle = '',
	...props
}: IOSPageProps) => {
	const backSVG = (
		<svg viewBox="0 0 12 20" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="currentColor"
				d="M0.610352 10.0068C0.615885 9.81315 0.654622 9.63607 0.726562 9.47559C0.798503 9.3151 0.90918 9.16016 1.05859 9.01074L9.37598 0.958984C9.61393 0.721029 9.90723 0.602051 10.2559 0.602051C10.4883 0.602051 10.6986 0.657389 10.8867 0.768066C11.0804 0.878743 11.2326 1.02816 11.3433 1.21631C11.4595 1.40446 11.5176 1.61475 11.5176 1.84717C11.5176 2.19027 11.3875 2.49186 11.1274 2.75195L3.60693 9.99854L11.1274 17.2534C11.3875 17.519 11.5176 17.8206 11.5176 18.1582C11.5176 18.3962 11.4595 18.6092 11.3433 18.7974C11.2326 18.9855 11.0804 19.1349 10.8867 19.2456C10.6986 19.3618 10.4883 19.4199 10.2559 19.4199C9.90723 19.4199 9.61393 19.2982 9.37598 19.0547L1.05859 11.0029C0.903646 10.8535 0.790202 10.6986 0.718262 10.5381C0.646322 10.3721 0.610352 10.195 0.610352 10.0068Z"
			></path>
		</svg>
	)

	return (
		<div
			data-element="i-page"
			className={`${styles.iPage}`}
			data-titlebar={titlebar}
			{...props}
		>
			{/* region i-titlebar-titled */}
			<div
				data-element="i-titlebar-titled"
				data-titlebar={titlebar}
				className={`${styles.titlebarDefault} ${titlebar === 'titled' && styles.titleBarTitled}`}
			>
				<div id="content-container" className={styles.contentContainer}>
					<div id="statusbar"></div>
					<div
						id="controls-container"
						className={styles.controlsContainer}
					>
						{/* back button */}
						<div
							id="back-container"
							className={styles.backContainer}
						>
							<div id="back-arrow" className={styles.backArrow}>
								{backSVG}
							</div>
							<div id="back-text" className={styles.backText}>
								{backTitle}
							</div>
						</div>
						<div
							id="title"
							// style={{ opacity: 0, visibility: 'hidden' }}
							style={{}}
							className={styles.title}
						>
							{title}
						</div>
						<div
							id="tools-container"
							className={styles.toolsContainer}
						>
							{/* todo : tools */}
							<slot name="tools"></slot>
						</div>
					</div>
				</div>
			</div>
			{/* endregion i-titlebar-titled */}

			{/* region page-container */}
			<div data-element="page-container" className={styles.pageContainer}>
				{/* page-header */}
				<div data-element="page-header" className={styles.pageHeader}>
					<div
						id="header-title-container"
						className={styles.headerTitleContainer}
					>
						<div id="header-title" className={styles.headerTitle}>
							{title}
						</div>
					</div>
				</div>

				{/* page-body */}
				<div data-element="page-body" className={styles.pageBody}>
					{children}
				</div>
			</div>
			{/* endregion page-container */}
		</div>
	)
}

export default iOSPage
