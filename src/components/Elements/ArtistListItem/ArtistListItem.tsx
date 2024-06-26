import { setArtistLink, setArtworkUrl } from '@/src/helpers/api'
import { UserArtist } from '@/types/Items'
import { ListItem } from 'framework7-react'
import Image from 'next/image'
import React from 'react'
import styles from './ArtistListItem.module.css'
import { ListItemProps } from 'framework7-react/components/list-item.js'
import './ArtistListItem.css'
import { ArtistsHelper } from '@/src/helpers/helpers'
import { AppleMusic } from '@/types/AppleMusic'

interface ArtistListItemProps extends ListItemProps {
	artist: UserArtist | AppleMusic.Artist
	open?: boolean
}

const artworkSize = 128

const ArtistListItem = ({
	artist,
	className,
	open = true,
	children,
	...props
}: ArtistListItemProps) => {
	const imageProps = {
		slot: 'media',
		className: styles.artwork,
		height: artworkSize,
		width: artworkSize,
	}

	const artwork = () => {
		const artworkUrl = ArtistsHelper.getArtwork(artist)
		if (artworkUrl)
			return (
				<Image
					{...imageProps}
					src={setArtworkUrl(artworkUrl, artworkSize)}
					alt={ArtistsHelper.getName(artist)}
				/>
			)

		return (
			<svg
				viewBox="0 0 100 100"
				xmlns="http://www.w3.org/2000/svg"
				{...imageProps}
			>
				<g fill="none" fillRule="evenodd">
					<path
						fill="var(--genericJoeColor)"
						d="M0 0h100v100H0z"
						className={styles.pathGeneric}
					></path>
					<path
						fill="var(--icon)"
						d="M69.227 41.518c3.953-3.909 4.11-8.917.314-12.69-3.773-3.73-8.737-3.64-12.69.314l12.376 12.376ZM50.584 71.75a2.018 2.018 0 0 0 2.044-2.021V53.063l6.716-6.2c2.56.337 5.256-.718 7.614-3.077L54.604 31.41c-2.38 2.359-3.369 5.009-3.01 7.592L30.707 61.485c-.853.921-.988 2.202.067 3.257l-2.875 3.706c-.27.36-.292.876.113 1.28l.651.674c.382.382.899.405 1.303.09l3.706-2.897c1.01 1.055 2.313.92 3.212.067L48.54 56.881v12.848c0 1.123.898 2.021 2.044 2.021Zm-15.498-6.356-2.066-2.067 19.81-21.023c.382.651.831 1.258 1.393 1.864a9.29 9.29 0 0 0 1.752 1.437l-20.89 19.789Z"
						fillRule="nonzero"
						className={styles.pathIcon}
					></path>
				</g>
			</svg>
		)
	}

	return (
		<ListItem
			className={`${className || ''} ${styles.listItem}`}
			title={ArtistsHelper.getName(artist)}
			key={artist.id}
			swipeout
			// mediaItem
			external={open}
			target="_blank"
			link={open && setArtistLink(ArtistsHelper.getStoreId(artist))}
			{...props}
		>
			{artwork()}
			{children}
		</ListItem>
	)
}

export default ArtistListItem
