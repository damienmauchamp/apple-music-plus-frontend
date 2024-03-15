import React from 'react'
import Section, { SectionProps } from '../../Section/Section'
import AlbumsCollectionView, {
	AlbumCollectionViewProps,
} from '../../Views/Collections/AlbumsCollectionView/AlbumsCollectionView'
import { Album } from '@/types/Items'

interface AlbumsGridSectionProps
	extends SectionProps,
		AlbumCollectionViewProps {
	// key: string
	items: Album[]
}

const AlbumsGridSection = ({
	id,
	title,
	seeAll,
	seeAllPath,
	...props
}: AlbumsGridSectionProps) => {
	if (!props.items.length) {
		return null
	}

	return (
		<>
			<Section
				id={id}
				title={title}
				style={!props.items.length ? { display: 'none' } : {}}
				// todo : see all => send data & type, server component
				seeAll={seeAll}
				seeAllPath={seeAllPath}
			>
				<AlbumsCollectionView id={id} {...props} />
			</Section>
		</>
	)
}

export default AlbumsGridSection
export type { AlbumsGridSectionProps }
