import React, { useEffect, useState } from 'react'
import { IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSTab.module.css'
import { IOSTabContextProvider } from './iOSTabContext'
import IOSTitleBarRoot, {
	IOSTitleBarProps,
} from '../iOSTabTitleBarRoot/iOSTabTitleBarRoot'
import { useIOSAppContext } from '../iOSApp/iOSAppContext'
import IOSPage, { IOSPageProps } from '../iOSPage/iOSPage'

interface IOSTabProps extends IOSElementProps, IOSTitleBarProps {
	selected?: boolean
	name: string
	pages?: IOSPageProps[]
	// pages?: (typeof IOSPage)[]
	page?: string
}

const IOSTab = ({
	titlebar = 'default',
	pages = [] as IOSPageProps[],
	/*children,*/ selected,
	...props
}: IOSTabProps) => {
	//
	const { addTabRef } = useIOSAppContext()
	const tabRef = addTabRef(props.name)
	// const { getPagesRefs } = useIOSTabContext()
	// const _getPagesRefs = () => getPagesRefs && getPagesRefs()

	// useEffect(() => {
	// 	setTabSelected(selected)
	// }, [selected, setTabSelected])

	// PAGES
	const [tabPages, setTabPages] = useState<IOSPageProps[]>(
		pages && pages[0] ? [pages[0]] : ([] as IOSPageProps[])
	)

	const getPreviousPage = () => {
		if (!tabPages || tabPages.length <= 1) return
		return tabPages[tabPages.length - 2]
	}

	const getCurrentPage = () => {
		if (!tabPages) return
		return (tabPages && tabPages[tabPages.length - 1]) || undefined
	}

	const openPage = (name: string) => {
		const nextPage = pages.find((page) => page.page === name)
		if (!nextPage) {
			// console.log('[openPage] Page not found', name)
			return
		}

		const opened = tabPages.find((page) => page.page === name),
			isOpened = Boolean(opened)
		if (isOpened) {
			// console.log('[openPage] Page already opened', nextPage, {
			// 	tabPages: tabPages,
			// })

			if (opened?.page === getPreviousPage()?.page) {
				// console.log(
				// 	'[openPage] Next page is previous page, going back',
				// 	nextPage
				// )
				goBack()
			}
			return
		}

		const next = {
			...nextPage,
			prevPage: getCurrentPage()?.page || nextPage.prevPage,
		}

		setTabPages([...tabPages, next])

		return next as IOSPageProps
	}

	const [closing, setClosing] = useState<boolean>(false)
	const goBack = (animate: boolean = true) => {
		const previousPage = getPreviousPage()

		//
		const newPages = [...tabPages.slice(0, -1)]
		// const newPages = !test ? [...tabPages.slice(0, -1)] : tabPages
		// console.log('[P1] goBack:', {
		// 	previousPage: previousPage,
		// 	currentPage: getCurrentPage(),
		// 	tabPages: tabPages,
		// 	newPages: newPages,
		// 	test: test,
		// })

		if (!previousPage) return

		if (animate) {
			setClosing(true)
			setTimeout(() => {
				setTabPages(newPages)
				setClosing(false)
			}, 400)
			return previousPage
		}

		setTabPages(newPages)

		return previousPage
	}

	useEffect(() => {
		// console.log('[Tab] pages', pages)
	}, [pages])

	return (
		<IOSTabContextProvider
			tabRef={tabRef}
			tabInfo={{ name: props.name, pages: pages }}
			tabPages={tabPages}
			// setTabPages={setTabPages}
			openPage={openPage}
			goBack={goBack}
			getPreviousPage={getPreviousPage}
			getCurrentPage={getCurrentPage}
			selected={selected}
		>
			<div
				ref={tabRef}
				data-element="i-tab"
				className={`${styles.iTab} ${selected ? styles.selected : ''}`}
				data-selected={selected}
				{...props}
			>
				<IOSTitleBarRoot titlebar={titlebar} />
				<slot>
					{/* <button onClick={() => console.log(_getPagesRefs())}>
						getPagesRefs
					</button> */}
					{tabPages.map((page) => (
						<IOSPage
							key={page.id}
							{...page}
							titlebar={titlebar}
							closing={closing}
						/>
					))}
				</slot>
				{/* <slot>{children}</slot> */}
			</div>
		</IOSTabContextProvider>
	)
}

export default IOSTab
