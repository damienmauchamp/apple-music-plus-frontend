import React from 'react'
import Image from 'next/image'
import styles from './Album.module.css'
import ContentRating from '../../Elements/ContentRating/ContentRating'

interface AlbumProps extends React.HTMLAttributes<HTMLDivElement> {
	key: string
	// id: number,
	storeId: string
	name: string
	artistName: string
	artists?: any[] // todo : Artist[]
	releaseDate: string
	artworkUrl: string
	artworkSize?: number
	contentRating: string
	// trackCount?: number
	// isSingle?: boolean
	// isCompilation?: boolean
	// isComplete?: boolean
	inLibrary?: boolean | null
	// upc?: string
	// api?: any
	// custom?: boolean
	// disabled?: boolean
	// created_at?: string
	// updated_at?: string
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
	// const onOverlayClick = (e, arg1, arg2, arg3 ) => {
	// 	e.preventDefault();
	// 	//do something...
	// }

	return (
		<div className={styles.container} key={key}>
			<a
				className={styles.album}
				target="_blank"
				href={`https://music.apple.com/${process.env.STOREFRONT}/album/${storeId}`}
			>
				<div className={styles.artworkContainer}>
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

					<div className={styles.artworkOverlay}></div>
					<div className={styles.artworkOverlayActions}>
						{props.inLibrary !== null ? (
							<div>{props.inLibrary ? 'OK' : '+'}</div>
						) : null}
						<div>{props.inLibrary}</div>
					</div>
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
