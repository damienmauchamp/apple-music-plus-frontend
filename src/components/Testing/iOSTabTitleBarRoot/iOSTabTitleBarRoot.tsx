import React, { useEffect, useRef, useState } from 'react'
// import { useIOSTabContext } from '../iOSTab/iOSTabContext'
import styles from './iOSTabTitleBarRoot.module.css'
import {
	backArrowSVG,
	CustomTransitionEventType,
	CustomTransitionStartedEventType,
} from '../iOSPage/iOSPage'
import { useIOSAppContext } from '../iOSApp/iOSAppContext'
import { useIOSTabContext } from '../iOSTab/iOSTabContext'
import {
	StyleTransition,
	_cloneTextStyle,
	_getElementRect,
	_getTextPosition,
	_relativeToApp,
} from '@/src/helpers/iOSPage'

export interface IOSTitleBarProps {
	titlebar?: string // titled
}

interface iOSTitleBarRootProps extends IOSTitleBarProps {}

type DOMReactPos = {
	left: number
	top: number
	right?: number
	bottom?: number
}

const IOSTitleBarRoot = ({ titlebar }: iOSTitleBarRootProps) => {
	const {
		appRef,
		getTabsRefs,
		_bindThemeChangingElement,
		setTitleBarRef,
		getTitleBarRef,
		getCurrentTabRef,
		getPreviousPageRef,
		getCurrentPageRef,
		getPreviousPageTitleBarRef,
		getCurrentPageTitleBarRef,
		getPreviousPageTitleBarRefs,
		getCurrentPageTitleBarRefs,
		getPreviousPageRefs,
		getCurrentPageRefs,
	} = useIOSAppContext()
	const { selected } = useIOSTabContext()

	// console.log({
	// 	test: test,
	// 	setTest: setTest,
	// })

	//
	const title1Ref = useRef<HTMLDivElement>(null) // #anim-title-1
	const title2Ref = useRef<HTMLDivElement>(null) // #anim-title-2
	const back1Ref = useRef<HTMLDivElement>(null) // #anim-back-1
	const back2Ref = useRef<HTMLDivElement>(null) // #anim-back-2
	const backArrowRef = useRef<SVGSVGElement>(null) // #anim-back-arrow
	const toolsRef = useRef<HTMLDivElement>(null) // #anim-tools

	// console.log('setTitleBarRefs selected:', selected, title1Ref)
	if (selected) {
		setTitleBarRef('title1Ref', title1Ref)
		setTitleBarRef('title2Ref', title2Ref)
		setTitleBarRef('back1Ref', back1Ref)
		setTitleBarRef('back2Ref', back2Ref)
		setTitleBarRef('backArrowRef', backArrowRef)
		setTitleBarRef('toolsRef', toolsRef)
	}

	//
	const [titleElementsVisibility, setTitleElementsVisibility] =
		useState<boolean>(false)

	//

	// const calcTransition = (page, percent) => {
	// 	// todo
	// }

	// const _cloneTextStyle = (element, sourceElement) => {
	// 	// todo
	// }

	//

	const _getHeaderPositionPercent = (old: boolean = false) => {
		const _pageRefs = old ? getPreviousPageRefs() : getCurrentPageRefs()
		const _pageTitleBarRefs = old
			? getPreviousPageTitleBarRefs()
			: getCurrentPageTitleBarRefs()

		const pageContainerRef = _pageRefs.pageContainerRef
		const headerTitleRef = _pageRefs.headerTitleRef
		const titlebarRef = _pageTitleBarRefs.titlebarRef

		// pageContainerRef.current?.scrollTop
		// const pageContainerRef = getTitleBarRef('pageContainerRef')
		// const headerTitleRef = getTitleBarRef('headerTitleRef')
		// const titlebarRef = getTitleBarRef('titlebarRef')

		if (
			!pageContainerRef?.current ||
			!headerTitleRef?.current ||
			!titlebarRef?.current
		)
			return 0

		const scrollTop = pageContainerRef.current.scrollTop

		const pos = _relativeToApp(
			_getTextPosition(headerTitleRef.current as HTMLDivElement),
			appRef.current
		)
		const titlebar = titlebarRef.current.getBoundingClientRect()
		const titleY = pos.bottom - 7
		const titlebarY = titlebar.bottom - titlebar.top

		return scrollTop / (titleY + scrollTop - titlebarY)
	}

	const _getTitleElement = (
		// ref: React.RefObject<SVGSVGElement | HTMLDivElement> | undefined,
		old: boolean = false
	) => {
		const _titleBarRefs = old
			? getPreviousPageTitleBarRefs()
			: getCurrentPageTitleBarRefs()
		const _pageRefs = old ? getPreviousPageRefs() : getCurrentPageRefs()

		if (titlebar === 'titled') {
			return _getHeaderPositionPercent() < 1
				? _pageRefs.headerTitleRef?.current
				: _titleBarRefs.titleElementRef?.current
		}

		return _titleBarRefs.titleElementRef?.current
	}
	const _getBackTextElement = (
		// ref: React.RefObject<SVGSVGElement | HTMLDivElement> | undefined,
		old: boolean = false
	) => {
		const _pageTitleBarRefs = old
			? getPreviousPageTitleBarRefs()
			: getCurrentPageTitleBarRefs()
		return _pageTitleBarRefs.backTextElementRef?.current
	}
	const _getBackArrowElement = (
		// ref: React.RefObject<SVGSVGElement | HTMLDivElement> | undefined,
		old: boolean = false
	) => {
		const _pageTitleBarRefs = old
			? getPreviousPageTitleBarRefs()
			: getCurrentPageTitleBarRefs()
		return _pageTitleBarRefs.backArrowElementRef?.current
	}

	const _getBackArrowElementPosition = (old: boolean = false) => {
		return _getElementRect(
			_getBackArrowElement(old) as HTMLDivElement,
			appRef.current as HTMLDivElement
		)
	}

	const _backArrowOpacityFunc = (percent: number, old: boolean = false) => {
		if (titlebar === 'titled') {
			return _getHeaderPositionPercent(old) < 1
				? percent * 2 - 1
				: percent
		}

		// if (titlebar === 'default') {
		return percent
		// }
	}

	const _getToolsElement = (
		ref: React.RefObject<SVGSVGElement | HTMLDivElement> | undefined
	) => {
		return ref?.current?.querySelector('#tools-container')
	}

	const _getToolsElementHTML = (
		ref: React.RefObject<SVGSVGElement | HTMLDivElement> | undefined
	) => {
		if (!ref?.current) return ''

		const toolsContainerElement = _getToolsElement(ref)
		if (!toolsContainerElement) return ''

		const slot = toolsContainerElement.children[0] as HTMLSlotElement
		return [...slot.assignedNodes()]
			.map((i) => (i as HTMLElement).outerHTML.trim())
			.join('\n')
	}

	const _getToolsElementPosition = (
		ref: React.RefObject<SVGSVGElement | HTMLDivElement> | undefined
	) => {
		return _getElementRect(
			_getToolsElement(ref) as HTMLDivElement,
			appRef.current as HTMLDivElement
		)
	}

	const _getTitleElementPosition = (old: boolean = false) => {
		return _relativeToApp(
			_getTextPosition(_getTitleElement(old)),
			appRef.current
		)
	}

	const _getHiddenTitleElement = (old: boolean = false) => {
		const _getHiddenTitleElementDefault = () => {
			return _getTitleElement(old) as HTMLDivElement
		}

		// default
		if (titlebar === 'default') {
			return _getHiddenTitleElementDefault()
		}

		// titled
		if (titlebar === 'titled') {
			if (_getHeaderPositionPercent(old) < 1) {
				return _getTitleElement(old)
			}
			return _getHiddenTitleElementDefault()
		}
	}

	const _getHiddenTitleElementPosition = (old: boolean = false) => {
		const appRect = (
			appRef.current as HTMLDivElement
		).getBoundingClientRect()

		const _getHiddenTitleElementPositionDefault = () => {
			const titleRect = _getTextPosition(
				_getTitleElement(old) as HTMLDivElement
			) as DOMRect

			return {
				left:
					appRect.right -
					appRect.left -
					(titleRect.right - titleRect.left),
				top: titleRect.top - appRect.top,
				//
				_appRect: appRect,
				_titleRect: titleRect,
			}
		}

		// default
		if (titlebar === 'default') {
			return _getHiddenTitleElementPositionDefault()
		}

		// titled
		if (titlebar === 'titled') {
			if (_getHeaderPositionPercent(old) < 1) {
				const titleRect = _getTitleElementPosition(old)
				return {
					left: titleRect.left + (appRect.right - appRect.left),
					top: titleRect.top,
					_appRect: appRect,
					_titleRect: titleRect,
				}
			}
			return _getHiddenTitleElementPositionDefault()
		}
	}

	const _getBackTextElementPosition = (old: boolean = false) => {
		return _relativeToApp(
			_getTextPosition(_getBackTextElement(old)),
			appRef.current
		)
	}

	const _getHiddenBackTextElement = (old: boolean = false) =>
		_getBackTextElement(old)

	const _getHiddenBackTextElementPosition = (old: boolean = false) => {
		const backPos = _getBackTextElementPosition(old)
		backPos.left -= 100
		return backPos
	}

	const _switchElementsVisibility = (
		page: boolean | null,
		isVisible: boolean
	) => {
		// if (isVisible) {

		// }

		// todo

		// const className = "top-menu-anim-invisible";
		// [
		// 	this.title1, this.title2, this.back1, this.back2, this.backArrow, this.tools
		// ].forEach(e => e.classList.toggle(className, !isVisible));

		setTitleElementsVisibility(isVisible)
		const titleElements = [
			title1Ref.current,
			title2Ref.current,
			back1Ref.current,
			back2Ref.current,
			backArrowRef.current,
			toolsRef.current,
		]
		titleElements.forEach((e) =>
			e?.classList.toggle(styles.topMenuAnimInvisible, !isVisible)
		)
		console.log('[TB1] _switchElementsVisibility', page, isVisible)

		if (page != null) {
			const oldHeader = getPreviousPageTitleBarRef()
			const newHeader = getCurrentPageTitleBarRef()

			// console.log(
			// 	'getTitleElement(OLD)',
			// 	_getTitleElement(/*oldHeader,*/ true)
			// )
			// console.log(
			// 	'getTitleElement(NEW)',
			// 	_getTitleElement(/*newHeader,*/ false)
			// )

			const elements = [
				_getTitleElement(true), // oldHeader
				_getTitleElement(false), // newHeader
				_getBackTextElement(true), // oldHeader
				_getBackTextElement(false), // newHeader
				_getBackArrowElement(true), // oldHeader
				_getBackArrowElement(false), // newHeader
				_animation.equalTools ? _getToolsElement(newHeader) : null,
				_animation.equalTools ? _getToolsElement(oldHeader) : null,
			]
			elements.forEach((e) =>
				e?.classList.toggle(styles.topMenuAnimInvisible, isVisible)
			)
		}
	}

	const _calcTransition = (page: null, percent: number) => {
		// const oldHeader = page.prevPage.titlebar
		if (percent > 1) percent = 1

		_animation.title1Transition &&
			_animation.title1Transition
				.translate(percent)
				.opacity(percent * 1.7)
				.fontWeight(percent)
				.$fontScale(percent, false)

		_animation.title2Transition &&
			_animation.title2Transition
				.translate(percent)
				.opacity((1 - percent) * 1.5)

		_animation.back1Transition &&
			_animation.back1Transition.translate(percent).opacity(percent * 2)

		_animation.back2Transition &&
			_animation.back2Transition
				.translate(percent)
				.opacity(percent * 1.7 - 0.7)
				.fontWeight(percent)
				.$fontScale(percent, true)

		_animation.backArrowTransition &&
			_animation.backArrowTransition
				.scale(percent)
				.padding(percent)
				.width(percent)
				.height(percent)
				.opacity(_backArrowOpacityFunc(percent, true)) // oldHeader
				.translate(percent)
				.backgroundColor(percent)
				.borderRadius(percent)
				.color(percent)
	}

	//
	interface AnimationType {
		started?: boolean
		equalTools?: boolean
		title1Transition?: StyleTransition
		title2Transition?: StyleTransition
		back1Transition?: StyleTransition
		back2Transition?: StyleTransition
		backArrowTransition?: StyleTransition
	}
	const animationDefault = {}
	const _animation = { ...animationDefault } as AnimationType

	useEffect(() => {
		// console.log({
		// 	appRef: appRef,
		// 	tabRefs: getTabsRefs(),
		// })
		// console.log('[TTB][IOSTitleBarRoot] INIT', {
		// 	title1Ref: title1Ref,
		// 	title2Ref: title2Ref,
		// 	back1Ref: back1Ref,
		// 	back2Ref: back2Ref,
		// 	backArrowRef: backArrowRef,
		// 	toolsRef: toolsRef,
		// 	_title1Ref: getTitleBarRef('title1Ref'),
		// 	_title2Ref: getTitleBarRef('title2Ref'),
		// 	_back1Ref: getTitleBarRef('back1Ref'),
		// 	_back2Ref: getTitleBarRef('back2Ref'),
		// 	_backArrowRef: getTitleBarRef('backArrowRef'),
		// 	_toolsRef: getTitleBarRef('toolsRef'),
		// })

		//
		_bindThemeChangingElement()

		const transitionStartedHandler = (e: Event) => {
			if (!selected) return
			if (_animation.started) return
			if (!_getTitleElement(false) || !_getBackTextElement(true)) return

			// console.log('[TTB][IOSTitleBarRoot] transition-started', {
			// 	getCurrentTabRef: getCurrentTabRef(),
			// 	e: e,
			// getPagesRefs: getPagesRefs(),
			// getPreviousPage: getPreviousPage(),
			// getCurrentPage: getCurrentPage(),
			// })

			// if (!this.tab.hasAttribute('selected')) return

			const event = e as CustomEvent as CustomTransitionStartedEventType

			// console.log('[NEWPAGE][TTB][IOSTitleBarRoot] INIT', {
			// 	getPreviousPageRef: getPreviousPageRef()?.current,
			// 	getCurrentPageRef: getCurrentPageRef()?.current,
			// 	getPreviousPageTitleBarRef:
			// 		getPreviousPageTitleBarRef()?.current,
			// 	getCurrentPageTitleBarRef: getCurrentPageTitleBarRef()?.current,
			// 	event: event,
			// })

			// const page = event.detail.page
			// const oldHeader = page.prevPage.titlebar // i-titlebar-${this.titlebarType}
			const oldHeader = getPreviousPageTitleBarRef()
			// const newHeader = page.titlebar
			const newHeader = getCurrentPageTitleBarRef()

			//
			_animation.started = true
			_animation.equalTools =
				_getToolsElementHTML(oldHeader) ===
				_getToolsElementHTML(newHeader)

			_switchElementsVisibility(true, true)

			const rectToArr = (r: DOMReactPos) => [r.left, r.top]

			// console.log('[TransitionStarted] STARTED', event.detail, {
			// 	oldHeader: oldHeader,
			// 	newHeader: newHeader,
			// })

			// console.log('HHH _getTitleElement(false)', _getTitleElement(false))
			// console.log(
			// 	'HHH _getBackTextElement(true)',
			// 	_getBackTextElement(true)
			// )

			// const TITLE_GAP = 0

			// const _oldTitleElementPositionTmp = _getTitleElementPosition(false)
			// const _oldTitleElementPosition = {
			// 	..._oldTitleElementPositionTmp,
			// 	top: _oldTitleElementPositionTmp.top - TITLE_GAP,
			// }

			_animation.title1Transition = new StyleTransition(
				title1Ref.current,
				{
					source: _getTitleElement(true) as HTMLDivElement, // oldHeader
					translate: rectToArr(
						// _getTitleElementPosition(true) // oldHeader
						// _oldTitleElementPosition // oldHeader
						_getTitleElementPosition(false) // >newHeader
					),
				},
				{
					source: _getBackTextElement(false) as HTMLDivElement, // newHeader
					translate: rectToArr(
						_getBackTextElementPosition(false) // newHeader
					),
					opacity: 0,
				}
			)

			// console.log(
			// 	'[TransitionStarted] title1Transition',
			// 	_animation.title1Transition,
			// 	{ title1Ref: title1Ref.current }
			// )

			_animation.title2Transition = new StyleTransition(
				title2Ref.current,
				{
					translate: rectToArr(
						_getHiddenTitleElementPosition(false) // newHeader
					),
					opacity: getComputedStyle(
						_getTitleElement(false) as Element // newHeader
					).opacity,
				},
				{
					translate: rectToArr(_getTitleElementPosition(false)), // newHeader
					// translate: rectToArr(_newTitleElementPosition), // newHeader
					opacity: 0,
				}
			)

			// console.log(
			// 	'[TransitionStarted] title2Transition',
			// 	_animation.title2Transition,
			// 	{ title2Ref: title2Ref.current }
			// )

			// console.log(
			// 	'[NEWPAGE][TTB][IOSTitleBarRoot][A0] appRef:',
			// 	appRef.current,
			// 	(appRef.current as HTMLDivElement).getBoundingClientRect()
			// )
			// console.log(
			// 	'[NEWPAGE][TTB][IOSTitleBarRoot][A1] title2Ref title2Ref.current:',
			// 	title2Ref.current,
			// 	title2Ref.current?.getBoundingClientRect()
			// )
			// console.log(
			// 	'[NEWPAGE][TTB][IOSTitleBarRoot][A2] HIDDEN(false):',
			// 	_getHiddenTitleElement(false),
			// 	_getHiddenTitleElementPosition(false)
			// )
			// console.log(
			// 	'[NEWPAGE][TTB][IOSTitleBarRoot][A3] TITLE(false):',
			// 	_getTitleElement(false),
			// 	// _getTitleElementPosition(false)
			// 	_newTitleElementPosition
			// )

			_animation.back1Transition = new StyleTransition(
				back1Ref.current,
				{
					translate: rectToArr(
						// _getBackTextElementPosition(true) // oldHeader
						_getBackTextElementPosition(false) // >newHeader
					),
					opacity: getComputedStyle(
						_getBackTextElement(true) as Element // oldHeader
					).opacity,
				},
				{
					translate: rectToArr(
						_getHiddenBackTextElementPosition(true) // oldHeader
					),
					opacity: 0,
				}
			)

			// console.log(
			// 	'[TransitionStarted] back1Transition',
			// 	_animation.back1Transition,
			// 	{ back1Ref: back1Ref.current }
			// )

			_animation.back2Transition = new StyleTransition(
				back2Ref.current,
				{
					source: _getTitleElement(true) as HTMLDivElement, // oldHeader
					// translate: rectToArr(_getTitleElementPosition(true)), // oldHeader
					translate: rectToArr(_getTitleElementPosition(false)), // >newHeader
					opacity: 0,
				},
				{
					source: _getBackTextElement(false), // newHeader
					translate: rectToArr(
						// _getBackTextElementPosition(false) // >oldHeader
						_getBackTextElementPosition(false) // newHeader
					),
				}
			)

			_animation.backArrowTransition = new StyleTransition(
				backArrowRef.current,
				{
					source: _getBackArrowElement(true), // oldHeader
					translate: rectToArr(
						_getBackArrowElementPosition(true) // oldHeader
					),
				},
				{
					source: _getBackArrowElement(false), // newHeader
					translate: rectToArr(
						_getBackArrowElementPosition(false) // newHeader
					),
				}
			)

			// console.log('[TB1]', {
			// _getTitleElement0: _getTitleElement(false)?.textContent?.trim(),
			// _getTitleElement1: _getTitleElement(true)?.textContent?.trim(),
			// _getBackTextElement0:
			// 	_getBackTextElement(false)?.textContent?.trim(),
			// _getBackTextElement1:
			// 	_getBackTextElement(true)?.textContent?.trim(),
			// _getHiddenTitleElement0:
			// 	_getHiddenTitleElement(false)?.textContent?.trim(),
			// _getHiddenTitleElement1:
			// 	_getHiddenTitleElement(true)?.textContent?.trim(),
			// _getHiddenBackTextElement0:
			// 	_getHiddenBackTextElement(false)?.textContent?.trim(),
			// _getHiddenBackTextElement1:
			// 	_getHiddenBackTextElement(true)?.textContent?.trim(),
			//
			// 	_getPreviousPageTitleBarRefs: getPreviousPageTitleBarRefs(),
			// 	_getCurrentPageTitleBarRefs: getCurrentPageTitleBarRefs(),
			// })

			// console.log(
			// 	'[TB1] title1Ref:',
			// 	// title1Ref.current,
			// 	title1Ref.current?.textContent?.trim(),
			// 	'-->',
			// 	_getTitleElement(true)?.textContent?.trim(),
			// 	'==?>',
			// 	_getTitleElement(false)?.textContent?.trim()
			// 	// _getTitleElement(true)
			// ) // oldHeader
			// console.log(
			// 	'[TB1] title2Ref:',
			// 	// title2Ref.current,
			// 	title2Ref.current?.textContent?.trim(),
			// 	'-->',
			// 	_getTitleElement(false)?.textContent?.trim(),
			// 	'==?>',
			// 	_getTitleElement(true)?.textContent?.trim()
			// 	// _getTitleElement(false)
			// ) // newHeader
			// console.log(
			// 	'[TB1] back1Ref:',
			// 	// back1Ref.current,
			// 	back1Ref.current?.textContent?.trim(),
			// 	'-->',
			// 	_getBackTextElement(true)?.textContent?.trim(),
			// 	'==?>',
			// 	_getBackTextElement(false)?.textContent?.trim()
			// 	// _getBackTextElement(true)
			// ) // oldHeader
			// console.log(
			// 	'[TB1] back2Ref:',
			// 	// back2Ref.current,
			// 	back2Ref.current?.textContent?.trim(),
			// 	'-->',
			// 	_getBackTextElement(false)?.textContent?.trim(),
			// 	'==?>',
			// 	_getBackTextElement(true)?.textContent?.trim()
			// 	// _getBackTextElement(false)
			// ) // newHeader

			// console.log('title1Ref.current:', title1Ref.current)
			// console.log('title1Ref.TO:', _getTitleElement(true))
			// console.log('title1Ref.WHATIF:', _getTitleElement(false))
			// console.log('title1Ref.WHY?:', _getBackTextElement(false))
			_cloneTextStyle(title1Ref.current, _getTitleElement(true)) // oldHeader
			_cloneTextStyle(title2Ref.current, _getTitleElement(false)) // newHeader
			_cloneTextStyle(back1Ref.current, _getBackTextElement(true)) // oldHeader
			_cloneTextStyle(back2Ref.current, _getBackTextElement(false)) // newHeader
			_cloneTextStyle(backArrowRef.current, _getBackArrowElement(false)) // newHeader

			if (_animation.equalTools) {
				// const pos = newHeader.getToolsElementPosition();
				const pos = _getToolsElementPosition(newHeader)
				const style = getComputedStyle(
					_getToolsElement(oldHeader) as Element
				)

				if (toolsRef.current) {
					toolsRef.current.innerHTML = _getToolsElementHTML(newHeader)
					toolsRef.current.style.width = `${pos.right - pos.left - parseFloat(style.paddingRight)}px`
					toolsRef.current.style.translate = `${pos.left}px ${pos.top}px`
				}
			} else {
				if (toolsRef.current) {
					toolsRef.current.innerHTML = ''
				}
			}

			_switchElementsVisibility(true, true)
		}
		const transitionCompletedHandler = () => {
			if (!selected) return
			if (!_animation.started) return
			console.log('[TransitionCompleted] COMPLETED')

			// console.log('[TTB][IOSTitleBarRoot] transition-completed')
			// if (!this.tab.hasAttribute('selected')) return // todo
			_animation.started = false
			_switchElementsVisibility(true, false)
		}
		const transitionHandler = (e: Event) => {
			if (!selected) return
			// console.log('[Transition] TRANSITIONNING', e)

			const event = e as CustomEvent as CustomTransitionEventType
			// console.log('[TTB][IOSTitleBarRoot] transition')
			if (!_animation.started) return

			_calcTransition(null, event.detail.percent)
		}

		appRef.current?.addEventListener(
			'transition-started',
			transitionStartedHandler
		)

		appRef.current?.addEventListener(
			'transition-completed',
			transitionCompletedHandler
		)

		appRef.current?.addEventListener('transition', transitionHandler)

		_switchElementsVisibility(null, false)

		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			appRef.current?.removeEventListener(
				'transition-started',
				transitionStartedHandler
			)

			// eslint-disable-next-line react-hooks/exhaustive-deps
			appRef.current?.removeEventListener(
				'transition-completed',
				transitionCompletedHandler
			)

			// eslint-disable-next-line react-hooks/exhaustive-deps
			appRef.current?.removeEventListener('transition', transitionHandler)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appRef])

	// const animElementsClassName = `${styles.animElement} ${titleElementsVisibility ? '' : styles.topMenuAnimInvisible}`
	const animElementsClassName = `${styles.animElement} ${styles.topMenuAnimInvisible}`
	// const animElementsClassName = `${styles.animElement}`

	return (
		<>
			<div
				data-element="i-titlebar-root"
				className={styles.iTitleBarRoot}
			>
				<div
					ref={title1Ref}
					id="anim-title-1"
					className={animElementsClassName}
				></div>
				<div
					ref={title2Ref}
					id="anim-title-2"
					// className={animElementsClassName}
					className={`${animElementsClassName} ${styles.tests}`}
				></div>
				<div
					ref={back1Ref}
					id="anim-back-1"
					className={animElementsClassName}
				></div>
				<div
					ref={back2Ref}
					id="anim-back-2"
					className={animElementsClassName}
				></div>
				{backArrowSVG({
					id: 'anim-back-arrow',
					className: `${styles.animBackArrow} ${animElementsClassName}`,
					ref: backArrowRef,
				})}
				<div
					ref={toolsRef}
					id="anim-tools"
					className={`${styles.animTools} ${animElementsClassName}`}
				></div>
			</div>
			{/* <div>
				<button
					onClick={() => {
						console.log(
							'_getHiddenTitleElementPosition():',
							_getHiddenTitleElementPosition(),
							_getHiddenTitleElement()
						)
					}}
				>
					_getHiddenTitleElementPosition()
				</button>
				<button
					onClick={() => {
						console.log(
							'_getTitleElementPosition():',
							_getTitleElementPosition(),
							_getTitleElement()
						)
					}}
				>
					_getTitleElementPosition()
				</button>
			</div> */}
			{/* <div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 100,
					background: 'grey',
				}}
			>
				<div>IOSTitleBarRoot</div>
				<button
					onClick={() => {
						console.log('click', test + '1')
						setTest(test + '1')
					}}
				>
					+++++++
				</button>
				<pre>{test}</pre>
			</div> */}
		</>
	)
}

export default IOSTitleBarRoot
