import React from 'react'
import Image from 'next/image'
import styles from './Song.module.css'

interface SongProps extends React.HTMLAttributes<HTMLDivElement> {
	key: string
	storeId: string
	name: string
	albumId: string
	albumName: string
	artistId: string
	artistName: string
	artworkUrl: string
	artworkSize?: number
	durationInMillis?: number
	contentRating: string
}

function formatDuration(milliseconds: number) {
	const hours = Math.floor(milliseconds / 3600000)
	const minutes = Math.floor(milliseconds / 60000)
	const seconds = Math.floor((milliseconds % 60000) / 1000)
	const formattedHours = hours < 10 ? `0${hours}` : hours
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
	return `${hours ? `${formattedHours}:` : ''}${formattedMinutes}:${formattedSeconds}`
}

function formatDateTime(milliseconds: number) {
	const hours = Math.floor(milliseconds / 3600000)
	const minutes = Math.floor((milliseconds % 3600000) / 60000)
	const seconds = Math.floor((milliseconds % 60000) / 1000)
	const formattedHours = hours < 10 ? `0${hours}` : hours
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
	return `PT${hours ? `${formattedHours}H` : ''}${formattedMinutes}M${formattedSeconds}S`
}

const Song = ({
	key,
	storeId,
	name,
	albumId,
	albumName,
	artistId,
	artistName,
	artworkUrl,
	artworkSize,
	durationInMillis,
	contentRating,
	...props
}: SongProps) => {
	return (
		<div className={styles.container} key={key}>
			<div className={styles.artworkNameCell}>
				<div className={styles.artworkNameContainer}>
					<a
						className={styles.artworkContainer}
						// className="flex flex-col basis-auto cols-3 shrink-0"
						target="_blank"
						href={`https://music.apple.com/${process.env.STOREFRONT}/album/${albumId}?i=${storeId}`}
					>
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
					</a>

					<div className={styles.songNameContainer}>
						<div className={styles.songName}>
							{name} ({contentRating})
						</div>
						<div className={styles.songNameArtist}>
							{artistName}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.artistNameCell}>
				<div className="flex truncate">{artistName}</div>
			</div>
			<div className={styles.albumNameCell}>
				<div className="flex truncate">{albumName}</div>
			</div>
			<div className={styles.durationCell}>
				<div className={styles.durationContainer}>
					<time
						className={styles.trackDuration}
						dateTime={formatDateTime(Number(durationInMillis))}
						// data-testid="track-duration"
					>
						{durationInMillis
							? formatDuration(durationInMillis)
							: '--:--'}
					</time>

					<div className={styles.songActions}>···</div>
				</div>
			</div>
		</div>
	)
}

export default Song
