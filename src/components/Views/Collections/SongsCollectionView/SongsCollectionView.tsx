import React from 'react'
import Image from 'next/image'
import styles from './SongsCollectionView.module.css'

type SongsCollectionViewProps = {
	key: string
	items: any[]
}

const SongsCollectionView = ({ items, ...props }: SongsCollectionViewProps) => {
	return (
		<ul className={styles.SongsCollectionView}>
			{items.map((item: any) => (
				<div
					className="flex flex-row"
					key={`${props.key}-${item.storeId}`}
				>
					<a
						className="flex flex-col basis-auto cols-3"
						target="_blank"
						href={`https://music.apple.com/${process.env.STOREFRONT}/album/${item.albumId}?i=${item.storeId}`}
					>
						<Image
							src={item.artworkUrl.replace('{w}x{h}', '100x100')}
							alt={`${item.name} by ${item.artistName}`}
							width={100}
							height={100}
						></Image>
					</a>
					<div>{item.name}</div>
					<div>{item.artistName}</div>
					<div>{item.albumName}</div>
					<div>{item.durationInMillis}</div>
					<div>{item.contentRating}</div>
				</div>
			))}
		</ul>
	)
}

export default SongsCollectionView
