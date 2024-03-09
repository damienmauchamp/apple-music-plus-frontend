import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from './Album.module.css'
import ContentRating from '../../Elements/ContentRating/ContentRating'
import { Album } from '@/types/Items/Items'
import useAPI from '@/lib/useAPI'

interface AlbumProps extends React.HTMLAttributes<HTMLDivElement>, Album {}

const AlbumComponent = ({
	// identifier,
	storeId,
	name,
	artistName,
	artworkUrl,
	artworkSize,
	contentRating,
	inLibrary,
}: AlbumProps) => {
	const [albumInLibrary, setAlbumInLibrary] = React.useState<boolean | null>(
		null
	)
	const [libraryButtonLoading, setLibraryButtonLoading] =
		React.useState(false)
	// const [libraryButtonLoadingText, setLibraryButtonLoadingText] =
	// 	React.useState('Add to library')

	const api = useAPI()

	const handleAddToLibrary = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()

		if (albumInLibrary === null) return
		if (albumInLibrary) {
			console.log('Album already in library')
			return
		}

		setLibraryButtonLoading(true)

		return api
			.addResourceToLibrary([storeId])
			.then((res) => {
				setLibraryButtonLoading(false)
				setAlbumInLibrary(res.data.added)
			})
			.catch((err) => {
				console.error('err', err)
			})
	}

	useEffect(() => {
		setAlbumInLibrary(inLibrary === undefined ? null : inLibrary)
	}, [setAlbumInLibrary, inLibrary])

	return (
		<div
			className={styles.container}
			// key={identifier}
		>
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
						{albumInLibrary !== null ? (
							<button
								className={`${styles.overlayButton} ${styles.libraryButton} ${
									libraryButtonLoading
										? styles.libraryButtonLoading
										: ''
								}`}
								data-added={Number(albumInLibrary)}
								onClick={handleAddToLibrary}
							>
								{albumInLibrary ? 'OK' : '+'}
							</button>
						) : null}
						{/* <div>{albumInLibrary}</div> */}
						{/* <div>{albumInLibrary}</div> */}
						<button
							className={`${styles.overlayButton}`}
							onClick={(
								e: React.MouseEvent<
									HTMLButtonElement,
									MouseEvent
								>
							) => {
								e.preventDefault()
							}}
						>
							...
						</button>
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

export default AlbumComponent
