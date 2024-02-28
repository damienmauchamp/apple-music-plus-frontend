import React from 'react'
import Image from 'next/image'
import styles from './SongsCollectionView.module.css'
import Song from '@/src/components/CollectionItems/Songs/Songs/Song'

export interface SongsCollectionViewProps {
	key: string
	items: any[]
	scroll?: boolean
	rows?: number
	// mobileScroll?: boolean
}

const SongsCollectionView = ({
	items,
	scroll,
	rows,
	// mobileScroll,
	...props
}: SongsCollectionViewProps) => {
	// todo : property & global parameter
	const artworkSize = 50

	if (!rows) rows = 4
	let classNames = ''
	if (rows) {
		classNames += ` !grid-rows-${rows}`
	}

	return (
		<ul
			className={`
			${styles.SongsCollectionView}
			${scroll ? styles.gridScrollable : ''}
			${classNames}
		`}
			data-scroll={Number(scroll)}
		>
			{items.map((item: any) => (
				<Song
					key={`${props.key}-${item.storeId}`}
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
					wrap={scroll}
				/>
			))}
		</ul>
	)
}

export default SongsCollectionView
