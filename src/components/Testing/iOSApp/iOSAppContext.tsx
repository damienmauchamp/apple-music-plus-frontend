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

// default
const defaultContext = {
	_bindThemeChangingElement: () => {},
	appRef: appRef,
	addTabRef: addTabRef,
	tabRefs: tabRefs,
	getTabsRefs: getTabsRefs,
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
				// tabRefs,
				getTabsRefs,
			}}
		>
			{children}
		</iOSAppContext.Provider>
	)
}

export const useIOSAppContext = () => useContext(iOSAppContext)
