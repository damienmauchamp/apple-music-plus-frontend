'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSPage.module.css'
import { useIOSTabContext } from '../iOSTab/iOSTabContext'
// import { useIOSTabContext } from '../iOSTab/iOSTabContext'

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

export interface IOSPageProps extends IOSElementProps {
	page: string
	//
	title: string
	titlebar?: string // titled
	//
	prevPage?: string
	backTitle?: string
}

const IOSPage = ({
	children,
	title,
	titlebar = 'titled',
	prevPage = undefined,
	backTitle = 'Back',
	...props
}: IOSPageProps) => {
	//
	const { tabRef, addPageRef, getCurrentPage } = useIOSTabContext()
	const pageRef = addPageRef && addPageRef(props.page)
	useEffect(() => {
		console.log('PAGE', tabRef)
	}, [tabRef])

	// init
	const [animationActive, setAnimationActive] = useState<boolean>(false)
	// const [isDisplayed, setIsDisplayed] = useState<boolean>(false)

	let pageStyleNotDisplayedYet = {}
	if (prevPage) {
		pageStyleNotDisplayedYet = {
			transform: `translateX(100%)`,
			overflow: 'hidden',
		}
	}
	const startAnimation = () => {
		if (pageRef && pageRef.current) {
			pageRef.current.classList.add(styles.slideAnimation)
		}
	}

	const stopAnimation = () => {
		if (pageRef && pageRef.current) {
			pageRef.current.classList.remove(styles.slideAnimation)
			// setIsDisplayed(true)
		}
	}

	useEffect(() => {
		if (animationActive) {
			// setIsDisplayed(false)
			startAnimation()
			const timer = setTimeout(() => {
				setAnimationActive(false)
			}, 2000)
			return () => clearTimeout(timer)
		} else {
			stopAnimation()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [animationActive])

	useEffect(() => {
		console.log('page', props.page, 'is displayed')
		if (!prevPage) {
			console.log('TABHOME !')
			return
		}

		// starting animation
		const timer = setTimeout(() => {
			setAnimationActive(true)
		}, 200)
		return () => clearTimeout(timer)
	}, [])
	useEffect(() => {
		console.log('We changed page', getCurrentPage())
	}, [getCurrentPage])

	//
	const titlebarRef = useRef<HTMLDivElement>(null)
	const headerTitleRef = useRef<HTMLDivElement>(null)
	const pageContainerRef = useRef<HTMLDivElement>(null)

	const statusbarElementRef = useRef<HTMLDivElement>(null) // "#statusbar"
	const titleElementRef = useRef<HTMLDivElement>(null) // "#title"
	const toolsContainerElementRef = useRef<HTMLDivElement>(null) // "#tools-container"
	const backContainerElementRef = useRef<HTMLDivElement>(null) // "#back-container"
	const backTextElementRef = useRef<HTMLDivElement>(null) // "#back-text"
	const backArrowElementRef = useRef<HTMLDivElement>(null) // "#back-arrow"
	const backgroundElementRef = useRef<HTMLDivElement>(null) // "#background"

	// region def

	const _getTextPosition = (element: HTMLDivElement | null) => {
		if (!element) return
		if (element.innerHTML == '') return element.getBoundingClientRect()
		const range = document.createRange()
		range.setStart(element, 0)
		range.setEnd(element, 1)
		return range.getBoundingClientRect()
	}

	// const _getElementRect = (element) => {
	// 	const sizes = element.getBoundingClientRect()
	// 	const rect = { left: 0, top: 0, right: 0, bottom: 0 }
	// 	do {
	// 		rect.left += element.offsetLeft
	// 		rect.top += element.offsetTop
	// 	} while ((element = element.offsetParent) !== this.page.app)
	// 	rect.right = rect.left + (sizes.right - rect.left)
	// 	rect.bottom = rect.top + (sizes.bottom - rect.top)
	// 	return rect
	// }
	const _relativeToApp = (rect?: DOMRect) => {
		// todo : forward ref pour this page ?
		// const pageRect = this.page.getBoundingClientRect()
		const pageRect = document.body.getBoundingClientRect()
		return {
			left: (rect?.left || 0) - pageRect.left,
			top: (rect?.top || 0) - pageRect.top,
			right: (rect?.right || 0) - pageRect.left,
			bottom: (rect?.bottom || 0) - pageRect.top,
		}
	}
	// endregion

	// const [headerPositionPercent, setHeaderPositionPercent] =
	// 	useState<number>(0)

	const showHideBackArrow = useCallback(
		(headerPositionPercent: number) => {
			if (!backArrowElementRef.current) return

			if (prevPage == undefined) {
				backArrowElementRef.current.style.scale =
					headerPositionPercent < 1 ? '0' : '1'
				backArrowElementRef.current.style.opacity = '0'
			} else {
				backArrowElementRef.current.style.scale = ''
				backArrowElementRef.current.style.opacity = ''
			}
		},
		[prevPage]
	)

	const onPageScrollTitled = useCallback(
		(scrollTop: number) => {
			// console.log('[Titled.scrollTop]:', scrollTop)
			if (
				!titlebarRef.current ||
				!headerTitleRef.current ||
				!titleElementRef.current ||
				!backArrowElementRef.current
			)
				return

			// const pos = _relativeToApp(_getTextPosition(this.titleHeaderElement))
			const pos = _relativeToApp(_getTextPosition(headerTitleRef.current))
			const titlebar = titlebarRef.current.getBoundingClientRect()
			const titleY = pos.bottom - 7
			const titlebarY = titlebar.bottom - titlebar.top

			const headerPositionPercent =
				scrollTop / (titleY + scrollTop - titlebarY)
			backgroundElementRef.current?.style.setProperty(
				'opacity',
				String(headerPositionPercent)
			)

			titleElementRef.current.style.opacity =
				headerPositionPercent < 1 ? '0' : ''

			titleElementRef.current.style.visibility =
				headerPositionPercent < 1 ? 'hidden' : ''

			// back arrow
			showHideBackArrow(headerPositionPercent)

			if (scrollTop < 0) {
				headerTitleRef.current.style.scale = String(
					Math.min(1.2, 1 + 0.2 * (scrollTop / -200))
				)
			} else {
				headerTitleRef.current.style.scale = ''
			}

			// console.log({
			// 	pos: pos,
			// 	titlebar: titlebar,
			// 	titleY: titleY,
			// 	titlebarY: titlebarY,
			// 	headerPositionPercent: headerPositionPercent,
			// })
		},
		[showHideBackArrow]
	)

	const onPageScroll = useCallback(() => {
		// console.log('Page scrolled ref:', pageContainerRef.current?.scrollTop)

		if (!pageContainerRef.current) return

		if (titlebar === 'titled')
			return onPageScrollTitled(pageContainerRef.current?.scrollTop)

		if (titlebar === 'image') {
			// todo
			console.log(
				'[image.onPageScroll]:',
				pageContainerRef.current?.scrollTop
			)

			return
		}
	}, [onPageScrollTitled, titlebar])

	useEffect(() => {
		// _bindPage
		pageContainerRef.current?.addEventListener('scroll', onPageScroll)

		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			pageContainerRef.current?.removeEventListener(
				'scroll',
				onPageScroll
			)
		}
	}, [onPageScroll])

	// const { test, setTest } = useIOSTabContext()

	// console.log('[IOSPage]', props.id, ':', children)
	const { goBack } = useIOSTabContext()

	return (
		<div
			ref={pageRef}
			data-element="i-page"
			className={`${styles.iPage}`}
			data-titlebar={titlebar}
			style={prevPage ? pageStyleNotDisplayedYet : {}}
			{...props}
		>
			{/* region i-titlebar-titled */}
			<div
				ref={titlebarRef}
				data-element="i-titlebar-titled"
				data-titlebar={titlebar}
				className={`${styles.titlebarDefault} 
				${titlebar === 'titled' && styles.titleBarTitled}
				${titlebar === 'image' && styles.titleBarImage}
				`}
			>
				<div id="content-container" className={styles.contentContainer}>
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
									prevPage === undefined ? { opacity: 0 } : {}
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

			{/* region page-container */}
			<div
				data-element="page-container"
				className={styles.pageContainer}
				ref={pageContainerRef}
				// onScroll={onPageScroll}
			>
				{/* page-header */}
				<div data-element="page-header" className={styles.pageHeader}>
					{titlebar === 'titled' && (
						<div
							id="header-title-container"
							className={styles.headerTitleContainer}
						>
							<div
								ref={headerTitleRef}
								id="header-title"
								className={styles.headerTitle}
							>
								{title}
							</div>
						</div>
					)}
				</div>

				{/* page-body */}
				<div data-element="page-body" className={styles.pageBody}>
					{children}
					{/* region testing */}
					{prevPage && (
						<button onClick={goBack}>
							{'>>>'}goBackgoBackgoBack{'<<<'}
						</button>
					)}
					{/* endregion testing */}
				</div>
			</div>
			{/* endregion page-container */}
		</div>
	)
}

export default IOSPage
