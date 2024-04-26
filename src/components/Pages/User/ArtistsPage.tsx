import {
	BlockTitle,
	Button,
	List,
	ListIndex,
	Searchbar,
	Segmented,
	Subnavbar,
} from 'framework7-react'
import AppPage from '../../PagesType/AppPage'
import styles from './ArtistsPage.module.css'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import useAPI from '@/lib/useAPI'
import { useQuery } from 'react-query'
import { UserArtist } from '@/types/Items'
import ArtistListItem from '../../Elements/ArtistListItem/ArtistListItem'
import LoadingSection from '../../Components/Loading/LoadingSection'
import { useMusicKitContext } from '@/src/context/MusicKitContext'
import { AppleMusic } from '@/types/AppleMusic'

interface ArtistsPageProps {}

export default function ArtistPage({ ...props }: ArtistsPageProps) {
	// api
	const api = useAPI()

	// artists
	const {
		data: artists,
		refetch: refetchArtists,
		isLoading: isLoadingArtists,
	} = useQuery('userArtists', async () => await api.getUserArtists(), {
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
	})
	const [userArtists, setUserArtists] = useState<UserArtist[]>(
		artists?.data.data || []
	)

	useEffect(() => {
		if (!userArtists.length) refetchArtists()
		return () => {}
	}, [refetchArtists, userArtists])

	// searchbar
	const [searchBarEnabled, setSearchBarEnabled] = useState<boolean>(false)
	// const [searchBarClosing, setSearchBarClosing] = useState<boolean>(false)
	// const [searchList, setSearchList] = useState<string>('artists-list')

	// focus
	// blur
	const searchBarRef = useRef<{
		el: HTMLElement | null
		f7Searchbar: () => Searchbar.Searchbar
	}>(null)

	//
	const getPageElement = () => {
		return searchBarRef.current?.el?.closest('.page') as HTMLElement
		// searchBarRef.current?.
		// return document.querySelector('.page')
	}
	const searchBarEvent = (name: string) => {
		const element = getPageElement()
		document.dispatchEvent(
			new CustomEvent(name, {
				detail: {
					ref: searchBarRef.current,
					page: element,
					name: element?.dataset.name,
				},
			})
		)
	}
	const onSearchbarEnable = () => {
		setSearchBarEnabled(true)
		searchBarEvent('page-searchbar-enabled')
	}
	const onSearchbarDisable = () => {
		setSearchBarEnabled(false)
		// setSearchBarClosing(false)
		searchBarEvent('page-searchbar-disabled')
		setSearchArtists([])
	}
	const onClickDisable = () => {
		// setSearchBarClosing(true)
		searchBarEvent('page-searchbar-closing')
	}
	// const onChange = () => {
	// 	console.log('onChange')
	// }
	// const onFocus = () => {
	// 	console.log('onFocus')
	// }
	// const onBlur = () => {
	// 	console.log('onBlur')
	// }

	// region search
	const { getInstance } = useMusicKitContext()
	const [searchBarValue, setSearchBarValue] = useState<string>('')

	const {
		data: searchData,
		refetch: refetchArtistsSearch,
		isLoading: isLoadingArtistsSearch,
		isFetching: isFetchingArtistsSearch,
	} = useQuery(
		'artistSearch',
		async () =>
			await (getInstance().api as MusicKitV3.APIV3).music(
				'v1/catalog/fr/search',
				{
					term: searchBarValue,
					types: 'artists',
					limit: 25,
				}
			),
		{
			enabled: false,
			retry: 1,
			onSuccess: (res) => {
				console.log('SUCCESS res:', res)
				console.log(
					'SUCCESS setSearchArtists res:',
					res.data.results.artists.data
				)

				const data = res.data.results.artists.data.map(
					(a: AppleMusic.Artist) => ({
						...a,
						name: a.attributes.name,
						storeId: a.id,
						artworkUrl: a.attributes.artwork?.url || undefined,
					})
				)
				console.log('data setSearchArtists:', data)
				setSearchArtists(data as UserArtist[])
				// setSearchArtists(fortmatResponse(res))
			},
			onError: (err: any) => {
				setSearchArtists([])
				console.log('err', err)
				// setSearchArtists(fortmatResponse(err.response?.data || err))
			},
		}
	)
	const [searchArtists, setSearchArtists] = useState<UserArtist[]>(
		searchData?.data.data || []
	)

	useEffect(() => {
		console.log('searchBarValue', searchBarValue)
		if (searchBarValue) refetchArtistsSearch()
		else setSearchArtists([])
	}, [refetchArtistsSearch, searchBarValue])
	// endregion search

	return (
		<AppPage {...props} newNav={true}>
			{/* Search Bar */}
			<Subnavbar
				inner
				className={`custom ${styles.artistsSubnavbar}`}
				// title="Page Title"
				data-enabled={+searchBarEnabled}
			>
				<Searchbar
					ref={
						searchBarRef as MutableRefObject<{
							el: HTMLElement | null
							f7Searchbar: () => Searchbar.Searchbar
						}>
					}
					className={` ${styles.artistsSearchbar}`}
					searchItem="li"
					// searchContainer=".search-list"
					searchContainer=".artists-list"
					// searchContainer={`.${searchList}`}
					searchIn=".item-title"
					//
					onSearchbarEnable={onSearchbarEnable}
					onSearchbarDisable={onSearchbarDisable}
					onClickDisable={onClickDisable}
					onChange={(e) => {
						setSearchBarValue(e.target.value)
					}}
					// onFocus={onFocus}
					// onBlur={onBlur}
					backdrop={false}
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

			{/* {tests()} */}

			{/* Page Content */}

			{!searchBarEnabled ? (
				<>
					{/* User artists */}

					<BlockTitle>Followed</BlockTitle>
					{/* todo : list indexes */}
					{/* <ListIndex
						indexes="auto"
						listEl=".list.artists-list"
						scrollList={true}
						label={true}
						onListIndexSelect={(x) => {
							console.log('onListIndexSelect', x)
						}}
					/> */}
					<List
						insetMd
						outlineIos
						dividersIos
						className="artists-list searchbar-found"
					>
						{isLoadingArtists ? (
							<LoadingSection />
						) : (
							<ul>
								{/* <ListGroup>
          							<ListItem title="A" groupTitle />
								</ListGroup> */}
								{userArtists.map((artist: UserArtist) => (
									<ArtistListItem
										key={artist.id}
										artist={artist}
									/>
								))}
							</ul>
						)}
					</List>
				</>
			) : (
				<>
					<div className="search-content">
						{/* Segmented options */}
						<div
							className={`search-options ${styles.searchOptions}`}
						>
							<div className={styles.searchOptionsInner}>
								<Segmented strong className="w-full">
									<Button smallMd>Followed</Button>
									<Button smallMd active>
										Apple Music
									</Button>
								</Segmented>
							</div>
						</div>

						{/* Search results */}
						{/* <BlockTitle>Search results</BlockTitle> */}
						<List
							insetMd
							outlineIos
							dividersIos
							className={`search-results-list searchbar-found ${!searchArtists.length && 'hidden'}`}
						>
							{isLoadingArtistsSearch ||
							isFetchingArtistsSearch ? (
								<LoadingSection />
							) : (
								<ul>
									{searchArtists.map((artist: UserArtist) => (
										<ArtistListItem
											key={artist.id}
											artist={artist}
											mediaItem
											subtitle={'Artist'}
											swipeout={false}
										/>
									))}
								</ul>
							)}
						</List>

						{/* <Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block> */}
						{/* <Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block>
						<Block>Hello</Block> */}
					</div>
				</>
			)}

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
