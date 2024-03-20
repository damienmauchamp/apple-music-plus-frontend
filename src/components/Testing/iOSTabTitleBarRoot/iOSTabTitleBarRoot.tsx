import React, { useEffect, useRef, useState } from 'react'
import { useIOSTabContext } from '../iOSTab/iOSTabContext'
import styles from './iOSTabTitleBarRoot.module.css'
import { backArrowSVG } from '../iOSPage/iOSPage'
import { useIOSAppContext } from '../iOSApp/iOSAppContext'

interface iOSTitleBarRootProps {}

const IOSTitleBarRoot = ({}: iOSTitleBarRootProps) => {
	const { appRef, getTabsRefs, _bindThemeChangingElement } =
		useIOSAppContext()
	const { test, setTest } = useIOSTabContext()

	console.log({
		test: test,
		setTest: setTest,
	})

	//
	const title1Ref = useRef<HTMLDivElement>(null) // #anim-title-1
	const title2Ref = useRef<HTMLDivElement>(null) // #anim-title-2
	const back1Ref = useRef<HTMLDivElement>(null) // #anim-back-1
	const back2Ref = useRef<HTMLDivElement>(null) // #anim-back-2
	const backArrowRef = useRef<SVGSVGElement>(null) // #anim-back-arrow
	const toolsRef = useRef<HTMLDivElement>(null) // #anim-tools

	//
	const [elementsVisibility, setElementsVisibility] = useState<boolean>(false)

	//

	const calcTransition = (page, percent) => {
		// todo
	}

	// const _cloneTextStyle = (element, sourceElement) => {
	// 	// todo
	// }

	const _switchElementsVisibility = (page, isVisible: boolean) => {
		console.log('_switchElementsVisibility', {
			page: page,
			isVisible: isVisible,
		})

		setElementsVisibility(isVisible)
		// if (isVisible) {

		// }

		// todo

		/*
		const className = "top-menu-anim-invisible";
		[ 
			this.title1, this.title2, this.back1, this.back2, this.backArrow, this.tools
		].forEach(e => e.classList.toggle(className, !isVisible));
		if(page != null){
			const oldHeader = page.prevPage.titlebar;
			const newHeader = page.titlebar;
			[
				oldHeader.getTitleElement(),
				newHeader.getTitleElement(),
				oldHeader.getBackTextElement(),
				newHeader.getBackTextElement(),
				oldHeader.getBackArrowElement(),
				newHeader.getBackArrowElement(),
				this.animation.equalTools ? newHeader.getToolsElement() : null,
				this.animation.equalTools ? oldHeader.getToolsElement() : null,
			].forEach(e => e?.classList.toggle(className, isVisible));
		}
		*/
	}

	useEffect(() => {
		console.log({
			appRef: appRef,
			tabRefs: getTabsRefs(),
		})
		console.log({
			title1Ref: title1Ref,
			title2Ref: title2Ref,
			back1Ref: back1Ref,
			back2Ref: back2Ref,
			backArrowRef: backArrowRef,
			toolsRef: toolsRef,
		})

		//
		_bindThemeChangingElement()

		const transitionStartedHandler = () => {
			console.log('transition-started')
		}
		const transitionCompletedHandler = () => {
			console.log('transition-completed')
		}
		const transitionHandler = () => {
			console.log('transition')
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
	}, [])

	const animElementsClassName = `${styles.animElement} ${elementsVisibility ? '' : styles.topMenuAnimInvisible}`

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
