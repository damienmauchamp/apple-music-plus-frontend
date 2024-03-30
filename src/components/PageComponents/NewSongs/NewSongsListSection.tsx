import React from 'react'
import { Song } from '@/types/Items'
import NewSongsSection, { NewSongsSectionProps } from './NewSongsSection'

export interface NewSongsListSectionProps extends NewSongsSectionProps {}

const NewSongsListSection = ({
	data = [] as Song[],
	...props
}: NewSongsListSectionProps) => <NewSongsSection data={data} list {...props} />

export default NewSongsListSection
