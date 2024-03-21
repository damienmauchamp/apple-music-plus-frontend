import React, {
	createContext,
	createRef,
	ReactElement,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'

export interface iOSTabContextProviderProps {
	children?: ReactElement | ReactNode
	tabRef?: React.RefObject<HTMLDivElement>
}

export interface PageRefType {
	name: string
	ref: React.RefObject<HTMLDivElement>
}

export interface iOSTabContextProps {
	tabRef?: React.RefObject<HTMLDivElement>
	setTabRef?: (ref: React.RefObject<HTMLDivElement>) => void
	//
	addPageRef?: (name: string) => React.RefObject<HTMLDivElement>
	getPagesRefs?: () => PageRefType[]
	// setTabRef: React.Dispatch<
	// 	React.SetStateAction<React.RefObject<HTMLDivElement>>
	// >
	// tests
	test?: string
	setTest?: React.Dispatch<React.SetStateAction<string>>
}

//
const pageRefs = [] as PageRefType[]
const addPageRef = (name: string) => {
	const ref = createRef<HTMLDivElement>()
	pageRefs.push({
		name: name,
		ref: ref,
	})
	return ref
}
const getPagesRefs = () => {
	return pageRefs.filter((pageRef) => (pageRef.ref.current || null) !== null)
}

const defaultContext = {
	tabRef: createRef<HTMLDivElement>(),
	setTabRef: () => {},
	addPageRef: addPageRef,
	getPagesRefs: getPagesRefs,
	// tests
	test: '',
	setTest: () => {},
}

const iOSTabContext = createContext<iOSTabContextProps>(
	defaultContext as iOSTabContextProps
)

export const IOSTabContextProvider = ({
	children,
	...props
}: iOSTabContextProviderProps) => {
	const [tabRef, setTabRef] = useState<React.RefObject<HTMLDivElement>>(
		props.tabRef || createRef<HTMLDivElement>()
	)

	useEffect(() => {
		setTabRef(tabRef)
	}, [tabRef])

	// tests
	const [test, setTest] = useState<string>('init')

	return (
		<iOSTabContext.Provider
			value={{
				tabRef,
				setTabRef,
				addPageRef,
				getPagesRefs,
				// tests
				test,
				setTest,
			}}
		>
			{children}
		</iOSTabContext.Provider>
	)
}

export const useIOSTabContext = (props?: iOSTabContextProps) =>
	useContext({ ...props, ...iOSTabContext })
