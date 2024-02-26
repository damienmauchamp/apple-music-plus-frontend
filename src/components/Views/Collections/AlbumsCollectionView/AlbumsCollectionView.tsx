import React from 'react'
import Image from 'next/image'
import styles from './AlbumsCollectionView.module.css'

type AlbumCollectionViewProps = {
	key: string
	items: any[]
}

const AlbumCollectionView = ({ items, ...props }: AlbumCollectionViewProps) => {
	return (
		<ul className={styles.gridScrollVerticalView}>
			{items.map((item: any) => (
				<a
					className="flex flex-col basis-auto cols-3"
					target="_blank"
					href={`https://music.apple.com/${process.env.STOREFRONT}/album/${item.storeId}`}
					key={`${props.key}-${item.storeId}`}
				>
					<div>
						<Image
							src={item.artworkUrl.replace('{w}x{h}', '300x300')}
							alt={`${item.name} by ${item.artistName}`}
							width={300}
							height={300}
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
