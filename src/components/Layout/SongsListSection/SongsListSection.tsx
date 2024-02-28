import React from 'react'
import Section, { SectionProps } from '../../Section/Section'
import SongsCollectionView, {
	SongsCollectionViewProps,
} from '../../Views/Collections/SongsCollectionView/SongsCollectionView'

interface SongsListSectionProps extends SectionProps, SongsCollectionViewProps {
	key: string
	items: any[]
}

const SongsListSection = ({
	id,
	title,
	key,
	items,
	// scroll,
	// rows,
	...props
}: SongsListSectionProps) => {
	return (
		<>
			<Section id={id} title={title}>
				<SongsCollectionView
					key={key}
					items={items}
					// scroll={scroll}
					// rows={rows}
				/>
			</Section>
			<ul>
				<li>- [Section] title: {title}</li>
				{/* <li>
					- [SongsCollectionView] scroll: {scroll ? 'true' : 'false'}-
					[SongsCollectionView] rows: {rows}
				</li> */}
			</ul>
		</>
	)
}

export default SongsListSection
export type { SongsListSectionProps }
