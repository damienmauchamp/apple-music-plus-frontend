import React, { useCallback, useEffect, useState } from 'react'
import { IOSElementProps } from '../iOSApp/IOSApp'
import styles from './iOSTab.module.css'
import { IOSTabContextProvider } from './iOSTabContext'
import IOSTitleBarRoot from '../iOSTabTitleBarRoot/iOSTabTitleBarRoot'
import { useIOSAppContext } from '../iOSApp/iOSAppContext'
import IOSPage, { IOSPageProps, isIOSPageElement } from '../iOSPage/iOSPage'
import { getHash } from '@/src/helpers/iOSPage'
import { IOSTitleBarElementProps } from '../iOSTitleBar/iOSTitleBar'

interface IOSTabProps extends IOSElementProps, IOSTitleBarElementProps {
	selected?: boolean
	name: string
	pages?: IOSPageProps[]
	// pages?: (typeof IOSPage)[]
	page?: string
}

const IOSTab = ({
	titlebar = 'default',
	pages = [] as IOSPageProps[],
	children,
	selected,
	...props
}: IOSTabProps) => {
	//
	const { addTabRef, startHash } = useIOSAppContext()
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

	const getPages = () =>
		pages.map((page) => {
			const path = page.page.split('/')

			let tmpPage = '/'
			const previousPages = path.map((p) => {
				tmpPage = `${tmpPage}/${p}`.replace(/\/+/g, '/')

				return {
					isTab: props.page === tmpPage.replace(/^\//g, ''),
					isStartHash: tmpPage.replace(/^\//g, '') === startHash,
					page: tmpPage,
				}
			})

			const pageHistory = [...previousPages].reverse()
			pageHistory.shift()

			return {
				...page,
				isStartHash: page.page === startHash,
				previousPages: previousPages,
				history: pageHistory,
				route: path,
				path: path[path.length - 1],
				test: page.page,
			}
		})

	//
	useEffect(() => {
		if (!selected) return

		console.log('[TAB CURRENT] startHash:', startHash)
		console.log('[TAB CURRENT] hash:', getHash())
		console.log('[TAB CURRENT] tab:', props)
		console.log('[TAB CURRENT] tab.page:', props.page)
		console.log('[TAB CURRENT] pages:', getPages())

		if (!startHash) return

		// const current = getPages().find((page) => page.page === startHash)
		const current = getPages().find((page) => page.isStartHash)
		if (!current) return

		console.log('[TAB CURRENT] current:', current)

		const pagesToBeSet = [] as IOSPageProps[]

		current.previousPages.forEach(async (page) => {
			if (page.isTab) return true
			if (page.isStartHash) return false

			const previousPage = pages.find(
				(p) => p.page === page.page.replace(/^\//g, '')
			)
			console.log('[TAB CURRENT] maybe:', page)
			if (!previousPage) return true

			const pageIsAlreadySet = tabPages.find(
				(p) => p.id === previousPage.id
			)
			if (pageIsAlreadySet) return true

			console.log('[TAB CURRENT] adding as previous:', page)
			pagesToBeSet.push(previousPage)

			// openPage(previousPage.page)
		})

		console.log('[TAB CURRENT] tabPages:', tabPages)
		console.log('[TAB CURRENT] pagesToBeSet:', pagesToBeSet)
		// setTabPages(pagesToBeSet)

		// todo : multiple previous pages
		openPage(current.page)
		// openPage(current.page, pagesToBeSet)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	//
	const getPreviousPage = () => {
		if (!tabPages || tabPages.length <= 1) return
		return tabPages[tabPages.length - 2]
	}

	const getCurrentPage = () => {
		if (!tabPages) return
		return (tabPages && tabPages[tabPages.length - 1]) || undefined
	}

	const openPage = (name: string, previousPages: IOSPageProps[] = []) => {
		console.log('[PAGES] openPage:', name)

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
				// console.log(
				// 	'[openPage] Next page is previous page, going back',
				// 	nextPage
				// )
				goBack()
			}
			return
		}

		// // previousPages
		let nextPrevPage = getCurrentPage()?.page || nextPage.prevPage
		if (previousPages.length) {
			nextPrevPage =
				previousPages[previousPages.length - 1]?.page || nextPrevPage
		}

		const next = {
			...nextPage,
			prevPage: nextPrevPage,
		}

		console.log('[openPage] next:', next, [
			...tabPages,
			...previousPages,
			next,
		])

		const newTabPagesTmp = [...tabPages, ...previousPages, next]
		const newTabPages = newTabPagesTmp.map((page, i) => {
			if (i === 0) return page

			page.prevPage =
				newTabPagesTmp[i + 1]?.page ||
				newTabPagesTmp[i].prevPage ||
				undefined

			console.log('[TMP] page.prevPage', page.prevPage, '->', page.page)
			return page
		})
		setTabPages(newTabPages)
		// setTabPages([...tabPages, next])

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

	/**
	 * Add page to subpages
	 */
	const _addPageToSubPage = useCallback(
		(
			page: IOSPageProps,
			parentPage?: IOSPageProps,
			type: string = 'subPage'
		) => {
			if (!page.page) {
				false && console.warn(`No path found on this ${type}`, page)
				return
			}

			// checking if page is already in the tab pages array
			if (pages.find((tabPage) => tabPage.page === page.page)) {
				false &&
					console.warn(
						`This ${type} is already in the tab pages`,
						page
					)
				return
			}

			const newSubPage = {
				...page,
				id: page.id || page.page,
				prevPage: parentPage?.prevPage,
				// prevPage: page.prevPage || parentPage.prevPage
				backTitle: parentPage?.title,
			}
			pages.push(newSubPage)
			return newSubPage
		},
		[pages]
	)

	/**
	 * Adding pages' pages to the tab instead
	 */
	const _handlePagesPages = useCallback(() => {
		pages.forEach((page) => {
			if (!page.pages?.length) return

			page.pages.forEach((subPage) =>
				_addPageToSubPage(subPage, page, 'subPage')
			)
		})
	}, [_addPageToSubPage, pages])

	/**
	 * Adding pages in tab's children to the tab instead
	 */
	const _recursiveHandlingChildrenPages = useCallback(
		(
			childOrChildren:
				| string
				| number
				| true
				| React.ReactElement<
						any,
						string | React.JSXElementConstructor<any>
				  >
				| Iterable<React.ReactNode>
				| React.ReactPortal
				| React.PromiseLikeOfReactNode
		) => {
			React.Children.toArray(childOrChildren).forEach((child) => {
				if (!React.isValidElement(child)) return

				// ok, adding page
				if (isIOSPageElement(child)) {
					// todo : delete from children?
					return _addPageToSubPage(child.props)
				}

				// not a page
				// todo : use as layout???

				if (child.props.children) {
					// recursive call
					return _recursiveHandlingChildrenPages(child.props.children)
				}
			})
		},
		[_addPageToSubPage]
	)
	const _handleChildrenPages = useCallback(() => {
		if (!children) return

		return _recursiveHandlingChildrenPages(children)
	}, [_recursiveHandlingChildrenPages, children])

	useEffect(() => {
		_handlePagesPages()
	}, [pages, _handlePagesPages])

	useEffect(() => {
		_handleChildrenPages()
	}, [pages, _handleChildrenPages])

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
					{tabPages.map((page) => (
						<IOSPage
							key={page.id}
							{...page}
							titlebar={titlebar}
							closing={closing}
						/>
					))}
				</slot>
			</div>
		</IOSTabContextProvider>
	)
}

export default IOSTab
