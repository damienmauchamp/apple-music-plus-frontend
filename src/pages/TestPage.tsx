'use client'
import {
	Page,
	f7ready,
	Navbar,
	Block,
	BlockTitle,
	Icon,
	List,
	ListItem,
} from 'framework7-react'
import { useEffect, useState } from 'react'

const data = {
	title: 'Home',
}

const TestPage = () => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		f7ready((f7) => {
			setIsLoading(false)

			console.log('HOME f7 ready', f7)

			document
				.querySelector('.navbars.navbar-hidden')
				?.classList.remove('navbar-hidden')
		})
	}, [])
	// if (isLoading) return <div>loading...</div>

	const SplashScreenOverlay = () => {
		if (!isLoading) return null

		return (
			<div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-black z-50"></div>
		)
	}

	return (
		<Page className="page-home">
			<Navbar
				title={data.title}
				backLink={''}
				large
				transparent
				sliding
			/>

			{SplashScreenOverlay()}

			<Block>PAGE !</Block>

			<BlockTitle className="searchbar-found">Components</BlockTitle>

			<List
				strong
				inset
				dividersIos
				className="components-list searchbar-found"
			>
				<ListItem link="/second/" title="Second Page">
					<Icon slot="media" icon="icon-f7" />
				</ListItem>
				<ListItem link="/second/thrid/" title="Third Page">
					<Icon slot="media" icon="icon-f7" />
				</ListItem>
			</List>
		</Page>
	)
}

export default TestPage
