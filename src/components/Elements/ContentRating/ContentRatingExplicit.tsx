import React from 'react'

type ContentRatingExplicitProps = {
	size?: number
	fill?: string
}

const ContentRatingExplicit = ({
	size,
	fill,
	...props
}: ContentRatingExplicitProps) => {
	if (!size) size = 9
	if (!fill) fill = '#ffffffa3'

	return (
		<svg
			// className={}
			style={{
				fill: fill,
				marginLeft: '4px',
			}}
			viewBox={`0 0 ${size} ${size}`}
			width={size}
			height={size}
			aria-hidden="true"
		>
			<path d="M3.9 7h1.9c.4 0 .7-.2.7-.5s-.3-.4-.7-.4H4.1V4.9h1.5c.4 0 .7-.1.7-.4 0-.3-.3-.5-.7-.5H4.1V2.9h1.7c.4 0 .7-.2.7-.5 0-.2-.3-.4-.7-.4H3.9c-.6 0-.9.3-.9.7v3.7c0 .3.3.6.9.6zM1.6 0h5.8C8.5 0 9 .5 9 1.6v5.9C9 8.5 8.5 9 7.4 9H1.6C.5 9 0 8.5 0 7.4V1.6C0 .5.5 0 1.6 0z"></path>
		</svg>
	)
}

export default ContentRatingExplicit
