'use client'
import {
	Block,
	Icon,
	Link,
	List,
	ListItem,
	Navbar,
	Page,
	f7ready,
} from 'framework7-react'
import { useEffect, useState } from 'react'

const data = {
	title: 'Third page',
	backLink: 'Home',
}

const ThirdPage = ({ f7router }) => {
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		f7ready((f7) => {
			setIsLoading(false)
			console.log('THIRD f7 ready', f7)
		})
	}, [])
	// if (isLoading) return <div>loading...</div>

	return (
		<Page className="page-second">
			<Navbar
				title={data.title}
				backLink={data.backLink}
				large
				transparent
				sliding
			/>

			{isLoading ? (
				<div>loading...</div>
			) : (
				<>
					<Block>THIRD PAGE !</Block>
					<Block>
						<List
							strong
							inset
							dividersIos
							className="components-list searchbar-found"
						>
							<ListItem link="/second/" title="Second Page">
								<Icon slot="media" icon="icon-f7" />
							</ListItem>

							<Link onClick={() => f7router.navigate('/')}>
								First
							</Link>
							<Link onClick={() => f7router.back()}>Back</Link>
						</List>
					</Block>

					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
					<Block>THIRD PAGE !</Block>
				</>
			)}
		</Page>
	)
}

export default ThirdPage
