import React from 'react'
import { Song } from '@/types/Items'
import UpcomingSongsSection, {
	UpcomingSongsSectionProps,
} from './UpcomingSongsSection'

export interface UpcomingSongsListSectionProps
	extends UpcomingSongsSectionProps {}

const UpcomingSongsListSection = ({
	data = [] as Song[],
	...props
}: UpcomingSongsListSectionProps) => (
	<UpcomingSongsSection data={data} list {...props} />
)

export default UpcomingSongsListSection
