import MusicProvider from '@/src/core/MusicKitProvider'
import React, {
	createContext,
	ReactElement,
	useContext,
	useEffect,
	useState,
} from 'react'

interface MusicKitContextProviderProps {
	children?: ReactElement
}

interface MusicKitContextProps {
	logged: boolean
	updateLogin: (testing?: boolean) => void
	getInstance: () => MusicKit.MusicKitInstance
	isAuthorized: () => boolean
	musicKit: MusicKit.MusicKitInstance
	setMusicKit: React.Dispatch<React.SetStateAction<MusicKit.MusicKitInstance>>
	loading: boolean
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultMusicKit = {} as MusicKit.MusicKitInstance

const getInstance = () => {
	if (typeof window === 'undefined' || typeof MusicKit === 'undefined') {
		return defaultMusicKit
	}
	return MusicProvider.get()
}

const instanceIsLoaded = () => getInstance() !== defaultMusicKit

const isAuthorized = () => getInstance()?.isAuthorized || false

const defaultContext = {
	logged: false,
	updateLogin: () => {},
	getInstance: getInstance,
	isAuthorized: isAuthorized,
	//
	musicKit: defaultMusicKit,
	setMusicKit: (() => {}) as React.Dispatch<
		React.SetStateAction<MusicKit.MusicKitInstance>
	>,
	//
	loading: true,
	setLoading: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
}

const MusicKitContext = createContext<MusicKitContextProps>(
	defaultContext as MusicKitContextProps
)

export const MusicKitContextProvider = ({
	children,
	// ...props
}: MusicKitContextProviderProps) => {
	const [logged, setLogged] = useState<boolean>(isAuthorized())
	const [musicKit, setMusicKit] =
		useState<MusicKit.MusicKitInstance>(defaultMusicKit)
	const [loading, setLoading] = useState<boolean>(true)

	const updateLogin = (testing: boolean = false) => {
		if (testing) {
			setLogged(!logged)
			return
		}

		console.log('updateLogin', {
			isAuthorized: isAuthorized(),
			instanceIsLoaded: instanceIsLoaded(),
		})

		setLogged(isAuthorized())
		setMusicKit(getInstance())
		setLoading(!instanceIsLoaded())
	}

	useEffect(() => {
		window.addEventListener('load', function () {
			console.log('WINDOW loaded! - setAuthorized:', isAuthorized())
			updateLogin()
		})

		updateLogin()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<MusicKitContext.Provider
			value={{
				logged,
				updateLogin,
				getInstance,
				isAuthorized,
				musicKit,
				setMusicKit,
				loading,
				setLoading,
			}}
		>
			{children}
		</MusicKitContext.Provider>
	)
}

export const useMusicKitContext = () => useContext(MusicKitContext)
