import React from 'react'
import ContentRating, { ContentRatingProps } from './ContentRating'

interface ContentRatingCleanProps extends ContentRatingProps {}

const ContentRatingClean = (props: ContentRatingCleanProps) => {
	return <ContentRating {...props} type={'clean'} />
}

export default ContentRatingClean
