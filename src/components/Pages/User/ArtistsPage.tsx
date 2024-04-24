import { BlockTitle, List, Searchbar, Subnavbar } from 'framework7-react'
import AppPage from '../../PagesType/AppPage'
import styles from './ArtistsPage.module.css'
import { useEffect, useState } from 'react'
import useAPI from '@/lib/useAPI'
import { useQuery } from 'react-query'
import { UserArtist } from '@/types/Items'
import ArtistListItem from '../../Elements/ArtistListItem/ArtistListItem'

interface ArtistsPageProps {}

export default function ArtistPage({ ...props }: ArtistsPageProps) {
	// api
	const api = useAPI()

	// artists
	const { data, refetch } = useQuery(
		'userArtists',
		async () => await api.getUserArtists(),
		{
			enabled: false,
			retry: 1,
			onSuccess: (res) => {
				console.log('SUCCESS setUserArtists:', res.data.data)
				setUserArtists(res.data.data as UserArtist[])
				// setUserArtists(fortmatResponse(res))
			},
			onError: (err: any) => {
				setUserArtists([])
				console.log('err', err)
				// setUserArtists(fortmatResponse(err.response?.data || err))
			},
		}
	)
	const [userArtists, setUserArtists] = useState<UserArtist[]>(
		data?.data.data || []
	)

	useEffect(() => {
		if (!userArtists.length) refetch()
		return () => {}
	}, [refetch, userArtists])

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
					// searchContainer=".search-list"
					searchContainer=".artists-list"
					searchIn=".item-title"
				/>
			</Subnavbar>

			{/* Search results */}
			{/* <div slot="fixed">
				<Segmented strong>
					<Button smallMd active>
						Link 1
					</Button>
					<Button smallMd>Link 2</Button>
					<Button smallMd>Link 3</Button>
				</Segmented>
			</div> */}
			{/* <div className="search">
				<div className="search-results">
					<BlockTitle>Search results</BlockTitle>
				</div>
			</div> */}

			{/* User artists */}

			<BlockTitle>Followed</BlockTitle>
			<List
				insetMd
				outlineIos
				dividersIos
				className="artists-list searchbar-found"
			>
				<ul>
					{userArtists.map((artist: UserArtist) => (
						<ArtistListItem key={artist.id} artist={artist} />
					))}
				</ul>
			</List>

			{/* <Block>
				<Button onClick={() => fetchArtists()}>
					Fetch artists [API]
				</Button>
				<Button onClick={() => refetch()}>refetch() [Query]</Button>

				<List>
					<ListItem title={'status'}>{status}</ListItem>
					<ListItem title={'error'}>{error}</ListItem>
					<ListItem title={'isLoading'}>{Number(isLoading)}</ListItem>
					<ListItem title={'isFetching'}>
						{Number(isFetching)}
					</ListItem>
					<ListItem title={'isSuccess'}>{Number(isSuccess)}</ListItem>
					<ListItem title={'isError'}>{Number(isError)}</ListItem>
				</List>
			</Block> */}

			{/* TMP */}
			{/* <Subnavbar
				inner
				className={styles.artistsSubnavbar}
				title="Page Title"
			>
			</Subnavbar> */}
			{/* </Navbar> */}

			{/* <BlockTitle>Discover</BlockTitle>
			<List dividers dividersIos noChevron>
				<ListItem link title="All Artists" />
				<ListItem link title="All Artists" />
				<ListItem link title="All Artists" />
			</List> */}
		</AppPage>
	)
}
