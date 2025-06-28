'use client'

// F7
import Framework7 from '@/src/framework7-custom'
import Framework7React, {
	App,
	Link,
	Toolbar,
	View,
	Views,
	f7ready,
} from 'framework7-react'
import 'framework7/css/bundle'
Framework7.use(Framework7React)

//
import F7ReleasePage from '@/src/components/Pages/F7/F7ReleasePage'
import { useEffect } from 'react'

// routes
// import routes from '@/src/routes'
import F7ArtistsPage from '@/src/components/Pages/F7/F7ArtistsPage'
import { fixNavBar } from '@/src/helpers/f7'
import routes from './routes'

//
const f7params = {
	// Array with app routes
	routes: routes,
	name: process.env.APP_NAME,
	// theme: 'auto',
	theme: 'ios',
	darkMode: 'auto',
	// autoDarkTheme: true,
	// store: store,
	popup: { closeOnEscape: true },
	sheet: { closeOnEscape: true },
	popover: { closeOnEscape: true },
	actions: { closeOnEscape: true },
}

// React query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

const F7HomePage = () => {
	// const [ready, setReady] = useState<any>(false)

	useEffect(() => {
		// console.log('%c[F7HomePage] MOUNTED', 'color:green;')

		f7ready((f7) => {
			// setReady(true)
			f7.setColorTheme('#ff2d55')
		})

		// document
		// 	.querySelector('.navbars.navbar-hidden')
		// 	?.classList.remove('navbar-hidden')
		fixNavBar()

		return () => {
			// console.log('%c[F7HomePage] UNMOUNTED', 'color:red;')
		}
	}, [])

	// const SplashScreenOverlay = () => {
	// 	if (!ready) return null

	// 	return (
	// 		<div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-black z-50">
	// 			Loading bro
	// 		</div>
	// 	)
	// }

	// console.log('%c[F7HomePage] RENDERING', 'color:cyan;')

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<App
					{...f7params}
					className="max-w-5xl mx-auto lg:rounded-3xl lg:overflow-hidden"
				>
					<Views tabs className="safe-areas">
						{/* Toolbar */}
						<Toolbar tabbar bottom icons>
							<Link
								tabLink="#tab-releases"
								tabLinkActive
								text="Home"
								iconIos="f7:house"
								iconMd="material:home"
							/>
							<Link
								tabLink="#tab-artists"
								text="Artists"
								iconIos="f7:music_mic"
								iconMd="material:artist"
							/>
							{/* TESTS */}
							{/* <Link
								tabLink="#tab-tests"
								text="Tests"
								iconIos="f7:lightbulb_fill"
								iconMd="material:lightbulb"
							/> */}
						</Toolbar>

						{/* Tabs */}
						<View id="tab-releases" main url="/" tab tabActive>
							<F7ReleasePage home={true} />
						</View>
						<View id="tab-artists" tab>
							<F7ArtistsPage />
						</View>
						{/* TESTS */}
						{/* <View id="tab-tests" tab>Hello World!</View> */}
					</Views>
				</App>
			</QueryClientProvider>
		</>
	)
}

export default F7HomePage
