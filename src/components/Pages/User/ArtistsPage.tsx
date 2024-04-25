import {
	BlockTitle,
	List,
	ListItem,
	Searchbar,
	Subnavbar,
} from 'framework7-react'
import AppPage from '../../PagesType/AppPage'
import styles from './ArtistsPage.module.css'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
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

	// searchbar
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
	const onSearchbarEnable = () => {
		const element = getPageElement()
		console.log('enable', {
			ref: searchBarRef.current,
			page: element,
			name: element?.dataset.name,
		})
		document.dispatchEvent(
			new CustomEvent('page-searchbar-enabled', {
				detail: {
					ref: searchBarRef.current,
					page: element,
					name: element?.dataset.name,
				},
			})
		)
		// return getPageElement()?.classList.add(
		// 	'with-appstore-searchbar-enabled'
		// )
	}
	const onSearchbarDisable = () => {
		const element = getPageElement()
		console.log('disable', {
			ref: searchBarRef.current,
			page: element,
			name: element?.dataset.name,
		})
		document.dispatchEvent(
			new CustomEvent('page-searchbar-disabled', {
				detail: {
					ref: searchBarRef.current,
					page: element,
					name: element?.dataset.name,
				},
			})
		)
		// return getPageElement()?.classList.remove(
		// 	'with-appstore-searchbar-enabled'
		// )
	}
	const onChange = () => {
		console.log('onChange')
	}
	const onFocus = () => {
		console.log('onFocus')
	}
	const onBlur = () => {
		console.log('onBlur')
	}

	useEffect(() => {
		console.log('searchBarRef', searchBarRef.current)
	}, [searchBarRef])

	// todo : with-appstore-searchbar-closing

	return (
		<AppPage {...props} newNav={true}>
			{/* Search Bar */}
			<Subnavbar
				inner
				className={styles.artistsSubnavbar}
				// title="Page Title"
			>
				<Searchbar
					ref={
						searchBarRef as MutableRefObject<{
							el: HTMLElement | null
							f7Searchbar: () => Searchbar.Searchbar
						}>
					}
					className={styles.artistsSearchbar}
					searchItem="li"
					// searchContainer=".search-list"
					searchContainer=".artists-list"
					// searchContainer={`.${searchList}`}
					searchIn=".item-title"
					//
					onSearchbarEnable={onSearchbarEnable}
					onSearchbarDisable={onSearchbarDisable}
					onChange={onChange}
					onFocus={onFocus}
					onBlur={onBlur}
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

			{/* Test list */}
			<BlockTitle>Tests</BlockTitle>
			{/* <Button
				onClick={() => {
					if (searchList === 'artists-list')
						setSearchList('search-list')
					else setSearchList('artists-list')
				}}
			>
				Toggle search list : {searchList}
			</Button> */}
			<List
				// strong
				insetMd
				outlineIos
				dividersIos
				className="search-list searchbar-found"
				// bgColor="transparent"
			>
				{['AAA Ivan Petrov', 'Acura', 'Audi', 'BMW', 'Cadillac'].map(
					(title) => (
						<ListItem
							title={title}
							key={title}
							// swipeout
							// mediaItem
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
						</ListItem>
					)
				)}
			</List>

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
