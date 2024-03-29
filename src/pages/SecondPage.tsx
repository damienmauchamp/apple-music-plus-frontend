'use client'
import useAuth from '@/lib/useAuth'
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
import { useMusicKitContext } from '../context/MusicKitContext'

const data = {
	title: 'Second page',
	backLink: 'Home',
}

const SecondPage = ({ f7router }) => {
	const [f7IsLoading, setF7IsLoading] = useState(true)
	useEffect(() => {
		f7ready((f7) => {
			setF7IsLoading(false)
			console.log('SECOND f7 ready', f7)
		})
	}, [])
	// if (isLoading) return <div>loading...</div>

	// region auth
	// Hooks
	const { logged } = useMusicKitContext()

	// Auth hook
	const { user, isLoading, hasTestToken } = useAuth({
		middleware: 'auth',
	}) // todo : redirect to previous page after login
	// endregion auth

	return (
		<Page className="page-second">
			<Navbar
				title={data.title}
				backLink={data.backLink}
				large
				transparent
				sliding
			/>

			{isLoading || f7IsLoading || !user ? (
				<div>loading...</div>
			) : (
				<>
					<Block>SECOND PAGE !</Block>

					<List
						strong
						inset
						dividersIos
						className="components-list searchbar-found"
					>
						<ListItem link="/second/thrid/" title="Third Page">
							<Icon slot="media" icon="icon-f7" />
						</ListItem>

						<Link onClick={() => f7router.navigate('/')}>
							First
						</Link>
						<Link onClick={() => f7router.back()}>Back</Link>
					</List>

					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
					<Block>SECOND PAGE !</Block>
				</>
			)}
		</Page>
	)
}

export default SecondPage
