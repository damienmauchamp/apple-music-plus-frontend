import React from 'react'
import Image from 'next/image'
import styles from './Album.module.css'

interface AlbumProps extends React.HTMLAttributes<HTMLDivElement> {
	key: string
	storeId: string
	name: string
	artistName: string
	artworkUrl: string
	artworkSize?: number
}

const Album = ({
	key,
	storeId,
	name,
	artistName,
	artworkUrl,
	artworkSize,
	...props
}: AlbumProps) => {
	return (
		<a
			// className="flex flex-col basis-auto group col-span-1"
			// className="basis-auto cols-3"
			// className="flex flex-col basis-auto snap-start px-4 -mx-4"
			// className="list-item snap-start px-4 -mx-4"
			className={styles.container}
			target="_blank"
			href={`https://music.apple.com/${process.env.STOREFRONT}/album/${storeId}`}
			key={key}
		>
			<div className="block">
				<Image
					src={artworkUrl.replace(
						'{w}x{h}',
						`${artworkSize}x${artworkSize}`
					)}
					alt={`${name} by ${artistName}`}
					width={artworkSize}
					height={artworkSize}
				></Image>
			</div>
			<div className="flex flex-col">
				<div>{name}</div>
				<div>{artistName}</div>
			</div>
		</a>
	)
}

export default Album
