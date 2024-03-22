import React, { useEffect, useState } from 'react'
import { IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSTab.module.css'
import { IOSTabContextProvider } from './iOSTabContext'
import IOSTitleBarRoot from '../iOSTabTitleBarRoot/iOSTabTitleBarRoot'
import { useIOSAppContext } from '../iOSApp/iOSAppContext'
import IOSPage, { IOSPageProps } from '../iOSPage/iOSPage'

interface IOSTabProps extends IOSElementProps {
	selected?: boolean
	name: string
	pages?: IOSPageProps[]
	// pages?: (typeof IOSPage)[]
	page?: string
}

const IOSTab = ({
	pages = [] as IOSPageProps[],
	/*children,*/ selected,
	...props
}: IOSTabProps) => {
	//
	const { addTabRef } = useIOSAppContext()
	const tabRef = addTabRef(props.name)
	// const { getPagesRefs } = useIOSTabContext()
	// const _getPagesRefs = () => getPagesRefs && getPagesRefs()

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
		console.log('openPage', name, {
			previous: getPreviousPage(),
			current: getCurrentPage(),
		})

		const nextPage = pages.find((page) => page.page === name)
		if (!nextPage) {
			console.log('[openPage] Page not found', name)
			return
		}

		const opened = tabPages.find((page) => page.page === name),
			isOpened = Boolean(opened)
		if (isOpened) {
			console.log('[openPage] Page already opened', nextPage, {
				tabPages: tabPages,
			})

			if (opened?.page === getPreviousPage()?.page) {
				console.log(
					'[openPage] Next page is previous page, going back',
					nextPage
				)
				goBack()
			}
			return
		}

		const next = {
			...nextPage,
			prevPage: getCurrentPage()?.page || nextPage.prevPage,
		}

		// todo : animate next page

		setTabPages([...tabPages, next])

		return next as IOSPageProps
	}

	const [closing, setClosing] = useState<boolean>(false)
	const goBack = (animate: boolean = true) => {
		const previousPage = getPreviousPage()

		if (!previousPage) return

		if (animate) {
			setClosing(true)
			setTimeout(() => {
				setTabPages([...tabPages.slice(0, -1)])
				setClosing(false)
			}, 400)
			return previousPage
		}

		setTabPages([...tabPages.slice(0, -1)])

		return previousPage
	}

	useEffect(() => {
		console.log('[Tab] pages', pages)
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
		>
			<div
				ref={tabRef}
				data-element="i-tab"
				className={`${styles.iTab} ${selected ? styles.selected : ''}`}
				{...props}
			>
				<IOSTitleBarRoot />
				<slot>
					{/* <button onClick={() => console.log(_getPagesRefs())}>
						getPagesRefs
					</button> */}
					{tabPages.map((page) => (
						<IOSPage key={page.id} {...page} closing={closing} />
					))}
				</slot>
				{/* <slot>{children}</slot> */}
			</div>
		</IOSTabContextProvider>
	)
}

export default IOSTab
