import React from 'react'
import Image from 'next/image'
import styles from './AlbumsCollectionView.module.css'

type AlbumCollectionViewProps = {
	key: string
	items: any[]
}

const AlbumCollectionView = ({ items, ...props }: AlbumCollectionViewProps) => {
	const size = 316
	return (
		<ul className={styles.gridScrollVerticalView}>
			{items.map((item: any) => (
				<a
					// className="flex flex-col basis-auto group col-span-1"
					// className="basis-auto cols-3"
					// className="flex flex-col basis-auto snap-start px-4 -mx-4"
					// className="list-item snap-start px-4 -mx-4"
					className={styles.tmpAlbums}
					target="_blank"
					href={`https://music.apple.com/${process.env.STOREFRONT}/album/${item.storeId}`}
					key={`${props.key}-${item.storeId}`}
				>
					<div className="block">
						<Image
							src={item.artworkUrl.replace(
								'{w}x{h}',
								`${size}x${size}`
							)}
							alt={`${item.name} by ${item.artistName}`}
							width={size}
							height={size}
						></Image>
					</div>
					<div className="flex flex-col">
						<div>{item.name}</div>
						<div>{item.artistName}</div>
					</div>
				</a>
			))}
		</ul>
	)
}

export default AlbumCollectionView
