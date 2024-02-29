import React from 'react'
import Image from 'next/image'
import styles from './AlbumsCollectionView.module.css'
import { clearLine } from 'readline'
import Album from '@/src/components/CollectionItems/Albums/Album'

export type AlbumCollectionViewProps = {
	key: string
	items: any[]
	scroll?: boolean
	rows?: number
	mobileScroll?: boolean
}

const AlbumCollectionView = ({
	items,
	scroll,
	rows,
	mobileScroll,
	...props
}: AlbumCollectionViewProps) => {
	// todo : property & global parameter
	const artworkSize = 316

	let classNames = ''
	if (rows) {
		if (items.length < 8) {
			rows = 1
		}

		classNames += ` !grid-rows-${rows}`
	}

	return (
		<ul
			className={`${styles.gridSection} 
			${scroll ? styles.gridScrollable : styles.gridNotScrollable} 
			${mobileScroll ? styles.gridMobileScrollable : ''}
			${classNames}
			`}
		>
			{items.map((item: any) => (
				<Album
					{...item}
					key={`${props.key}-${item.storeId}`}
					storeId={item.storeId}
					name={item.name}
					artistName={item.artistName}
					artworkUrl={item.artworkUrl}
					artworkSize={artworkSize}
					contentRating={item.contentRating}
					releaseDate={item.releaseDate}
				/>
			))}
		</ul>
	)
}

AlbumCollectionView.defaultProps = {
	mobileScroll: true,
}

export default AlbumCollectionView
