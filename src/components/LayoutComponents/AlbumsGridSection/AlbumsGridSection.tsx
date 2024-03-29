import React from 'react'
import Section, { SectionProps } from '../../Section/Section'
import AlbumsCollectionView, {
	AlbumCollectionViewProps,
} from '../../Views/Collections/AlbumsCollectionView/AlbumsCollectionView'
import { Album, SectionCollectionProps } from '@/types/Items'
import Loading from '../../Components/Loading/Loading'

interface AlbumsGridSectionProps
	extends SectionProps,
		AlbumCollectionViewProps,
		SectionCollectionProps {
	// key: string
	items: Album[]
}

const AlbumsGridSection = ({
	id,
	title,
	seeAll,
	seeAllPath,
	loading = false,
	...props
}: AlbumsGridSectionProps) => {
	if (!loading && !props.items.length) {
		return null
	}

	return (
		<>
			<Section
				id={id}
				title={title}
				// todo : see all
				seeAll={seeAll}
				seeAllPath={seeAllPath}
			>
				{loading ? (
					<div className="w-full h-40">
						<Loading subText={`${title} loading...`} />
					</div>
				) : (
					<AlbumsCollectionView id={id} {...props} />
				)}
			</Section>
		</>
	)
}

export default AlbumsGridSection
export type { AlbumsGridSectionProps }
