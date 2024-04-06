import React from 'react'
import Section, { SectionProps } from '../../Section/Section'
import SongsCollectionView, {
	SongsCollectionViewProps,
} from '../../Views/Collections/SongsCollectionView/SongsCollectionView'
import { SectionCollectionProps, Song } from '@/types/Items'
import LoadingSection from '../../Components/Loading/LoadingSection'

interface SongsListSectionProps
	extends SectionProps,
		SongsCollectionViewProps,
		SectionCollectionProps {
	// key: string
	items: Song[]
}

const SongsListSection = ({
	id,
	title,
	seeAll,
	seeAllPath,
	loading = false,
	newNav,
	...props
}: SongsListSectionProps) => {
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
				newNav={newNav}
			>
				{loading ? (
					<LoadingSection />
				) : (
					<SongsCollectionView id={id} {...props} />
				)}
			</Section>
		</>
	)
}

export default SongsListSection
export type { SongsListSectionProps }
