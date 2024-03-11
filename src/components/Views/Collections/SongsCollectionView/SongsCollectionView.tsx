import React from 'react'
import styles from './SongsCollectionView.module.css'
import Song from '@/src/components/CollectionItems/Songs/Songs/Song'
import { Song as SongType } from '@/types/Items'

export interface SongsCollectionViewProps {
	id: string
	items: SongType[]
	scroll?: boolean
	rows?: number
	header?: boolean
	// mobileScroll?: boolean
}

const artworkSize = 50

const useOutsideClick = (
	ref: React.MutableRefObject<any>,
	callback: () => void
) => {
	React.useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback()
			}
		}

		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [ref, callback])
	return ref
}

const SongsCollectionView = ({
	items,
	scroll,
	rows,
	// mobileScroll,
	...props
}: SongsCollectionViewProps) => {
	// default props
	if (scroll === undefined) scroll = false
	if (props.header === undefined) props.header = true
	let classNames = ''

	// highlight songs
	const [active, setActive] = React.useState<number | null>(null)
	const ref = React.useRef()
	const listRef = useOutsideClick(ref, () => {
		// On click outside
		setActive(null)
	})

	// rows
	const getRows = () => rows || 4
	if (!rows) rows = getRows()
	if (rows) {
		classNames += ` !grid-rows-${rows}`
	}

	// list header
	const header = () => {
		if (scroll) return null

		return (
			<div
				className={`${styles.header} ${props.header ? '' : styles.headerHidden}`}
			>
				<div className={styles.artworkName}>
					<div className={styles.headerCol}>Morceau</div>
				</div>
				<div className={styles.artistName}>
					<div className={styles.headerCol}>Artiste</div>
				</div>
				<div className={styles.albumName}>
					<div className={styles.headerCol}>Album</div>
				</div>
				<div className={styles.duration}>
					<div className={styles.headerCol}>Durée</div>
				</div>
			</div>
		)
	}

	return (
		<ul
			ref={listRef}
			className={`
			${styles.SongsCollectionView}
			${scroll ? styles.gridScrollable : styles.list}
			${classNames}
		`}
			data-scroll={Number(scroll)}
		>
			{header()}
			{items.map((item: SongType, index: number) => (
				<Song
					{...item}
					key={`${props.id}-${item.storeId}`}
					selected={index === active}
					onClick={() => setActive(index)}
					// identifier={`${props.id}-${item.storeId}`}
					storeId={item.storeId}
					name={item.name}
					albumId={item.albumId}
					albumName={item.albumName}
					artistId={item.artistId}
					artistName={item.artistName}
					artists={item.artists}
					artworkUrl={item.artworkUrl}
					artworkSize={artworkSize}
					durationInMillis={item.durationInMillis}
					contentRating={item.contentRating}
					releaseDate={item.releaseDate}
					wrap={scroll}
					last={index >= items.length - getRows()}
				/>
			))}
		</ul>
	)
}

export default SongsCollectionView
