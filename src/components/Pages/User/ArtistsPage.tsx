import {
	Block,
	BlockTitle,
	List,
	ListItem,
	Searchbar,
	Subnavbar,
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

			{/* <Subnavbar
				inner
				className={styles.artistsSubnavbar}
				title="Page Title"
			>
				<Segmented strong>
					<Button smallMd active>
						Link 1
					</Button>
					<Button smallMd>Link 2</Button>
					<Button smallMd>Link 3</Button>
				</Segmented>
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

			<List
				strongIos
				outlineIos
				dividersIos
				className="search-list searchbar-found"
			>
				<ListItem title="Acura" />
				<ListItem title="Audi" />
				<ListItem title="BMW" />
				<ListItem title="Cadillac" />
			</List>

			{/* TMP */}
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
