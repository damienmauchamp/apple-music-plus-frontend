'use client'
import React, { useCallback, useEffect, useRef } from 'react'
import { IOSAnimationId, IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSPage.module.css'
import { useIOSTabContext } from '../iOSTab/iOSTabContext'
import {
	PointerListenerEvent,
	_getTextPosition,
	_relativeToApp,
	addPointerListener,
} from '@/src/helpers/iOSPage'
import {
	PageRefsType,
	TitleBarRefsType,
	useIOSAppContext,
} from '../iOSApp/iOSAppContext'
import { bezier } from '@/src/helpers/bezier-easing'
import IOSTitleBar, { IOSTitleBarProps } from '../iOSTitleBar/iOSTitleBar'

export interface CustomTransitionStartedEventType {
	detail: {
		page: {
			prevPage: {
				titlebar: object
			}
			titlebar: React.RefObject<HTMLDivElement>
		}
	}
}
export interface CustomTransitionCompletedEventType {
	detail: {
		isEnd: boolean
		page: {
			prevPage: {
				titlebar: object
			}
			titlebar: React.RefObject<HTMLDivElement>
		}
	}
}
export interface CustomTransitionEventType {
	detail: {
		percent: number
		page: {
			prevPage: {
				titlebar: object
			}
			titlebar: React.RefObject<HTMLDivElement>
		}
	}
}

export const isIOSPageElement = (
	object: any | null | undefined
): object is IOSPageProps => {
	try {
		return Boolean(
			object.props.children && object.props.page && object.props.title
		)
	} catch (e) {
		return false
	}
}

export interface IOSPageProps extends IOSElementProps, IOSTitleBarProps {
	page: string
	//
	title: string
	// titlebar?: string // titled|titlebar
	// prevPage?: string
	// backTitle?: string
	//
	closing?: boolean
	//
	pages?: IOSPageProps[]
}

const IOSPage = ({
	children,
	title,
	titlebar = 'default',
	prevPage = undefined,
	backTitle = 'Back',
	closing = false,
	...props
}: IOSPageProps) => {
	// region GLOBALS
	const {
		appRef,
		getCurrentTabRef,
		//
		// getTitleBarRef,
		setTitleBarRef,
		//
		getCurrentPageRef,
		setCurrentPageRef,
		getPreviousPageRef,
		setPreviousPageRef,
		getCurrentPageRefs,
		setCurrentPageRefs,
		// getPreviousPageRefs,
		setPreviousPageRefs,
		getCurrentPageTitleBarRef,
		setCurrentPageTitleBarRef,
		// getPreviousPageTitleBarRef,
		setPreviousPageTitleBarRef,
		getCurrentPageTitleBarRefs,
		setCurrentPageTitleBarRefs,
		// getPreviousPageTitleBarRefs,
		setPreviousPageTitleBarRefs,
	} = useIOSAppContext()
	const {
		tabRef,
		addPageRef,
		getPreviousPage,
		getCurrentPage,
		getPagesRefs,
		goBack,
	} = useIOSTabContext()
	// endregion GLOBALS

	// region PAGE REFS
	const pageRef = addPageRef && addPageRef(props.page)

	const titlebarRef = useRef<HTMLDivElement>(null)
	const headerTitleRef = useRef<HTMLDivElement>(null) // "#header-title"
	const pageContainerRef = useRef<HTMLDivElement>(null)

	// region PAGE.TITLEBAR REFS
	const statusbarElementRef = useRef<HTMLDivElement>(null) // "#statusbar"
	const titleElementRef = useRef<HTMLDivElement>(null) // "#title"
	const toolsContainerElementRef = useRef<HTMLDivElement>(null) // "#tools-container"
	const backContainerElementRef = useRef<HTMLDivElement>(null) // "#back-container"
	const backTextElementRef = useRef<HTMLDivElement>(null) // "#back-text"
	const backArrowElementRef = useRef<HTMLDivElement>(null) // "#back-arrow"
	const backgroundElementRef = useRef<HTMLDivElement>(null) // "#background"

	const titleBarRefs = {
		titlebarRef: titlebarRef,
		headerTitleRef: headerTitleRef,
		pageContainerRef: pageContainerRef,
		statusbarElementRef: statusbarElementRef,
		titleElementRef: titleElementRef,
		toolsContainerElementRef: toolsContainerElementRef,
		backContainerElementRef: backContainerElementRef,
		backTextElementRef: backTextElementRef,
		backArrowElementRef: backArrowElementRef,
		backgroundElementRef: backgroundElementRef,
	}

	useEffect(() => {
		// if (!titlebarRef) return;
		setTitleBarRef('titlebarRef', titlebarRef)
	}, [titlebarRef, setTitleBarRef])
	useEffect(() => {
		// if (!headerTitleRef) return;
		setTitleBarRef('headerTitleRef', headerTitleRef)
	}, [headerTitleRef, setTitleBarRef])
	useEffect(() => {
		// if (!pageContainerRef) return;
		setTitleBarRef('pageContainerRef', pageContainerRef)
	}, [pageContainerRef, setTitleBarRef])
	useEffect(() => {
		// if (!statusbarElementRef) return;
		setTitleBarRef('statusbarElementRef', statusbarElementRef)
	}, [statusbarElementRef, setTitleBarRef])
	useEffect(() => {
		// if (!titleElementRef) return;
		setTitleBarRef('titleElementRef', titleElementRef)
	}, [titleElementRef, setTitleBarRef])
	useEffect(() => {
		// if (!toolsContainerElementRef) return;
		setTitleBarRef('toolsContainerElementRef', toolsContainerElementRef)
	}, [toolsContainerElementRef, setTitleBarRef])
	useEffect(() => {
		// if (!backContainerElementRef) return;
		setTitleBarRef('backContainerElementRef', backContainerElementRef)
	}, [backContainerElementRef, setTitleBarRef])
	useEffect(() => {
		// if (!backTextElementRef) return;
		setTitleBarRef('backTextElementRef', backTextElementRef)
	}, [backTextElementRef, setTitleBarRef])
	useEffect(() => {
		// if (!backArrowElementRef) return;
		setTitleBarRef('backArrowElementRef', backArrowElementRef)
	}, [backArrowElementRef, setTitleBarRef])
	useEffect(() => {
		// if (!backgroundElementRef) return;
		setTitleBarRef('backgroundElementRef', backgroundElementRef)
	}, [backgroundElementRef, setTitleBarRef])
	// endregion PAGE.TITLEBAR REFS

	// endregion PAGE REFS

	// region UTILS
	const _isCurrentPage = () => getCurrentPage()?.page === props.page

	const _getPagesRefs = () => getPagesRefs && getPagesRefs()

	const _getPreviousPageRef = () => {
		const previousPage = getPreviousPage && getPreviousPage()
		const previousPageRef = _getPagesRefs()?.find(
			(pageRef) => pageRef.name === previousPage?.page
		)?.ref
		return previousPageRef
	}

	const _getPageRef = () => {
		if (pageRef?.current) return pageRef

		const _page = getCurrentPage && getCurrentPage()
		const _pageRef = _getPagesRefs()?.find(
			(pageRef) => pageRef.name === _page?.page
		)?.ref
		return _pageRef
	}

	const _getTabRef = () => {
		return tabRef?.current ? tabRef : getCurrentTabRef()?.ref
	}
	// endregion UTILS

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
	const gestureDefault = {
		started: false,
		percent: 0,
		startX: 0,
		speed: 0,
		currentX: 0,
		lastX: 0,
		width: 0,
	}
	// const [gesture, setGesture] = useState<GestureType>(gestureDefault)
	let _gesture = { ...gestureDefault } as GestureType

	const _getPageDetails = () => ({
		page: {
			prevPage: { titlebar: {} },
			titlebar: titlebarRef,
		},
	})

	const _transitionStarted = (/*_animationId: IOSAnimationId*/) => {
		// setAnimationId(_animationId)

		if (appRef?.current) {
			appRef?.current.dispatchEvent(
				new CustomEvent('transition-started', {
					detail: _getPageDetails(),
				} as CustomTransitionStartedEventType)
			)
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
					detail: { ..._getPageDetails(), isEnd: isEnd },
				} as CustomTransitionCompletedEventType)
			)
		}
	}

	const _processTransitionFrame = (
		_animationId: IOSAnimationId,
		percent: number | undefined = undefined
	) => {
		const previousPageRef = _getPreviousPageRef()
		const _pageRef = _getPageRef()

		// if (animationId != _animationId) return
		if (!_pageRef?.current) return
		if (!previousPageRef?.current) return
		if (!appRef?.current) return

		const pageTranslateX = (1 - Number(percent)) * 100
		_pageRef?.current.style.setProperty(
			'transform',
			`translateX(${pageTranslateX}%)`
		)

		const previousPageTranslateX = Number(percent) * -30
		previousPageRef?.current.style.setProperty(
			'transform',
			`translateX(${previousPageTranslateX}%)`
		)

		appRef?.current.dispatchEvent(
			new CustomEvent('transition', {
				detail: { ..._getPageDetails(), percent: percent },
			} as CustomTransitionEventType)
		)
	}

	const _animateTransition = (
		duration: number,
		transform = (percent: number) => percent
	) => {
		const animationId = new IOSAnimationId()
		const easing = bezier(0.2, 0.8, 0.2, 1)
		const start = Date.now()
		_transitionStarted(/*animationId*/)
		;(function loop() {
			const p = (Date.now() - start) / duration
			if (p >= 1) {
				_processTransitionFrame(transform(1), undefined)
				_transitionCompleted(animationId, transform(1) == 1)
			} else {
				_processTransitionFrame(animationId, transform(easing(p)))
				requestAnimationFrame(loop)
			}
		})()
	}

	const _bindTouchGestures = () => {
		// setGesture(gestureDefault)

		addPointerListener(
			pageRef?.current || undefined,
			'down',
			(e: PointerListenerEvent) => {
				const currentTabRef = _getTabRef()
				if (!currentTabRef?.current) return

				const touchX =
					e.clientX -
					currentTabRef?.current.getBoundingClientRect().left

				if (
					prevPage !== undefined &&
					!_gesture.pointerId &&
					touchX < 25
				) {
					const gestureAnimationId = new IOSAnimationId()

					// setGesture({
					// 	...gesture,
					// 	started: true,
					// 	pointerId: e.pointerId,
					// 	percent: 0,
					// 	startX: touchX,
					// 	width:
					// 		currentTabRef?.current.getBoundingClientRect()
					// 			.right -
					// 		currentTabRef?.current.getBoundingClientRect().left,

					// 	animationId: gestureAnimationId,
					// })
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

					_transitionStarted(/*gestureAnimationId*/)
					_processTransitionFrame(gestureAnimationId, 1)

					e.preventDefault()
				}
			}
		)

		addPointerListener(
			pageRef?.current || undefined,
			'move',
			(e: PointerListenerEvent) => {
				// if (gesture.started && gesture.pointerId === e.pointerId) {
				if (_gesture.started && _gesture.pointerId === e.pointerId) {
					const _tabRef = _getTabRef()

					const previousX = _gesture.currentX
					const currentX =
						e.clientX -
						(_tabRef.current?.getBoundingClientRect().left || 0)
					const speed = _gesture.currentX - (_gesture.previousX || 0)
					let percent =
						(_gesture.currentX - _gesture.startX) / _gesture.width
					const gestureAnimationId =
						_gesture.animationId as IOSAnimationId

					// limiting to screen width
					if (percent < 0) percent = 0
					if (percent > 1) percent = 1

					// setGesture({
					// 	...gesture,
					// 	previousX: previousX,
					// 	currentX: currentX,
					// 	speed: speed,
					// 	percent: percent,
					// })
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
				if (_gesture.started && _gesture.pointerId === e.pointerId) {
					// setGesture({
					// 	...gesture,
					// 	started: false,
					// 	pointerId: 0,
					// })
					_gesture = {
						..._gesture,
						started: false,
						pointerId: 0,
					}

					const percent = _gesture.percent

					if (percent > 0.5 || _gesture.speed > 5) {
						_animateTransition(
							400,
							(a) => 1 - percent - (1 - percent) * a
						)
						goBack(true)
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

	useEffect(() => {
		if (closing && _isCurrentPage()) {
			_animateTransition(400, (p) => 1 - p)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [closing])
	// endregion PAGE ANIMATION

	let pagesRefsAreSet = false
	const _handleRefs = () => {
		if (!pageRef) return

		// changing refs
		if (prevPage && !pagesRefsAreSet) {
			const _currentPageRef = getCurrentPageRef()
			const _previousPageRef = getPreviousPageRef()

			const _currentPageRefs = getCurrentPageRefs()

			const _currentPageTitleBarRef = getCurrentPageTitleBarRef()
			const _currentPageTitleBarRefs = getCurrentPageTitleBarRefs()

			if (
				_currentPageRef !== _previousPageRef &&
				_currentPageRef.current
			) {
				setPreviousPageRef(_currentPageRef)
				setPreviousPageRefs(_currentPageRefs)
				setPreviousPageTitleBarRef(_currentPageTitleBarRef)
				setPreviousPageTitleBarRefs(_currentPageTitleBarRefs)
			}
		}

		//
		const _newCurrentPageRefs = {
			pageContainerRef: pageContainerRef,
			headerTitleRef: headerTitleRef,
		} as PageRefsType

		const _newCurrentPageTitleBarRefs = {
			titlebarRef: titlebarRef,
			statusbarElementRef: statusbarElementRef,
			backContainerElementRef: backContainerElementRef,
			backArrowElementRef: backArrowElementRef,
			backTextElementRef: backTextElementRef,
			titleElementRef: titleElementRef,
			toolsContainerElementRef: toolsContainerElementRef,
			backgroundElementRef: backgroundElementRef,
		} as TitleBarRefsType

		//
		setCurrentPageRef(pageRef)
		setCurrentPageRefs(_newCurrentPageRefs)
		setCurrentPageTitleBarRef(titlebarRef)
		setCurrentPageTitleBarRefs(_newCurrentPageTitleBarRefs)

		pagesRefsAreSet = true
	}

	// const _goBack = (animate: boolean) => goBack(animate, true)
	const _goToPreviousPage = () => {
		_animateTransition(400, (p) => 1 - p)
		goBack(true)
	}

	// region PAGE - TITLEBAR INIT
	// todo : move to title bar component
	const _initTitleBar = () => {
		// todo : see "onPageScroll()" to get content
		// this.page.container.addEventListener("scroll", e => this.onPageScroll(this.page.container.scrollTop));

		addPointerListener(
			backContainerElementRef?.current || undefined,
			'down',
			(e: PointerListenerEvent) => {
				e.preventDefault()
				backContainerElementRef?.current?.classList.add(styles.pressed)
			}
		)

		addPointerListener(
			backContainerElementRef?.current || undefined,
			'up',
			(e: PointerListenerEvent) => {
				e.preventDefault()
				backContainerElementRef?.current?.classList.remove(
					styles.pressed
				)
				_goToPreviousPage()
			}
		)

		if (prevPage === undefined) {
			if (backTextElementRef.current)
				backTextElementRef.current.style.scale = ''
			if (backArrowElementRef.current)
				backArrowElementRef.current.style.opacity = ''
		}
	}
	// endregion PAGE - TITLEBAR INIT

	// region PAGE INIT
	useEffect(() => {
		// console.log('[P1] New page', props.page)

		// _updateGoToPreviousPage()
		_handleRefs()

		// todo : move to title bar component
		_initTitleBar()

		onPageScroll()
		_bindTouchGestures()

		//
		if (!prevPage) {
			// Home
			return
		}

		// starting animation
		_animateTransition(600)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		// console.log('[P1] pageRef', props.page)

		// _updateGoToPreviousPage()
		_handleRefs()

		// todo : move to title bar component
		_initTitleBar()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageRef])
	// endregion PAGE INIT

	// region PAGE SCROLL
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

	// const _getHeaderPositionPercent = (scrollTop: number = 0) => {}

	const onPageScrollTitled = useCallback(
		(scrollTop: number) => {
			if (
				!titlebarRef.current ||
				!headerTitleRef.current ||
				!titleElementRef.current ||
				!backArrowElementRef.current
			)
				return

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
		},
		[showHideBackArrow]
	)

	const onPageScroll = useCallback(() => {
		if (!pageContainerRef.current) return

		if (titlebar === 'titled')
			return onPageScrollTitled(pageContainerRef.current?.scrollTop)

		if (titlebar === 'image') {
			// todo : image onPageScroll
			console.log(
				'@todo [image.onPageScroll]:',
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
	// endregion PAGE SCROLL

	return (
		<div
			ref={pageRef}
			data-element="i-page"
			className={`${styles.iPage}`}
			data-titlebar={titlebar}
			{...props}
		>
			{/* region i-titlebar-titled */}
			<IOSTitleBar
				ref={titleBarRefs as unknown as React.RefObject<HTMLDivElement>}
				title={title}
				titlebar={titlebar}
				prevPage={prevPage}
				backTitle={backTitle}
			/>
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
						<button onClick={() => _goToPreviousPage()}>
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
