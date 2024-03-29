import { ForwardedRef, forwardRef } from 'react'
import styles from './iOSTitleBar.module.css'

export interface IOSTitleBarElementProps {
	titlebar?: string // titled
	prevPage?: string
	backTitle?: string
}

export interface IOSTitleBarProps extends IOSTitleBarElementProps {
	title: string
	titlebar?: string // titled
	prevPage?: string
	backTitle?: string
}

interface TitleBarRefs {
	titlebarRef: ForwardedRef<HTMLDivElement>
	headerTitleRef: ForwardedRef<HTMLDivElement>
	pageContainerRef: ForwardedRef<HTMLDivElement>
	statusbarElementRef: ForwardedRef<HTMLDivElement>
	titleElementRef: ForwardedRef<HTMLDivElement>
	toolsContainerElementRef: ForwardedRef<HTMLDivElement>
	backContainerElementRef: ForwardedRef<HTMLDivElement>
	backTextElementRef: ForwardedRef<HTMLDivElement>
	backArrowElementRef: ForwardedRef<HTMLDivElement>
	backgroundElementRef: ForwardedRef<HTMLDivElement>
}

const IOSTitleBar = forwardRef<HTMLDivElement, IOSTitleBarProps>(
	(
		{ title, titlebar, prevPage, backTitle }: IOSTitleBarProps,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		const refs = ref as unknown as TitleBarRefs

		const {
			titlebarRef,
			statusbarElementRef,
			titleElementRef,
			toolsContainerElementRef,
			backContainerElementRef,
			backTextElementRef,
			backArrowElementRef,
			backgroundElementRef,
		} = refs

		return (
			<>
				{/* region i-titlebar-titled */}
				<div
					ref={titlebarRef} // todo : forwardRef
					// data-element="i-titlebar-titled"
					data-element={`i-titlebar-${titlebar}`}
					data-titlebar={titlebar}
					className={`${styles.titlebarDefault} 
			${titlebar === 'titled' && styles.titleBarTitled}
			${titlebar === 'image' && styles.titleBarImage}
			`}
				>
					<div
						id="content-container"
						className={styles.contentContainer}
					>
						<div ref={statusbarElementRef} id="statusbar"></div>
						<div
							id="controls-container"
							className={styles.controlsContainer}
						>
							{/* back button */}
							<div
								ref={backContainerElementRef}
								id="back-container"
								className={styles.backContainer}
							>
								<div
									ref={backArrowElementRef}
									id="back-arrow"
									className={styles.backArrow}
									style={
										prevPage === undefined
											? { opacity: 0, scale: 0 }
											: {}
									}
								>
									{backArrowSVG()}
								</div>
								<div
									ref={backTextElementRef}
									id="back-text"
									className={styles.backText}
									style={
										prevPage === undefined
											? { opacity: 0 }
											: {}
									}
								>
									{prevPage !== undefined && backTitle}
								</div>
							</div>
							<div
								ref={titleElementRef}
								id="title"
								style={
									titlebar === 'titled'
										? { opacity: 0, visibility: 'hidden' }
										: {}
								}
								className={styles.title}
							>
								{title}
							</div>
							<div
								ref={toolsContainerElementRef}
								id="tools-container"
								className={styles.toolsContainer}
							>
								{/* todo : tools */}
								<slot name="tools"></slot>
							</div>
						</div>
					</div>
					<div
						ref={backgroundElementRef}
						id="background"
						className={`${styles.titlebarBackground} i-material-chrome`}
						style={{}}
					></div>
				</div>
				{/* endregion i-titlebar-titled */}
			</>
		)
	}
)
IOSTitleBar.displayName = 'IOSTitleBar'

export default IOSTitleBar

//

export const backArrowSVG = (props?: {
	id?: string
	className?: string
	ref?: React.RefObject<SVGSVGElement>
	// 'data-element'?: string
}) => (
	<svg viewBox="0 0 12 20" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fill="currentColor"
			d="M0.610352 10.0068C0.615885 9.81315 0.654622 9.63607 0.726562 9.47559C0.798503 9.3151 0.90918 9.16016 1.05859 9.01074L9.37598 0.958984C9.61393 0.721029 9.90723 0.602051 10.2559 0.602051C10.4883 0.602051 10.6986 0.657389 10.8867 0.768066C11.0804 0.878743 11.2326 1.02816 11.3433 1.21631C11.4595 1.40446 11.5176 1.61475 11.5176 1.84717C11.5176 2.19027 11.3875 2.49186 11.1274 2.75195L3.60693 9.99854L11.1274 17.2534C11.3875 17.519 11.5176 17.8206 11.5176 18.1582C11.5176 18.3962 11.4595 18.6092 11.3433 18.7974C11.2326 18.9855 11.0804 19.1349 10.8867 19.2456C10.6986 19.3618 10.4883 19.4199 10.2559 19.4199C9.90723 19.4199 9.61393 19.2982 9.37598 19.0547L1.05859 11.0029C0.903646 10.8535 0.790202 10.6986 0.718262 10.5381C0.646322 10.3721 0.610352 10.195 0.610352 10.0068Z"
		></path>
	</svg>
)