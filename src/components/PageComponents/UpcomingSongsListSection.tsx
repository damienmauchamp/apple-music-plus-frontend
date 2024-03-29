import React from 'react'
import { Song } from '@/types/Items'
import UpcomingSongsSection, {
	UpcomingSongsSectionProps,
} from './UpcomingSongsSection'

export interface UpcomingSongsListSectionProps
	extends UpcomingSongsSectionProps {}

const UpcomingSongsListSection = ({
	data = [] as Song[],
}: UpcomingSongsListSectionProps) => <UpcomingSongsSection data={data} list />

export default UpcomingSongsListSection
