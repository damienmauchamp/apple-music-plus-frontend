import React, {
	createContext,
	ReactElement,
	ReactNode,
	useContext,
	useState,
} from 'react'

export interface iOSTabContextProviderProps {
	children?: ReactElement | ReactNode
}

export interface iOSTabContextProps {
	test: string
	setTest: React.Dispatch<React.SetStateAction<string>>
}

const defaultContext = {
	test: 'init',
	setTest: () => {},
}

const iOSTabContext = createContext<iOSTabContextProps>(
	defaultContext as iOSTabContextProps
)

export const IOSTabContextProvider = ({
	children,
	// ...props
}: iOSTabContextProviderProps) => {
	const [test, setTest] = useState<string>('init')

	return (
		<iOSTabContext.Provider
			value={{
				test,
				setTest,
			}}
		>
			{children}
		</iOSTabContext.Provider>
	)
}

export const useIOSTabContext = () => useContext(iOSTabContext)
