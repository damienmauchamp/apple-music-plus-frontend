import React from 'react'
import Image from 'next/image'
import styles from './Album.module.css'
import ContentRating from '../../Elements/ContentRating/ContentRating'

interface AlbumProps extends React.HTMLAttributes<HTMLDivElement> {
	key: string
	storeId: string
	name: string
	artistName: string
	artworkUrl: string
	artworkSize?: number
	contentRating: string
}

const Album = ({
	key,
	storeId,
	name,
	artistName,
	artworkUrl,
	artworkSize,
	contentRating,
	...props
}: AlbumProps) => {
	return (
		<div className={styles.container} key={key}>
			<a
				target="_blank"
				href={`https://music.apple.com/${process.env.STOREFRONT}/album/${storeId}`}
			>
				<div className="block">
					<Image
						className={styles.artwork}
						src={artworkUrl.replace(
							'{w}x{h}',
							`${artworkSize}x${artworkSize}`
						)}
						alt={`${name} by ${artistName}`}
						width={artworkSize}
						height={artworkSize}
					></Image>
				</div>
				<div className={styles.albumDetails}>
					<div className={styles.albumNameContainer}>
						<div className={styles.albumName}>{name}</div>
						<span className={styles.albumBadge}>
							<ContentRating type={contentRating} size={11} />
						</span>
					</div>
					<div className={styles.artistName}>{artistName}</div>
				</div>
			</a>
		</div>
	)
}

export default Album
