import React from 'react'
import styles from './AlbumsCollectionView.module.css'
import Album from '@/src/components/CollectionItems/Albums/Album'
import { Album as AlbumType } from '@/types/Items/Items'

export type AlbumCollectionViewProps = {
	id: string
	items: AlbumType[]
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
			{items.map((item: AlbumType) => (
				<Album
					{...item}
					key={`${props.id}-${item.storeId}`}
					// identifier={`${props.id}-${item.storeId}`}
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

export default AlbumCollectionView
