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

export interface TabRefType {
	name: string
	ref: React.RefObject<HTMLDivElement>
}

export interface iOSAppContextProps {
	_bindThemeChangingElement: () => void
	appRef: React.RefObject<HTMLDivElement>
	addTabRef: (name: string) => React.RefObject<HTMLDivElement>
	// tabRefs: TabRefType[]
	getTabsRefs: () => TabRefType[]
	getCurrentTabRef: () => TabRefType
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

// default
const defaultContext = {
	_bindThemeChangingElement: () => {},
	appRef: appRef,
	addTabRef: addTabRef,
	tabRefs: tabRefs,
	getTabsRefs: getTabsRefs,
	getCurrentTabRef: getCurrentTabRef,
}

const iOSAppContext = createContext<iOSAppContextProps>(
	defaultContext as iOSAppContextProps
)

export const IOSAppContextProvider = ({
	children,
}: iOSAppContextProviderProps) => {
	//

	const _bindThemeChangingElement = () => {
		console.log('_bindThemeChangingElement')
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
				//
				// openPage: () => {},
			}}
		>
			{children}
		</iOSAppContext.Provider>
	)
}

export const useIOSAppContext = () => useContext(iOSAppContext)
