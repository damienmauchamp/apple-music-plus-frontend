import React from 'react'
import Section, { SectionProps } from '../../Section/Section'
import SongsCollectionView, {
	SongsCollectionViewProps,
} from '../../Views/Collections/SongsCollectionView/SongsCollectionView'
import { Song } from '@/types/Items'

interface SongsListSectionProps extends SectionProps, SongsCollectionViewProps {
	// key: string
	items: Song[]
}

const SongsListSection = ({
	id,
	title,
	seeAll,
	seeAllPath,
	...props
}: SongsListSectionProps) => {
	return (
		<>
			<Section
				id={id}
				title={title}
				// todo : see all => send data & type, server component
				seeAll={seeAll}
				seeAllPath={seeAllPath}
			>
				<SongsCollectionView id={id} {...props} />
			</Section>
		</>
	)
}

export default SongsListSection
export type { SongsListSectionProps }
