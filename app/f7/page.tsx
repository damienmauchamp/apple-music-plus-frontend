'use client'

//
import Framework7 from 'framework7/lite'
import Framework7React, { Views, f7ready } from 'framework7-react'
Framework7.use(Framework7React)

// routes
import routes from '@/src/routes'

//
const f7params = {
	// Array with app routes
	routes: routes,
	name: 'My App',
	// theme: 'auto',
	theme: 'ios',
	// store: store,
	popup: { closeOnEscape: true },
	sheet: { closeOnEscape: true },
	popover: { closeOnEscape: true },
	actions: { closeOnEscape: true },
}

import { App, View } from 'framework7-react'

import 'framework7/css/bundle'
import { useEffect, useState } from 'react'

const Layout = (
	{
		// children,
	}: Readonly<{
		children: React.ReactNode
	}>
) => {
	const [ready, setReady] = useState<any>(false)
	const [browserHistory, setBrowserHistory] = useState<any>(false)

	useEffect(() => {
		f7ready((f7) => {
			console.log('F7 READY:', f7)
			console.log('F7 ready:', ready)
			console.log('F7 browserHistory:', browserHistory)
			// console.log('F7.history:', f7.history)
			setReady(true)
			setBrowserHistory(true)
			// f7.dialog.alert('Component mounted')
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// if (!ready) return null
	// const BasicLayout = () => (
	// 	<>
	// 		{/* Your main view, should have "main" prop */}
	// 		<View main>
	// 			{/*  Initial Page */}
	// 			<Page>
	// 				{/* Top Navbar */}
	// 				<Navbar title="Awesome App"></Navbar>
	// 				{/* Toolbar */}
	// 				<Toolbar bottom>
	// 					<Link>Link 1</Link>
	// 					<Link>Link 2</Link>
	// 				</Toolbar>
	// 				{/* Page Content */}
	// 				{children}
	// 				<Link href="/about/">About App</Link>
	// 			</Page>
	// 		</View>
	// 	</>
	// )

	// const AdvandedLayout = () => (
	// 	<>
	// 		{/* Left Panel with "cover" effect */}
	// 		<Panel left cover>
	// 			<View>
	// 				<Page>
	// 					<Navbar title="Left Panel"></Navbar>
	// 					<Block>
	// 						<p>Here comes the left panel text</p>
	// 					</Block>
	// 				</Page>
	// 			</View>
	// 		</Panel>

	// 		{/* Right Panel with "reveal" effect */}
	// 		<Panel right reveal>
	// 			<View>
	// 				<Page>
	// 					<Navbar title="Right Panel"></Navbar>
	// 					<Block>
	// 						<p>Here comes the right panel text</p>
	// 					</Block>
	// 				</Page>
	// 			</View>
	// 		</Panel>

	// 		{/*  Main view */}
	// 		<View main>
	// 			<Page>
	// 				<Navbar title="Awesome App"></Navbar>
	// 				{/* Page content */}
	// 				<Block>
	// 					<p>Here comes main view page text</p>
	// 				</Block>
	// 				{/* Buttons to open panels */}
	// 				<Block className="grid grid-cols-2 grid-gap">
	// 					<Button panelOpen="left">Left Panel</Button>
	// 					<Button panelOpen="right">Right Panel</Button>
	// 				</Block>
	// 				{/* Button to open popup */}
	// 				<Button popupOpen="#my-popup">Open Popup</Button>
	// 			</Page>
	// 		</View>

	// 		{/* Popup. All modals should be outside of Views */}
	// 		<Popup id="my-popup">
	// 			<View>
	// 				<Page>
	// 					<Navbar title="Popup">
	// 						{/* Link to close popup */}
	// 						<NavRight>
	// 							<Link popupClose>Close</Link>
	// 						</NavRight>
	// 					</Navbar>
	// 					<Block>
	// 						<p>Here comes popup text</p>
	// 					</Block>
	// 				</Page>
	// 			</View>
	// 		</Popup>
	// 	</>
	// )

	// const needsBrowserHistory = false

	// const [isLoading, setIsLoading] = useState(true)
	// useEffect(() => {
	// 	f7ready((f7) => {
	// 		setIsLoading(false)
	// 		console.log('f7 ready', f7)
	// 		// f7.dialog.alert('Component mounted')
	// 	})
	// }, [])

	// if (isLoading) return <div>loading...</div>

	return (
		<>
			{/* Main Framework7 App component where we pass Framework7 params */}
			{/* <App {...f7params}>{true ? AdvandedLayout() : BasicLayout()}</App> */}
			<App {...f7params}>
				{/* <View
					main
					url="/"
					// data-browserHistory={browserHistory}
					className="safe-areas"
					browserHistory={browserHistory}
					browserHistoryRoot={''}
					preloadPreviousPage={!browserHistory}
					iosSwipeBack={!browserHistory}
				/> */}

				<Views tabs>
					<View id="tab-1" main url="/" tab tabActive>
						...
					</View>
					<View id="tab-2" tab>
						...
					</View>
				</Views>
			</App>
		</>
	)
}

export default Layout
