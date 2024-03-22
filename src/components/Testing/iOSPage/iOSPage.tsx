'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IOSAnimationId, IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSPage.module.css'
import { useIOSTabContext } from '../iOSTab/iOSTabContext'
import { PointerListenerEvent, addPointerListener } from '@/src/helpers/iOSPage'
import { useIOSAppContext } from '../iOSApp/iOSAppContext'
// import { useIOSTabContext } from '../iOSTab/iOSTabContext'
import { bezier } from '@/src/helpers/bezier-easing'

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
	const { appRef, getTabsRefs, getCurrentTabRef } = useIOSAppContext()
	const {
		tabRef,
		addPageRef,
		getPreviousPage,
		getCurrentPage,
		getPagesRefs,
	} = useIOSTabContext()
	const pageRef = addPageRef && addPageRef(props.page)
	useEffect(() => {
		console.log('PAGE.tabRef', tabRef)
		console.log('PAGE.pageRef', pageRef)
	}, [tabRef])

	const _getPreviousPageRef = () => {
		const previousPage = getPreviousPage && getPreviousPage()
		const previousPageRef =
			getPagesRefs &&
			getPagesRefs().find(
				(pageRef) => pageRef.name === previousPage?.page
			)?.ref
		return previousPageRef
	}
	const _getPageRef = () => {
		if (pageRef?.current) return pageRef

		const _page = getCurrentPage && getCurrentPage()
		const _pageRef =
			getPagesRefs &&
			getPagesRefs().find((pageRef) => pageRef.name === _page?.page)?.ref
		return _pageRef
	}

	const _getPagesRefs = () => getPagesRefs && getPagesRefs()

	const _getTabRef = () => {
		return tabRef?.current ? tabRef : getCurrentTabRef()?.ref
	}

	// region PAGE ANIMATION
	interface GestureType {
		started: boolean
		percent: number
		startX: number
		speed: number
		previousX?: number
		currentX: number
		lastX: number
		width: number
		pointerId?: number
		animationId?: IOSAnimationId
	}
	const [animationId, setAnimationId] = useState<IOSAnimationId>(0)
	const gestureDefault = {
		started: false,
		percent: 0,
		startX: 0,
		speed: 0,
		currentX: 0,
		lastX: 0,
		width: 0,
	}
	const [gesture, setGesture] = useState<GestureType>(gestureDefault)
	let _gesture = { ...gestureDefault } as GestureType

	// todo
	const getPageDetails = () => ({
		page: {
			prevPage: { titlebar: {} },
			titlebar: {},
		},
	})

	const _transitionStarted = (_animationId: IOSAnimationId) => {
		setAnimationId(_animationId)

		if (appRef?.current) {
			appRef?.current.dispatchEvent(
				new CustomEvent('transition-started', {
					detail: getPageDetails(),
				})
			)
			console.log('_transitionStarted DONE', {
				_animationId: _animationId,
				appRef: appRef,
			})
		}
	}

	const _transitionCompleted = (
		_animationId: IOSAnimationId,
		isEnd: boolean
	) => {
		// if (animationId != _animationId) return
		if (appRef?.current) {
			appRef?.current.dispatchEvent(
				new CustomEvent('transition-completed', {
					detail: { ...getPageDetails(), isEnd: isEnd },
				})
			)
			console.log('_transitionCompleted DONE', {
				_animationId: _animationId,
				appRef: appRef,
				isEnd: isEnd,
			})
		}
	}

	const _processTransitionFrame = (
		_animationId: IOSAnimationId,
		percent: number | undefined = undefined,
		isEnd: boolean = false
	) => {
		const previousPageRef = _getPreviousPageRef()
		const _pageRef = _getPageRef()

		console.log('_processTransitionFrame START', {
			// animationId: animationId,
			// _animationId: _animationId,
			// pageRef: pageRef?.current,
			_pageRef: _pageRef?.current,
			previousPageRef: previousPageRef?.current,
			appRef: appRef?.current,
			percent: percent,
			isEnd: isEnd,
		})

		// if (animationId != _animationId) return
		if (!_pageRef?.current) return
		if (!previousPageRef?.current) return
		if (!appRef?.current) return

		// const pageTranslateX = (1 - percent) * 100
		// const pageTranslateX = !isEnd ? (1 - Number(percent)) * 100 : 100
		const pageTranslateX = (1 - Number(percent)) * 100
		_pageRef?.current.style.setProperty(
			'transform',
			`translateX(${pageTranslateX}%)`
			// `translateX(${(1 - percent) * 100}%)`
			// `translateX(${(1 - (percent || 1)) * 100}%)`
		)

		// const previousPageTranslateX = (1 - percent) * 100
		// const previousPageTranslateX = !isEnd ? Number(percent) * -30 : 0
		const previousPageTranslateX = Number(percent) * -30
		previousPageRef?.current.style.setProperty(
			'transform',
			`translateX(${previousPageTranslateX}%)`
			// `translateX(${percent * -30}%)`
			// `translateX(${(percent || 0) * -30}%)`
		)

		appRef?.current.dispatchEvent(
			new CustomEvent('transition', {
				detail: { ...getPageDetails(), percent: percent },
			})
		)

		console.log('_processTransitionFrame DONE', {
			// animationId: animationId,
			// _animationId: _animationId,
			// pageRef: pageRef?.current,
			_pageRef: _pageRef?.current,
			previousPageRef: previousPageRef?.current,
			appRef: appRef?.current,
			percent: percent,
			isEnd: isEnd,
			percents: {
				prev: previousPageTranslateX,
				current: pageTranslateX,
			},
		})
	}

	const _animateTransition = (
		duration: number,
		transform = (percent: number) => percent
	) => {
		const animationId = new IOSAnimationId()
		const easing = bezier(0.2, 0.8, 0.2, 1)
		const start = Date.now()
		_transitionStarted(animationId)
		;(function loop() {
			const p = (Date.now() - start) / duration
			if (p >= 1) {
				_processTransitionFrame(transform(1), undefined, true)
				_transitionCompleted(animationId, transform(1) == 1)
			} else {
				_processTransitionFrame(animationId, transform(easing(p)))
				requestAnimationFrame(loop)
			}
		})()
	}

	const _bindTouchGestures = () => {
		console.log('_bindTouchGestures', pageRef)
		// this.gesture = { started: false, percent: 0, startX: 0, speed: 0, currentX: 0, lastX: 0, width: 0 };
		setGesture(gestureDefault)

		addPointerListener(
			pageRef?.current || undefined,
			'down',
			(e: PointerListenerEvent) => {
				// console.log('[IOSPage] down e:', e)
				// console.log('[IOSPage] down tabRef:', tabRef)
				// console.log('[IOSPage] down getTabsRefs():', getTabsRefs())
				// console.log(
				// 	'[IOSPage] down getCurrentTabRef():',
				// 	getCurrentTabRef()
				// )

				const currentTabRef = _getTabRef()
				// const currentTabRef = tabRef?.current
				// 	? tabRef
				// 	: getCurrentTabRef()?.ref
				// console.log('[IOSPage] down currentTabRef:', currentTabRef)
				if (!currentTabRef?.current) return

				const touchX =
					e.clientX -
					currentTabRef?.current.getBoundingClientRect().left
				// console.log('[IOSPage] down touchX:', touchX)

				if (
					prevPage !== undefined &&
					!gesture.pointerId &&
					touchX < 25
				) {
					const gestureAnimationId = new IOSAnimationId()

					setGesture({
						...gesture,
						started: true,
						pointerId: e.pointerId,
						percent: 0,
						startX: touchX,
						width:
							currentTabRef?.current.getBoundingClientRect()
								.right -
							currentTabRef?.current.getBoundingClientRect().left,

						animationId: gestureAnimationId,
					})
					_gesture = {
						..._gesture,
						started: true,
						pointerId: e.pointerId,
						percent: 0,
						startX: touchX,
						width:
							currentTabRef?.current.getBoundingClientRect()
								.right -
							currentTabRef?.current.getBoundingClientRect().left,

						animationId: gestureAnimationId,
					}

					_transitionStarted(gestureAnimationId)
					_processTransitionFrame(gestureAnimationId, 1)

					e.preventDefault()
				}
			}
		)

		addPointerListener(
			pageRef?.current || undefined,
			'move',
			(e: PointerListenerEvent) => {
				// console.log('[IOSPage] move e:', e)
				// if (gesture.started && gesture.pointerId === e.pointerId) {
				if (_gesture.started && _gesture.pointerId === e.pointerId) {
					// console.log('[IOSPage] move OK:', _gesture)

					const _tabRef = _getTabRef()

					// console.log('[IOSPage] move tabRef:', tabRef)
					// console.log('[IOSPage] move _getTabRef():', _getTabRef())

					const previousX = _gesture.currentX
					const currentX =
						e.clientX -
						(_tabRef.current?.getBoundingClientRect().left || 0)
					const speed = _gesture.currentX - (_gesture.previousX || 0)
					const percent =
						(_gesture.currentX - _gesture.startX) / _gesture.width
					const gestureAnimationId =
						_gesture.animationId as IOSAnimationId

					setGesture({
						...gesture,
						previousX: previousX,
						currentX: currentX,
						speed: speed,
						percent: percent,
					})
					_gesture = {
						..._gesture,
						previousX: previousX,
						currentX: currentX,
						speed: speed,
						percent: percent,
					}

					_processTransitionFrame(gestureAnimationId, 1 - percent)

					e.preventDefault()
				}
			}
		)
		addPointerListener(
			pageRef?.current || undefined,
			'up',
			(e: PointerListenerEvent) => {
				// console.log('[IOSPage] up e:', e)
				// if (gesture.started && gesture.pointerId === e.pointerId) {
				if (_gesture.started && _gesture.pointerId === e.pointerId) {
					// console.log('[IOSPage] up OK:', _gesture)

					setGesture({
						...gesture,
						started: false,
						pointerId: 0,
					})
					_gesture = {
						..._gesture,
						started: false,
						pointerId: 0,
					}

					const percent = _gesture.percent
					// console.log('[IOSPage] up :', {
					// 	percent: percent,
					// 	speed: _gesture.speed,
					// 	_gesture: _gesture,
					// })
					if (percent > 0.5 || _gesture.speed > 5) {
						_animateTransition(
							400,
							(a) => 1 - percent - (1 - percent) * a
						)
						setTimeout(() => {
							goBack()
							// 	this.tab.removeChild(this)
							// 	this.tab._setSelectedPage(this.prevPage)
						}, 400)
					} else {
						_animateTransition(
							400,
							(a) => 1 - percent + percent * a
						)
					}
				}
			}
		)
	}

	// old
	const [animationActive, setAnimationActive] = useState<boolean>(false)
	// const [isDisplayed, setIsDisplayed] = useState<boolean>(false)

	let pageStyleNotDisplayedYet = {}
	if (prevPage) {
		pageStyleNotDisplayedYet = {
			// transform: `translateX(100%)`,
			// overflow: 'hidden',
		}
	}
	const startAnimation = () => {
		// current page
		if (pageRef && pageRef.current) {
			pageRef.current.classList.add(styles.slideAnimation)
		}

		// previous page
		const previousPageRef = _getPreviousPageRef()

		if (previousPageRef && previousPageRef.current) {
			// todo : fix animation
			previousPageRef.current.classList.add(styles.slideAnimationOut)
		}

		console.log('[newPage] previousPageRef', previousPageRef)

		// // start animation on current page
		// if (getPagesRefs) {
		// 	const currentPage = getPagesRefs().find(
		// 		(pageRef) => pageRef.name === getCurrentPage()?.page
		// 	)
		// }
	}

	const stopAnimation = () => {
		if (pageRef && pageRef.current) {
			// todo : animate
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
		//
		console.log('page', props.page, 'is displayed')

		//
		_bindTouchGestures()

		//
		if (!prevPage) {
			console.log('TABHOME !')
			return
		}

		// starting animation
		const timer = setTimeout(() => {
			// setAnimationActive(true)
		}, 200)
		return () => {
			clearTimeout(timer)
		}
	}, [])

	useEffect(() => {
		console.log('We changed page', getCurrentPage())

		console.log('pageRef?.current', pageRef?.current)

		if (getCurrentPage()?.page === props.page) {
			console.log('We are on the same page !', pageRef?.current)
			if (pageRef && pageRef.current) {
				// todo : animate
				pageRef.current.classList.remove(styles.slideAnimationOut)
			}
			return
		}
	}, [getCurrentPage])
	// endregion PAGE ANIMATION

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
