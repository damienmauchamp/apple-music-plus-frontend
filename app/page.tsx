'use client'

// F7
import 'framework7/css/bundle'
import Framework7 from '@/src/framework7-custom'
import Framework7React, { App, View, Views, f7ready } from 'framework7-react'
Framework7.use(Framework7React)

//
import F7ReleasePage from '@/src/components/Pages/F7/F7ReleasePage'
import { useEffect } from 'react'

// routes
// import routes from '@/src/routes'
import routes from './routes'

//
const f7params = {
	// Array with app routes
	routes: routes,
	name: process.env.APP_NAME,
	// theme: 'auto',
	theme: 'ios',
	darkMode: 'auto',
	// store: store,
	popup: { closeOnEscape: true },
	sheet: { closeOnEscape: true },
	popover: { closeOnEscape: true },
	actions: { closeOnEscape: true },
}

const F7HomePage = () => {
	// const [ready, setReady] = useState<any>(false)

	useEffect(() => {
		f7ready((f7) => {
			// setReady(true)
			f7.setColorTheme('#ff2d55')
		})

		document
			.querySelector('.navbars.navbar-hidden')
			?.classList.remove('navbar-hidden')
	}, [])

	// const SplashScreenOverlay = () => {
	// 	if (!ready) return null

	// 	return (
	// 		<div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-black z-50">
	// 			Loading bro
	// 		</div>
	// 	)
	// }

	return (
		<>
			<App {...f7params}>
				<Views tabs>
					<View id="tab-1" main url="/" tab tabActive>
						<F7ReleasePage home={true} />
					</View>
					<View id="tab-2" tab>
						...
					</View>
				</Views>
			</App>
		</>
	)
}

export default F7HomePage
