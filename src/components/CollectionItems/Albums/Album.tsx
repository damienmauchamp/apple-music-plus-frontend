import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Album.module.css'
import ContentRating from '../../Elements/ContentRating/ContentRating'
import axios from 'axios'

interface AlbumProps extends React.HTMLAttributes<HTMLDivElement> {
	// identifier: string
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

// region api
const apiHeaders = {
	Accept: 'application/json',
	Authorization: `Bearer ${process.env.TEST_USER_TOKEN}`,
	'Music-Token': `${process.env.TEST_USER_MUSIC_TOKEN}`,
}

async function addResourceToLibrary(
	storeIds: string[],
	type: string = 'albums'
) {
	// todo : use MusicKit API
	return await axios.post(
		`${process.env.APP_URL}/api/applemusic/library`,
		{},
		{
			headers: apiHeaders,
			params: {
				ids: storeIds,
				type: type,
			},
		}
	)
}
// endregion api

const Album = ({
	// identifier,
	storeId,
	name,
	artistName,
	artworkUrl,
	artworkSize,
	contentRating,
	...props
}: AlbumProps) => {
	const [inLibrary, setInLibrary] = React.useState<boolean | null>(null)
	const [libraryButtonLoading, setLibraryButtonLoading] =
		React.useState(false)
	// const [libraryButtonLoadingText, setLibraryButtonLoadingText] =
	// 	React.useState('Add to library')

	const handleAddToLibrary = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()

		if (inLibrary === null) return
		if (inLibrary) {
			console.log('Album already in library')
			return
		}

		setLibraryButtonLoading(true)

		return addResourceToLibrary([storeId])
			.then((res) => {
				setLibraryButtonLoading(false)
				setInLibrary(res.data.added)
			})
			.catch((err) => {
				console.error('err', err)
			})
	}

	useEffect(() => {
		if (props.inLibrary === undefined) props.inLibrary = null
		setInLibrary(props.inLibrary)
	}, [])

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
						{inLibrary !== null ? (
							<button
								className={`${styles.overlayButton} ${styles.libraryButton} ${
									libraryButtonLoading
										? styles.libraryButtonLoading
										: ''
								}`}
								data-added={Number(inLibrary)}
								onClick={handleAddToLibrary}
							>
								{inLibrary ? 'OK' : '+'}
							</button>
						) : null}
						{/* <div>{inLibrary}</div> */}
						{/* <div>{inLibrary}</div> */}
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

export default Album
