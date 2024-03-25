'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IOSAnimationId, IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSPage.module.css'
import { useIOSTabContext } from '../iOSTab/iOSTabContext'
import {
	PointerListenerEvent,
	_getTextPosition,
	_relativeToApp,
	addPointerListener,
} from '@/src/helpers/iOSPage'
import { useIOSAppContext } from '../iOSApp/iOSAppContext'
// import { useIOSTabContext } from '../iOSTab/iOSTabContext'
import { bezier } from '@/src/helpers/bezier-easing'
import { IOSTitleBarProps } from '../iOSTabTitleBarRoot/iOSTabTitleBarRoot'

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

export interface IOSPageProps extends IOSElementProps, IOSTitleBarProps {
	page: string
	//
	title: string
	// titlebar?: string // titled|titlebar
	//
	prevPage?: string
	backTitle?: string
	closing?: boolean
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
		getTitleBarRef,
		setTitleBarRef,
		//
		getCurrentPageRef,
		setCurrentPageRef,
		getPreviousPageRef,
		setPreviousPageRef,
		getCurrentPageRefs,
		setCurrentPageRefs,
		getPreviousPageRefs,
		setPreviousPageRefs,
		getCurrentPageTitleBarRef,
		setCurrentPageTitleBarRef,
		getPreviousPageTitleBarRef,
		setPreviousPageTitleBarRef,
		getCurrentPageTitleBarRefs,
		setCurrentPageTitleBarRefs,
		getPreviousPageTitleBarRefs,
		setPreviousPageTitleBarRefs,
	} = useIOSAppContext()
	const {
		tabRef,
		addPageRef,
		getPreviousPage,
		getCurrentPage,
		getPagesRefs,
	} = useIOSTabContext()
	const pageRef = addPageRef && addPageRef(props.page)
	// useEffect(() => {
	// 	console.log('PAGE.tabRef', tabRef)Context tabP
	// 	console.log('PAGE.pageRef', pageRef)
	// }, [tabRef, pageRef])
	// endregion GLOBALS

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
	// const [animationId, setAnimationId] = useState<IOSAnimationId>(0)
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
			// prevPage: { titlebar: {} },
			// titlebar: {},
			prevPage: { titlebar: {} },
			titlebar: titlebarRef,
		},
	})

	const _transitionStarted = (/*_animationId: IOSAnimationId*/) => {
		// setAnimationId(_animationId)

		if (appRef?.current) {
			appRef?.current.dispatchEvent(
				new CustomEvent('transition-started', {
					detail: getPageDetails(),
				} as CustomTransitionStartedEventType)
			)
			// console.log('_transitionStarted DONE', {
			// 	_animationId: _animationId,
			// 	appRef: appRef,
			// })
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
				} as CustomTransitionCompletedEventType)
			)
			// console.log('_transitionCompleted DONE', {
			// 	_animationId: _animationId,
			// 	appRef: appRef,
			// 	isEnd: isEnd,
			// })
		}
	}

	const _processTransitionFrame = (
		_animationId: IOSAnimationId,
		percent: number | undefined = undefined
	) => {
		const previousPageRef = _getPreviousPageRef()
		const _pageRef = _getPageRef()

		// console.log('_processTransitionFrame START', {
		// 	// animationId: animationId,
		// 	// _animationId: _animationId,
		// 	// pageRef: pageRef?.current,
		// 	_pageRef: _pageRef?.current,
		// 	previousPageRef: previousPageRef?.current,
		// 	appRef: appRef?.current,
		// 	percent: percent,
		// 	isEnd: isEnd,
		// })

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
			} as CustomTransitionEventType)
		)

		// console.log('_processTransitionFrame DONE', {
		// 	// animationId: animationId,
		// 	// _animationId: _animationId,
		// 	// pageRef: pageRef?.current,
		// 	_pageRef: _pageRef?.current,
		// 	previousPageRef: previousPageRef?.current,
		// 	appRef: appRef?.current,
		// 	percent: percent,
		// 	isEnd: isEnd,
		// 	percents: {
		// 		prev: previousPageTranslateX,
		// 		current: pageTranslateX,
		// 	},
		// })
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
				// if (e.clientX < 0) return

				// console.log('[IOSPage] move e:', e)
				// console.log('[IOSPage] move e.clientX:', e.clientX)
				// console.log('[IOSPage] move e.touch?.pageX:', e.touch?.pageX)
				// console.log('[IOSPage] move appRef.current:', appRef.current)
				// console.log('[IOSPage] move pageRef.current:', pageRef?.current)
				// console.log(
				// 	'[IOSPage] move e.detail.percent:',
				// 	e.detail.percent
				// )

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
					let percent =
						(_gesture.currentX - _gesture.startX) / _gesture.width
					const gestureAnimationId =
						_gesture.animationId as IOSAnimationId

					// limiting to screen width
					if (percent < 0) percent = 0
					if (percent > 1) percent = 1

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
							goBack(false)
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

	useEffect(() => {
		if (closing && _isCurrentPage()) {
			_animateTransition(400, (p) => 1 - p)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [closing])
	// endregion PAGE ANIMATION

	// const [pagesRefsAreSet, setPagesRefsAreSet] = useState(false)
	let pagesRefsAreSetRaw = false
	const _handleRefs = () => {
		// console.log('[NEWPAGE] >> _handleRefs setRaw :', pagesRefsAreSetRaw)
		// console.log('[NEWPAGE] >> _handleRefs set :', pagesRefsAreSet)

		// if (!pageRef) return
		if (!pageRef) return
		// console.log('[NEWPAGE] >> new', props.page, 'pageRef:', pageRef)

		// changing refs
		if (prevPage && !pagesRefsAreSetRaw) {
			const _currentPageRef = getCurrentPageRef()
			const _previousPageRef = getPreviousPageRef()

			const _currentPageRefs = getCurrentPageRefs()

			const _currentPageTitleBarRef = getCurrentPageTitleBarRef()
			// const _previousPageTitleBarRef = getPreviousPageTitleBarRef()
			const _currentPageTitleBarRefs = getCurrentPageTitleBarRefs()

			// console.log('[NEWPAGE] >>> CURRENT:', _currentPageRef)
			// console.log('[NEWPAGE] >>> OLD:', _previousPageRef)

			if (
				_currentPageRef !== _previousPageRef &&
				_currentPageRef.current
			) {
				// if (_previousPageRef) {
				// 	_previousPageRef.current?.classList.add('test--passed')
				// 	_currentPageRef.current?.classList.remove('test--passed')
				// }
				//
				// _currentPageRef.current?.classList.add('test--previous')
				// _currentPageRef.current?.classList.remove('test--current')
				setPreviousPageRef(_currentPageRef)
				setPreviousPageRefs(_currentPageRefs)
				setPreviousPageTitleBarRef(_currentPageTitleBarRef)
				setPreviousPageTitleBarRefs(_currentPageTitleBarRefs)

				// console.log('[NEWPAGE] >>>> NEW OLD:', _currentPageRef)
			}
		}

		// pageRef.current?.classList.remove('test--previous')
		// pageRef.current?.classList.add('test--current')
		setCurrentPageRef(pageRef)
		setCurrentPageRefs({
			pageContainerRef: pageContainerRef,
			headerTitleRef: headerTitleRef,
		})
		setCurrentPageTitleBarRef(titlebarRef)
		setCurrentPageTitleBarRefs({
			titlebarRef: titlebarRef,
			statusbarElementRef: statusbarElementRef,
			backContainerElementRef: backContainerElementRef,
			backArrowElementRef: backArrowElementRef,
			backTextElementRef: backTextElementRef,
			titleElementRef: titleElementRef,
			toolsContainerElementRef: toolsContainerElementRef,
			backgroundElementRef: backgroundElementRef,
		})
		// console.log('[TB1] setCurrentPageTitleBarRefs -', props.page, {
		// 	titlebarRef: titlebarRef,
		// 	statusbarElementRef: statusbarElementRef,
		// 	backContainerElementRef: backContainerElementRef,
		// 	backArrowElementRef: backArrowElementRef,
		// 	backTextElementRef: backTextElementRef,
		// 	titleElementRef: titleElementRef,
		// 	toolsContainerElementRef: toolsContainerElementRef,
		// 	backgroundElementRef: backgroundElementRef,
		// })
		// console.log('[NEWPAGE] >>>> NEW CURRENT:', pageRef)

		pagesRefsAreSetRaw = true
		// setPagesRefsAreSet(true)

		// console.log(
		// 	'[NEWPAGE] >>>> FINAL PREVIOUS:',
		// 	getPreviousPageRef(),
		// 	getPreviousPageRef()?.current
		// )
		// console.log(
		// 	'[NEWPAGE] >>>> FINAL CURRENT:',
		// 	getCurrentPageRef(),
		// 	getCurrentPageRef()?.current
		// )
		// console.log(
		// 	'[NEWPAGE-TITLEBAR] >>>> FINAL PREVIOUS:',
		// 	getPreviousPageTitleBarRef(),
		// 	getPreviousPageTitleBarRef()?.current
		// )
		// console.log(
		// 	'[NEWPAGE-TITLEBAR] >>>> FINAL CURRENT:',
		// 	getCurrentPageTitleBarRef(),
		// 	getCurrentPageTitleBarRef()?.current
		// )
	}

	// region PAGE INIT
	useEffect(() => {
		console.log('[TB1] New page', props.page)
		_handleRefs()
		//
		// console.log('[NEWPAGE] > New page', props.page, 'is displayed')

		// _handleRefs()

		// console.log('[TTB][Page] INIT', {
		// 	_title1Ref: getTitleBarRef('title1Ref'),
		// 	_title2Ref: getTitleBarRef('title2Ref'),
		// 	_back1Ref: getTitleBarRef('back1Ref'),
		// 	_back2Ref: getTitleBarRef('back2Ref'),
		// 	_backArrowRef: getTitleBarRef('backArrowRef'),
		// 	_toolsRef: getTitleBarRef('toolsRef'),
		// })

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
		_handleRefs()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageRef])
	// endregion PAGE INIT

	// region PAGE REFS
	const titlebarRef = useRef<HTMLDivElement>(null)
	const headerTitleRef = useRef<HTMLDivElement>(null) // "#header-title"
	const pageContainerRef = useRef<HTMLDivElement>(null)

	const statusbarElementRef = useRef<HTMLDivElement>(null) // "#statusbar"
	const titleElementRef = useRef<HTMLDivElement>(null) // "#title"
	const toolsContainerElementRef = useRef<HTMLDivElement>(null) // "#tools-container"
	const backContainerElementRef = useRef<HTMLDivElement>(null) // "#back-container"
	const backTextElementRef = useRef<HTMLDivElement>(null) // "#back-text"
	const backArrowElementRef = useRef<HTMLDivElement>(null) // "#back-arrow"
	const backgroundElementRef = useRef<HTMLDivElement>(null) // "#background"

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
	// endregion PAGE REFS

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
			// todo : image onPageScroll
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

	const { goBack } = useIOSTabContext()

	return (
		<div
			ref={pageRef}
			data-element="i-page"
			className={`${styles.iPage}`}
			data-titlebar={titlebar}
			{...props}
		>
			{/* region i-titlebar-titled */}
			<div
				ref={titlebarRef}
				// data-element="i-titlebar-titled"
				data-element={`i-titlebar-${titlebar}`}
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
						<button onClick={() => goBack()}>
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
