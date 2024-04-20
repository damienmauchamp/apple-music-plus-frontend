'use client'

// F7
import 'framework7/css/bundle'
import Framework7 from '@/src/framework7-custom'
import Framework7React, {
	App,
	Link,
	Toolbar,
	View,
	Views,
	f7ready,
} from 'framework7-react'
Framework7.use(Framework7React)

//
import F7ReleasePage from '@/src/components/Pages/F7/F7ReleasePage'
import { useEffect } from 'react'

// routes
// import routes from '@/src/routes'
import routes from './routes'
import F7ArtistsPage from '@/src/components/Pages/F7/F7ArtistsPage'

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

const F7HomePage = () => {
	// const [ready, setReady] = useState<any>(false)

	useEffect(() => {
		// console.log('%c[F7HomePage] MOUNTED', 'color:green;')

		f7ready((f7) => {
			// setReady(true)
			f7.setColorTheme('#ff2d55')
		})

		document
			.querySelector('.navbars.navbar-hidden')
			?.classList.remove('navbar-hidden')

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
			<App
				{...f7params}
				className="max-w-5xl mx-auto lg:rounded-3xl lg:overflow-hidden"
			>
				<Views tabs>
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
					</Toolbar>

					{/* Tabs */}
					<View id="tab-releases" main url="/" tab tabActive>
						<F7ReleasePage home={true} />
					</View>
					<View id="tab-artists" tab>
						<F7ArtistsPage />
					</View>
				</Views>
			</App>
		</>
	)
}

export default F7HomePage
