import React from 'react'
import Section, { SectionProps } from '../../Section/Section'
import AlbumsCollectionView, {
	AlbumCollectionViewProps,
} from '../../Views/Collections/AlbumsCollectionView/AlbumsCollectionView'
import { Album, SectionCollectionProps } from '@/types/Items'
import Loading from '../../Components/Loading/Loading'

export interface AlbumsSectionProps
	extends SectionProps,
		AlbumCollectionViewProps,
		SectionCollectionProps {
	// key: string
	items: Album[]

	grid?: boolean
}

const AlbumsSection = ({
	id,
	title,
	seeAll,
	seeAllPath,
	grid = false,
	loading = false,
	newNav,
	...props
}: AlbumsSectionProps) => {
	if (!loading && !props.items.length) {
		return null
	}

	const collectionViewProps = () => {
		if (!grid) return { ...props }

		return { ...props, grid: grid, mobileScroll: false }
	}

	return (
		<>
			<Section
				id={id}
				title={title}
				// todo : see all
				seeAll={seeAll}
				seeAllPath={seeAllPath}
				newNav={newNav}
			>
				{loading ? (
					<div className="w-full h-40">
						<Loading subText={`${title || 'Page'} loading...`} />
					</div>
				) : (
					<AlbumsCollectionView id={id} {...collectionViewProps()} />
				)}
			</Section>
		</>
	)
}

export default AlbumsSection
