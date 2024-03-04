import React from 'react'
import Section, { SectionProps } from '../../Section/Section'
import AlbumsCollectionView, {
	AlbumCollectionViewProps,
} from '../../Views/Collections/AlbumsCollectionView/AlbumsCollectionView'
import { Album } from '@/types/Items/Items'

interface AlbumsGridSectionProps
	extends SectionProps,
		AlbumCollectionViewProps {
	// key: string
	items: Album[]
}

const AlbumsGridSection = ({ id, title, ...props }: AlbumsGridSectionProps) => {
	return (
		<>
			<Section id={id} title={title}>
				<AlbumsCollectionView id={id} {...props} />
			</Section>
		</>
	)
}

export default AlbumsGridSection
export type { AlbumsGridSectionProps }
