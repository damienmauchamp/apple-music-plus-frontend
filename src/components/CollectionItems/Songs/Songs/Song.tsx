import React from 'react'
import Image from 'next/image'
import styles from './Song.module.css'
import ContentRating from '@/src/components/Elements/ContentRating/ContentRating'

interface SongProps extends React.HTMLAttributes<HTMLDivElement> {
	key: string
	storeId: string
	name: string
	albumId: string
	albumName: string
	artists: any[] // todo : Artist[]
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
	artists,
	artistId,
	artistName,
	artworkUrl,
	artworkSize,
	durationInMillis,
	contentRating,
	...props
}: SongProps) => {
	const duration = durationInMillis
		? formatDuration(durationInMillis)
		: '--:--'

	let artistsNames = artistName
	artists.forEach((artist: any) => {
		artistsNames = artistsNames.replace(
			artist.name,
			`<a target="_blank" href="https://music.apple.com/${process.env.STOREFRONT}/artist/${artist.storeId}">${artist.name}</a>`
		)
	})

	let albumLink = `https://music.apple.com/${process.env.STOREFRONT}/album/${albumId}`
	let songLink = `${albumLink}?i=${storeId}`

	return (
		<div className={styles.container} key={key}>
			<div className={styles.artworkNameCell}>
				<div className={styles.artworkNameContainer}>
					<a
						className={styles.artworkContainer}
						// className="flex flex-col basis-auto cols-3 shrink-0"
						target="_blank"
						href={songLink}
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
						<div className="flex items-center">
							<div className={styles.songName}>{name}</div>
							<span className={styles.songBadge}>
								<ContentRating type={contentRating} />
							</span>
						</div>
						<div
							className={styles.songNameArtist}
							dangerouslySetInnerHTML={{ __html: artistsNames }}
						/>
					</div>
				</div>
			</div>
			<div className={styles.artistNameCell}>
				<div
					className={styles.artistName}
					dangerouslySetInnerHTML={{ __html: artistsNames }}
				/>
			</div>
			<div className={styles.albumNameCell}>
				<div className={styles.albumName}>{albumName}</div>
			</div>
			<div className={styles.durationCell}>
				<div className={styles.durationContainer}>
					<time
						className={styles.trackDuration}
						dateTime={formatDateTime(Number(durationInMillis))}
					>
						{duration}
					</time>

					<div className={styles.songActions}>···</div>
				</div>
			</div>
		</div>
	)
}

export default Song
