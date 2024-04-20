import {
	Block,
	BlockTitle,
	Button,
	List,
	ListItem,
	Searchbar,
	Segmented,
	Subnavbar,
	SwipeoutActions,
	SwipeoutButton,
} from 'framework7-react'
import AppPage from '../../PagesType/AppPage'
import styles from './ArtistsPage.module.css'
import { useEffect } from 'react'

interface ArtistsPageProps {}

export default function ArtistPage({ ...props }: ArtistsPageProps) {
	useEffect(() => {
		return () => {}
	}, [])

	return (
		<AppPage {...props} newNav={true}>
			{/* Search Bar */}
			<Subnavbar
				inner
				className={styles.artistsSubnavbar}
				// title="Page Title"
			>
				<Searchbar
					className={styles.artistsSearchbar}
					searchItem="li"
					searchContainer=".search-list"
					searchIn=".item-title"
				/>
			</Subnavbar>

			<div className="">
				<BlockTitle>Search results</BlockTitle>
				<Segmented strong>
					<Button smallMd active>
						Link 1
					</Button>
					<Button smallMd>Link 2</Button>
					<Button smallMd>Link 3</Button>
				</Segmented>

				<List
					// strong
					insetMd
					outlineIos
					dividersIos
					className="search-list searchbar-found"
					// bgColor="transparent"
				>
					{[
						'AAA Ivan Petrov',
						'Acura',
						'Audi',
						'BMW',
						'Cadillac',
					].map((title) => (
						<ListItem
							title={title}
							key={title}
							swipeout
							// link="#"
							after="Add / Added"
							// bgColor="transparent"
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								slot="media"
								style={{ borderRadius: '100%' }}
								src="/android-chrome-192x192.png"
								alt="cul"
								width="44"
							/>

							<SwipeoutActions right>
								<SwipeoutButton
									onClick={() => {
										console.log('MORE')
									}}
								>
									More
								</SwipeoutButton>
								<SwipeoutButton
									delete
									confirmText="Are you sure you want to delete this item?"
								>
									Confirm
								</SwipeoutButton>

								<SwipeoutButton delete>Delete</SwipeoutButton>
							</SwipeoutActions>
						</ListItem>
					))}
					<ListItem title="Coucou" />
				</List>
			</div>

			{/* TMP */}
			{/* <Subnavbar
				inner
				className={styles.artistsSubnavbar}
				title="Page Title"
			>
			</Subnavbar> */}
			{/* </Navbar> */}

			<BlockTitle>Discover</BlockTitle>
			<List dividers dividersIos noChevron>
				<ListItem link title="All Artists" />
				<ListItem link title="All Artists" />
				<ListItem link title="All Artists" />
			</List>

			{/* List */}

			<Block>-</Block>

			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
			<Block>Nothing here yet</Block>
		</AppPage>
	)
}
