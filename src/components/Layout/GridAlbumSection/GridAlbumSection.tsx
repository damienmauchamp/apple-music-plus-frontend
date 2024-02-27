import React from 'react'
import Section, { SectionProps } from '../../Section/Section'
import AlbumsCollectionView, {
	AlbumCollectionViewProps,
} from '../../Views/Collections/AlbumsCollectionView/AlbumsCollectionView'

interface GridAlbumSectionProps extends SectionProps, AlbumCollectionViewProps {
	key: string
	items: any[]
}

const GridAlbumSection = ({
	id,
	title,
	key,
	items,
	scroll,
	rows,
	...props
}: GridAlbumSectionProps) => {
	return (
		<>
			<Section id={id} title={title}>
				<AlbumsCollectionView
					key={key}
					items={items}
					scroll={scroll}
					rows={rows}
				/>
			</Section>
			<ul>
				<li>- [Section] title: {title}</li>
				<li>
					- [AlbumsCollectionView] scroll: {scroll ? 'true' : 'false'}
					- [AlbumsCollectionView] rows: {rows}
				</li>
			</ul>
		</>
	)
}

export default GridAlbumSection
export type { GridAlbumSectionProps }
