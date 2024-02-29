import React from 'react'
import Section, { SectionProps } from '../../Section/Section'
import SongsCollectionView, {
	SongsCollectionViewProps,
} from '../../Views/Collections/SongsCollectionView/SongsCollectionView'

interface SongsListSectionProps extends SectionProps, SongsCollectionViewProps {
	// key: string
	items: any[]
}

const SongsListSection = ({
	id,
	title,
	items,
	scroll,
	rows,
	...props
}: SongsListSectionProps) => {
	return (
		<>
			<Section id={id} title={title}>
				<SongsCollectionView
					id={id}
					items={items}
					scroll={scroll}
					rows={rows}
				/>
			</Section>
		</>
	)
}

export default SongsListSection
export type { SongsListSectionProps }
