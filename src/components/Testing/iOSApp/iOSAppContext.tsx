import React, {
	createContext,
	createRef,
	ReactElement,
	ReactNode,
	useContext,
} from 'react'

export interface iOSAppContextProviderProps {
	children?: ReactElement | ReactNode
}

export interface ElementRef {
	name: string
	ref: React.RefObject<HTMLDivElement>
}
export interface TabRefType extends ElementRef {}
export interface PageRefsType {
	pageContainerRef?: React.RefObject<HTMLDivElement>
	headerTitleRef?: React.RefObject<HTMLDivElement>
}
export interface TitleBarRefType {
	name: string
	ref: React.RefObject<HTMLDivElement | SVGSVGElement>
}
export interface TitleBarRefsType {
	titlebarRef?: React.RefObject<HTMLDivElement>
	statusbarElementRef?: React.RefObject<HTMLDivElement>
	backContainerElementRef?: React.RefObject<HTMLDivElement>
	backArrowElementRef?: React.RefObject<HTMLDivElement>
	backTextElementRef?: React.RefObject<HTMLDivElement>
	titleElementRef?: React.RefObject<HTMLDivElement>
	toolsContainerElementRef?: React.RefObject<HTMLDivElement>
	backgroundElementRef?: React.RefObject<HTMLDivElement>
}

export interface iOSAppContextProps {
	_bindThemeChangingElement: () => void
	appRef: React.RefObject<HTMLDivElement>
	addTabRef: (name: string) => React.RefObject<HTMLDivElement>
	// tabRefs: TabRefType[]
	getTabsRefs: () => TabRefType[]
	getCurrentTabRef: () => TabRefType
	// titleBar refs
	titleBarRefs: TitleBarRefType[]
	setTitleBarRef: (
		name: string,
		ref: React.RefObject<HTMLDivElement | SVGSVGElement>
	) => React.RefObject<HTMLDivElement | SVGSVGElement>
	getTitleBarRefs: () => TitleBarRefType[]
	getTitleBarRef: (
		name: string
	) => React.RefObject<HTMLDivElement | SVGSVGElement> | undefined
	// page refs
	setCurrentPageRef: (ref: React.RefObject<HTMLDivElement>) => void
	setPreviousPageRef: (ref: React.RefObject<HTMLDivElement>) => void
	getCurrentPageRef: () => React.RefObject<HTMLDivElement>
	getPreviousPageRef: () => React.RefObject<HTMLDivElement>
	// page elements refs
	getCurrentPageRefs: () => PageRefsType
	setCurrentPageRefs: (refs: PageRefsType) => void
	getPreviousPageRefs: () => PageRefsType
	setPreviousPageRefs: (refs: PageRefsType) => void
	// page titlebar refs
	setCurrentPageTitleBarRef: (ref: React.RefObject<HTMLDivElement>) => void
	setPreviousPageTitleBarRef: (ref: React.RefObject<HTMLDivElement>) => void
	getCurrentPageTitleBarRef: () => React.RefObject<HTMLDivElement>
	getPreviousPageTitleBarRef: () => React.RefObject<HTMLDivElement>
	// page titlebar elements refs
	setCurrentPageTitleBarRefs: (refs: TitleBarRefsType) => void
	setPreviousPageTitleBarRefs: (refs: TitleBarRefsType) => void
	getCurrentPageTitleBarRefs: () => TitleBarRefsType
	getPreviousPageTitleBarRefs: () => TitleBarRefsType
}

//
const appRef = createRef<HTMLDivElement>()
const tabRefs = [] as TabRefType[]
const addTabRef = (name: string) => {
	const ref = createRef<HTMLDivElement>()
	tabRefs.push({
		name: name,
		ref: ref,
	})
	return ref
}
const getTabsRefs = () => {
	return tabRefs.filter((tabRef) => (tabRef.ref.current || null) !== null)
}
// todo : modify when multitabs
const getCurrentTabRef = () => {
	// return tabRefs[tabRefs.length - 1]
	// getTabsRefs().find(
	// 	_tabRef => _tabRef.ref.current
	// )
	// return getTabsRefs()[0]
	return getTabsRefs()[getTabsRefs().length - 1]
}

// titleBar refs
const titleBarRefs = [] as TitleBarRefType[]
const setTitleBarRef = (
	name: string,
	ref: React.RefObject<HTMLDivElement | SVGSVGElement>
) => {
	titleBarRefs.push({
		name: name,
		ref: ref,
	})
	return ref
}
const getTitleBarRefs = () => {
	return titleBarRefs
}
const getTitleBarRef = (name: string) => {
	return titleBarRefs.find((titleBarRef) => titleBarRef.name === name)?.ref
}

// page refs
let currentPageRef: React.RefObject<HTMLDivElement>,
	previousPageRef: React.RefObject<HTMLDivElement>

let pagesRefs = {
	current: undefined,
	previous: undefined,
} as {
	current: React.RefObject<HTMLDivElement> | undefined
	previous: React.RefObject<HTMLDivElement> | undefined
}

const setCurrentPageRef = (ref: React.RefObject<HTMLDivElement>) => {
	// currentPageRef = ref
	pagesRefs = {
		...pagesRefs,
		current: ref,
	}
	currentPageRef = ref
}
const setPreviousPageRef = (ref: React.RefObject<HTMLDivElement>) => {
	// previousPageRef = ref
	pagesRefs = {
		...pagesRefs,
		previous: ref,
	}
	previousPageRef = ref
}
const getCurrentPageRef = () => currentPageRef
const getPreviousPageRef = () => previousPageRef

// page elements refs
let currentPageRefs: PageRefsType = {}
let previousPageRefs: PageRefsType = {}
const getCurrentPageRefs = () => currentPageRefs
const setCurrentPageRefs = (_currentPageRefs: PageRefsType) => {
	currentPageRefs = _currentPageRefs
}
const getPreviousPageRefs = () => previousPageRefs
const setPreviousPageRefs = (_previousPageRefs: PageRefsType) => {
	previousPageRefs = _previousPageRefs
}

// page titlebar refs
let currentPageTitleBarRef: React.RefObject<HTMLDivElement>,
	previousPageTitleBarRef: React.RefObject<HTMLDivElement>

const setCurrentPageTitleBarRef = (ref: React.RefObject<HTMLDivElement>) => {
	currentPageTitleBarRef = ref
}
const setPreviousPageTitleBarRef = (ref: React.RefObject<HTMLDivElement>) => {
	previousPageTitleBarRef = ref
}
const getCurrentPageTitleBarRef = () => currentPageTitleBarRef
const getPreviousPageTitleBarRef = () => previousPageTitleBarRef

// page titlebar elements refs
let currentPageTitleBarRefs: TitleBarRefsType = {
	// titlebarRef: undefined,
	// statusbarElementRef: undefined,
	// backContainerElementRef: undefined,
	// backArrowElementRef: undefined,
	// backTextElementRef: undefined,
	// titleElementRef: undefined,
	// toolsContainerElementRef: undefined,
	// backgroundElementRef: undefined,
}
let previousPageTitleBarRefs: TitleBarRefsType = {
	// titlebarRef: undefined,
	// statusbarElementRef: undefined,
	// backContainerElementRef: undefined,
	// backArrowElementRef: undefined,
	// backTextElementRef: undefined,
	// titleElementRef: undefined,
	// toolsContainerElementRef: undefined,
	// backgroundElementRef: undefined,
}
const getCurrentPageTitleBarRefs = () => currentPageTitleBarRefs
const setCurrentPageTitleBarRefs = (
	_currentPageTitleBarRefs: TitleBarRefsType
) => {
	currentPageTitleBarRefs = _currentPageTitleBarRefs
}
const getPreviousPageTitleBarRefs = () => previousPageTitleBarRefs
const setPreviousPageTitleBarRefs = (
	_previousPageTitleBarRefs: TitleBarRefsType
) => {
	previousPageTitleBarRefs = _previousPageTitleBarRefs
}

// default
const defaultContext = {
	_bindThemeChangingElement: () => {},
	appRef: appRef,
	addTabRef: addTabRef,
	tabRefs: tabRefs,
	getTabsRefs: getTabsRefs,
	getCurrentTabRef: getCurrentTabRef,
	// titleBar refs
	titleBarRefs: titleBarRefs,
	setTitleBarRef: setTitleBarRef,
	getTitleBarRefs: getTitleBarRefs,
	getTitleBarRef: getTitleBarRef,
	// page refs
	setCurrentPageRef: setCurrentPageRef,
	setPreviousPageRef: setPreviousPageRef,
	getCurrentPageRef: getCurrentPageRef,
	getPreviousPageRef: getPreviousPageRef,
	// page element refs
	setCurrentPageRefs: setCurrentPageRefs,
	setPreviousPageRefs: setPreviousPageRefs,
	getCurrentPageRefs: getCurrentPageRefs,
	getPreviousPageRefs: getPreviousPageRefs,
	// page titlebar refs
	setCurrentPageTitleBarRef: setCurrentPageTitleBarRef,
	setPreviousPageTitleBarRef: setPreviousPageTitleBarRef,
	getCurrentPageTitleBarRef: getCurrentPageTitleBarRef,
	getPreviousPageTitleBarRef: getPreviousPageTitleBarRef,
	// page titlebar elements refs
	getCurrentPageTitleBarRefs: getCurrentPageTitleBarRefs,
	setCurrentPageTitleBarRefs: setCurrentPageTitleBarRefs,
	getPreviousPageTitleBarRefs: getPreviousPageTitleBarRefs,
	setPreviousPageTitleBarRefs: setPreviousPageTitleBarRefs,
}

const iOSAppContext = createContext<iOSAppContextProps>(
	defaultContext as iOSAppContextProps
)

export const IOSAppContextProvider = ({
	children,
}: iOSAppContextProviderProps) => {
	//

	const _bindThemeChangingElement = () => {
		// console.log('_bindThemeChangingElement')
	}

	return (
		<iOSAppContext.Provider
			value={{
				_bindThemeChangingElement,
				appRef,
				//
				addTabRef,
				getTabsRefs,
				getCurrentTabRef,
				// titleBar refs
				titleBarRefs,
				setTitleBarRef,
				getTitleBarRefs,
				getTitleBarRef,
				// page refs
				setCurrentPageRef,
				setPreviousPageRef,
				getCurrentPageRef,
				getPreviousPageRef,
				// page elements refs
				setCurrentPageRefs,
				setPreviousPageRefs,
				getCurrentPageRefs,
				getPreviousPageRefs,
				// page titlebar refs
				setCurrentPageTitleBarRef,
				setPreviousPageTitleBarRef,
				getCurrentPageTitleBarRef,
				getPreviousPageTitleBarRef,
				// page titlebar elements refs
				getCurrentPageTitleBarRefs,
				setCurrentPageTitleBarRefs,
				getPreviousPageTitleBarRefs,
				setPreviousPageTitleBarRefs,
				// openPage: () => {},
			}}
		>
			{children}
		</iOSAppContext.Provider>
	)
}

export const useIOSAppContext = () => useContext(iOSAppContext)
