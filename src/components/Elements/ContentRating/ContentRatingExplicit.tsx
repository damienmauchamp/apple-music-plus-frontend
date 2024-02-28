import React from 'react'
import ContentRating, { ContentRatingProps } from './ContentRating'

interface ContentRatingExplicitProps extends ContentRatingProps {}

const ContentRatingExplicit = (props: ContentRatingExplicitProps) => {
	return <ContentRating {...props} type={'explicit'} />
}

export default ContentRatingExplicit
