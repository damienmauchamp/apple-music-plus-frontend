import {
	BlockTitle,
	Button,
	List,
	Searchbar,
	Segmented,
	Subnavbar,
	SwipeoutActions,
	SwipeoutButton,
} from 'framework7-react'
import AppPage from '../../PagesType/AppPage'
import styles from './ArtistsPage.module.css'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import useAPI from '@/lib/useAPI'
import { useQuery } from 'react-query'
import { UserArtist } from '@/types/Items'
import ArtistListItem from '../../Elements/ArtistListItem/ArtistListItem'
import LoadingSection from '../../Components/Loading/LoadingSection'
import { AppleMusic } from '@/types/AppleMusic'

// todo : export in another file
type F7SearchBarType = {
	el: HTMLElement | null
	f7Searchbar: () => Searchbar.Searchbar
}

interface ArtistsPageProps {}

export default function ArtistPage({ ...props }: ArtistsPageProps) {
	// api
	const api = useAPI()

	// region users artists
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
	// endregion users artists

	// region searchbar
	const searchBarRef = useRef<F7SearchBarType>(null)

	const [searchBarValue, setSearchBarValue] = useState<string>('')
	const [searchBarEnabled, setSearchBarEnabled] = useState<boolean>(false)
	// const [searchBarClosing, setSearchBarClosing] = useState<boolean>(false)

	const getPageElement = () =>
		searchBarRef.current?.el?.closest('.page') as HTMLElement
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
	// region search

	// endregion searchbar
	const {
		data: searchData,
		refetch: refetchArtistsSearch,
		isLoading: isLoadingArtistsSearch,
		isFetching: isFetchingArtistsSearch,
	} = useQuery(
		'artistSearch',
		async () => await api.searchCatalogArtists(searchBarValue),
		{
			enabled: false,
			retry: 1,
			onSuccess: (data) => {
				setSearchArtists(data as AppleMusic.Artist[])
				// setSearchArtists(fortmatResponse(res))
			},
			onError: (err: any) => {
				setSearchArtists([])
				console.log('err', err)
				// setSearchArtists(fortmatResponse(err.response?.data || err))
			},
		}
	)
	const [searchArtists, setSearchArtists] = useState<AppleMusic.Artist[]>(
		searchData || []
	)

	useEffect(() => {
		console.log('searchBarValue', searchBarValue)
		if (searchBarValue) refetchArtistsSearch()
		else setSearchArtists([])
	}, [refetchArtistsSearch, searchBarValue])
	// endregion search

	// region follow
	// endregion follow

	// region unfollow
	const onUnfollowArtist = (artist: UserArtist) => {
		console.log('onUnfollowArtist', artist)
	}
	// endregion unfollow

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
					ref={searchBarRef as MutableRefObject<F7SearchBarType>}
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
					clearButton
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
										onSwipeoutDelete={() =>
											onUnfollowArtist(artist)
										}
									>
										{/* swipeout */}
										<SwipeoutActions right>
											<SwipeoutButton
												delete
												confirmText="Are you sure you want to unfollow this artist?"
											>
												Confirm
											</SwipeoutButton>
											{/* 
											<SwipeoutButton delete>
												Delete
											</SwipeoutButton> */}
										</SwipeoutActions>
									</ArtistListItem>
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
									{searchArtists.map(
										(artist: AppleMusic.Artist) => (
											<ArtistListItem
												key={artist.id}
												artist={artist}
												mediaItem
												subtitle={'Artist'}
												swipeout={false}
											/>
										)
									)}
								</ul>
							)}
						</List>
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
