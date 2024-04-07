import React from 'react'
import Section, { SectionProps } from '../../Section/Section'
import AlbumsCollectionView, {
	AlbumCollectionViewProps,
} from '../../Views/Collections/AlbumsCollectionView/AlbumsCollectionView'
import { Album, SectionCollectionProps } from '@/types/Items'
import LoadingSection from '../../Components/Loading/LoadingSection'

export interface AlbumsSectionProps
	extends SectionProps,
		AlbumCollectionViewProps,
		SectionCollectionProps {
	// key: string
	items: Album[]

	grid?: boolean
	full?: boolean
}

const AlbumsSection = ({
	id,
	title,
	seeAll,
	seeAllPath,
	grid = false,
	loading = false,
	newNav,
	full,
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
					<LoadingSection full={full} />
				) : (
					<AlbumsCollectionView id={id} {...collectionViewProps()} />
				)}
			</Section>
		</>
	)
}

export default AlbumsSection
