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
		enabled: true,
		retry: 1,
		onSuccess: (res) => {
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
		if (searchBarValue) refetchArtistsSearch()
		else setSearchArtists([])
	}, [refetchArtistsSearch, searchBarValue])
	// endregion search

	// region follow
	const [followLoading, setFollowLoading] = useState<boolean>(false)
	const [followIndex, setFollowIndex] = useState<number | null>(null)
	// const [followedIndex, setFollowedIndex] = useState<number | null>(null)
	const onFollowArtist = (artist: AppleMusic.Artist) => {
		const artistIndex = searchArtists.findIndex((a) => a.id === artist.id)
		setFollowIndex(artistIndex)
		setFollowLoading(true)

		api.followArtist(artist.id)
			.then(() => {
				// setFollowedIndex(artistIndex)
				refetchArtists()
			})
			.catch(console.error)
			.finally(() => {
				setFollowIndex(null)
				setFollowLoading(false)
				// setFollowedIndex(null)
			})
	}
	// useEffect(() => {
	// 	console.log('followedIndex', followedIndex)
	// }, [followedIndex])
	// endregion follow

	// region unfollow
	const onUnfollowArtist = (artist: UserArtist) => {
		api.unfollowArtist(artist.storeId)
			.then(() => {
				// refetchArtists()
				// setUserArtists(
				// 	userArtists.filter((a) => a.storeId !== artist.storeId)
				// )
			})
			.catch(console.error)
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
												Unfollow
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
										(artist: AppleMusic.Artist, index) => {
											const following = userArtists.find(
												(a) => a.storeId === artist.id
											)

											return (
												<ArtistListItem
													key={artist.id}
													artist={artist}
													// mediaItem
													// subtitle={'Artist'}
													swipeout={false}
													open={false}
													onClick={() =>
														!following &&
														onFollowArtist(artist)
													}
													className={`
													${(following && 'following') || ''}
													${followIndex === index ? 'followIndex' : ''}
													${followIndex === index && followLoading ? 'followLoading' : ''}
												`}
													after={
														following // || followedIndex === index
															? 'Followed'
															: followIndex ===
																		index &&
																  followLoading
																? 'Following...'
																: ''
													}
												/>
											)
										}
									)}
								</ul>
							)}
						</List>
					</div>
				</>
			)}

			{/* <BlockTitle>Discover</BlockTitle>
			<List dividers dividersIos noChevron>
				<ListItem link title="All Artists" />
				<ListItem link title="All Artists" />
				<ListItem link title="All Artists" />
			</List> */}
		</AppPage>
	)
}
