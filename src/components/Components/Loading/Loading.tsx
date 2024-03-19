import React from 'react'

interface LoadingProps {
	text?: string
	subText?: string
}

const Loading = ({ text = 'Loading...', subText }: LoadingProps) => {
	return (
		<div className="flex flex-col justify-center items-center w-full bg-red p-8">
			<div className="text-2xl">{text}</div>
			{subText && <div>{subText}</div>}
		</div>
	)
}

export default Loading
