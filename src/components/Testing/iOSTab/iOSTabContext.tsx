import React, {
	createContext,
	createRef,
	ReactElement,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { IOSPageProps } from '../iOSPage/iOSPage'

export interface PageRefType {
	name: string
	ref: React.RefObject<HTMLDivElement>
}

export interface TabInfoType {
	name: string
	pages: IOSPageProps[]
}

export interface iOSTabContextProviderProps {
	children?: ReactElement | ReactNode
	tabRef?: React.RefObject<HTMLDivElement>
	tabInfo?: TabInfoType
	tabPages: IOSPageProps[]
	// setTabPages: React.Dispatch<React.SetStateAction<IOSPageProps[]>>
	openPage: (name: string) => IOSPageProps | undefined
	goBack: (animate?: boolean) => IOSPageProps | undefined
	getPreviousPage: () => IOSPageProps | undefined
	getCurrentPage: () => IOSPageProps | undefined
	selected?: boolean
}

export interface iOSTabContextProps {
	tabRef?: React.RefObject<HTMLDivElement>
	setTabRef?: (ref: React.RefObject<HTMLDivElement>) => void
	tabInfo?: TabInfoType
	//
	tabPages: IOSPageProps[]
	// setTabPages: React.Dispatch<React.SetStateAction<IOSPageProps[]>>
	openPage: (name: string) => IOSPageProps | undefined
	goBack: (animate?: boolean) => IOSPageProps | undefined
	getPreviousPage: () => IOSPageProps | undefined
	getCurrentPage: () => IOSPageProps | undefined
	//
	addPageRef?: (name: string) => React.RefObject<HTMLDivElement>
	getPagesRefs?: () => PageRefType[]
	// setTabRef: React.Dispatch<
	// 	React.SetStateAction<React.RefObject<HTMLDivElement>>
	// >
	// tests
	test?: string
	setTest?: React.Dispatch<React.SetStateAction<string>>
	selected?: boolean
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
	return pageRefs.filter((pageRef) => pageRef.ref.current !== null)
}

//

export const IOSTabContextProvider = ({
	children,
	tabInfo,
	tabPages,
	// setTabPages,
	openPage,
	goBack,
	getPreviousPage,
	getCurrentPage,
	selected,
	...props
}: iOSTabContextProviderProps) => {
	//
	const [tabRef, setTabRef] = useState<React.RefObject<HTMLDivElement>>(
		props.tabRef || createRef<HTMLDivElement>()
	)

	useEffect(() => {
		setTabRef(tabRef)
	}, [tabRef])

	// //
	// //
	// const [goBackFn, setGoBackFn] =
	// 	useState<() => IOSPageProps | undefined>(goBack)
	//
	// useEffect(() => {
	// 	setGoBackFn(goBack)
	// }, [goBack])

	//
	// console.log('Context tabPages', tabPages)
	// console.log('Context props', props, props.goBack.toString())
	// console.log('Context goBack', goBack)

	// tests
	const [test, setTest] = useState<string>('init')

	return (
		<iOSTabContext.Provider
			value={{
				tabRef,
				setTabRef,
				tabInfo,
				//
				tabPages,
				// setTabPages: props.setTabPages,
				// openPage: props.openPage,
				openPage: openPage,
				goBack: goBack,
				getPreviousPage: getPreviousPage,
				getCurrentPage: getCurrentPage,
				// getPreviousPage: props.getPreviousPage,
				// getCurrentPage: props.getCurrentPage,
				// setTabPages,
				// openPage,
				// goBack: props.goBack,
				// getPreviousPage,
				// getCurrentPage,
				//
				addPageRef,
				getPagesRefs,
				// tests
				test,
				setTest,

				//
				selected,
			}}
		>
			{children}
		</iOSTabContext.Provider>
	)
}

// defaults
const defaultContext = {
	tabRef: createRef<HTMLDivElement>(),
	setTabRef: () => {},
	// tabInfo: {},
	tabPages: [] as IOSPageProps[],
	setTabPages: () => {},
	openPage: () => {},
	goBack: () => {
		console.log('default goBack')
	},
	getPreviousPage: () => {},
	getCurrentPage: () => {},
	addPageRef: addPageRef,
	getPagesRefs: getPagesRefs,
	// tests
	test: '',
	setTest: () => {},
}

const iOSTabContext = createContext<iOSTabContextProps>(
	defaultContext as iOSTabContextProps
)

export const useIOSTabContext = (props?: iOSTabContextProps) =>
	// useContext({ ...iOSTabContext, ...props })
	useContext({ ...props, ...iOSTabContext })
