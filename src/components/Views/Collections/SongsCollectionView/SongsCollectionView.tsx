import React from 'react'
import Image from 'next/image'
import styles from './SongsCollectionView.module.css'
import Song from '@/src/components/CollectionItems/Songs/Songs/Song'

export interface SongsCollectionViewProps {
	key: string
	items: any[]
}

const SongsCollectionView = ({ items, ...props }: SongsCollectionViewProps) => {
	// todo : property & global parameter
	const artworkSize = 50

	return (
		<div className={styles.SongsCollectionView}>
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
				/>
			))}
		</div>
	)
}

export default SongsCollectionView
