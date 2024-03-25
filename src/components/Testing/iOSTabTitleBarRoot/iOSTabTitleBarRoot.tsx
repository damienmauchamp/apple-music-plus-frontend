import React, { useEffect, useRef } from 'react'
// import { useIOSTabContext } from '../iOSTab/iOSTabContext'
import styles from './iOSTabTitleBarRoot.module.css'
import { backArrowSVG, CustomTransitionEventType } from '../iOSPage/iOSPage'
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
		// getTabsRefs,
		_bindThemeChangingElement,
		setTitleBarRef,
		// getTitleBarRef,
		// getCurrentTabRef,
		// getPreviousPageRef,
		// getCurrentPageRef,
		getPreviousPageTitleBarRef,
		getCurrentPageTitleBarRef,
		getPreviousPageTitleBarRefs,
		getCurrentPageTitleBarRefs,
		getPreviousPageRefs,
		getCurrentPageRefs,
	} = useIOSAppContext()
	const { selected } = useIOSTabContext()

	//
	const title1Ref = useRef<HTMLDivElement>(null) // #anim-title-1
	const title2Ref = useRef<HTMLDivElement>(null) // #anim-title-2
	const back1Ref = useRef<HTMLDivElement>(null) // #anim-back-1
	const back2Ref = useRef<HTMLDivElement>(null) // #anim-back-2
	const backArrowRef = useRef<SVGSVGElement>(null) // #anim-back-arrow
	const toolsRef = useRef<HTMLDivElement>(null) // #anim-tools

	if (selected) {
		setTitleBarRef('title1Ref', title1Ref)
		setTitleBarRef('title2Ref', title2Ref)
		setTitleBarRef('back1Ref', back1Ref)
		setTitleBarRef('back2Ref', back2Ref)
		setTitleBarRef('backArrowRef', backArrowRef)
		setTitleBarRef('toolsRef', toolsRef)
	}

	const _getHeaderPositionPercent = (old: boolean = false) => {
		const _pageRefs = old ? getPreviousPageRefs() : getCurrentPageRefs()
		const _pageTitleBarRefs = old
			? getPreviousPageTitleBarRefs()
			: getCurrentPageTitleBarRefs()

		const pageContainerRef = _pageRefs.pageContainerRef
		const headerTitleRef = _pageRefs.headerTitleRef
		const titlebarRef = _pageTitleBarRefs.titlebarRef

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

	// const _getHiddenTitleElement = (old: boolean = false) => {
	// 	const _getHiddenTitleElementDefault = () => {
	// 		return _getTitleElement(old) as HTMLDivElement
	// 	}

	// 	// default
	// 	if (titlebar === 'default') {
	// 		return _getHiddenTitleElementDefault()
	// 	}

	// 	// titled
	// 	if (titlebar === 'titled') {
	// 		if (_getHeaderPositionPercent(old) < 1) {
	// 			return _getTitleElement(old)
	// 		}
	// 		return _getHiddenTitleElementDefault()
	// 	}
	// }

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

	// const _getHiddenBackTextElement = (old: boolean = false) =>
	// 	_getBackTextElement(old)

	const _getHiddenBackTextElementPosition = (old: boolean = false) => {
		const backPos = _getBackTextElementPosition(old)
		backPos.left -= 100
		return backPos
	}

	const _switchElementsVisibility = (
		page: boolean | null,
		isVisible: boolean
	) => {
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

		if (page != null) {
			const oldHeader = getPreviousPageTitleBarRef()
			const newHeader = getCurrentPageTitleBarRef()

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
		//
		_bindThemeChangingElement()

		const transitionStartedHandler = (/*e: Event*/) => {
			if (!selected) return
			if (_animation.started) return
			if (!_getTitleElement(false) || !_getBackTextElement(true)) return

			const oldHeader = getPreviousPageTitleBarRef()
			const newHeader = getCurrentPageTitleBarRef()

			//
			_animation.started = true
			_animation.equalTools =
				_getToolsElementHTML(oldHeader) ===
				_getToolsElementHTML(newHeader)

			_switchElementsVisibility(true, true)

			const rectToArr = (r: DOMReactPos) => [r.left, r.top]

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

			_animation.title2Transition = new StyleTransition(
				title2Ref.current,
				{
					translate: rectToArr(
						_getHiddenTitleElementPosition(false) as DOMReactPos // newHeader
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

			_cloneTextStyle(title1Ref.current, _getTitleElement(true)) // oldHeader
			_cloneTextStyle(title2Ref.current, _getTitleElement(false)) // newHeader
			_cloneTextStyle(back1Ref.current, _getBackTextElement(true)) // oldHeader
			_cloneTextStyle(back2Ref.current, _getBackTextElement(false)) // newHeader
			_cloneTextStyle(backArrowRef.current, _getBackArrowElement(false)) // newHeader

			if (_animation.equalTools) {
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

			// if (!this.tab.hasAttribute('selected')) return // todo
			_animation.started = false
			_switchElementsVisibility(true, false)
		}
		const transitionHandler = (e: Event) => {
			if (!selected) return

			const event = e as CustomEvent as CustomTransitionEventType
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
					className={animElementsClassName}
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
		</>
	)
}

export default IOSTitleBarRoot
