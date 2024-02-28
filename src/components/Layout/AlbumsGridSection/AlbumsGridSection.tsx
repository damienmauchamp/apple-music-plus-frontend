import React from 'react'
import Section, { SectionProps } from '../../Section/Section'
import AlbumsCollectionView, {
	AlbumCollectionViewProps,
} from '../../Views/Collections/AlbumsCollectionView/AlbumsCollectionView'

interface AlbumsGridSectionProps
	extends SectionProps,
		AlbumCollectionViewProps {
	key: string
	items: any[]
}

const AlbumsGridSection = ({
	id,
	title,
	key,
	items,
	scroll,
	rows,
	...props
}: AlbumsGridSectionProps) => {
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

export default AlbumsGridSection
export type { AlbumsGridSectionProps }
