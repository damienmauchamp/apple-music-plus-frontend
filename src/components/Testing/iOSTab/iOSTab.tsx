import React, { useEffect, useState } from 'react'
import { IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSTab.module.css'
import { IOSTabContextProvider, useIOSTabContext } from './iOSTabContext'
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
	const { getPagesRefs } = useIOSTabContext()

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
		setTabPages([...tabPages, next])

		return next as IOSPageProps
	}

	const goBack = () => {
		const previousPage = getPreviousPage()

		// todo : animation previous translate
		console.log('GOBACK', {
			getPagesRefs: getPagesRefs(),
		})

		if (!previousPage) return
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
					<button onClick={() => console.log(getPagesRefs())}>
						getPagesRefs
					</button>
					{tabPages.map((page) => (
						<IOSPage key={page.id} {...page} />
					))}
				</slot>
				{/* <slot>{children}</slot> */}
			</div>
		</IOSTabContextProvider>
	)
}

export default IOSTab
