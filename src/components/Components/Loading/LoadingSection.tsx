import React from 'react'
import { IonSpinner } from '@ionic/react'
import Loading from './Loading'
import LoadingPage from './LoadingPage'

interface LoadingSectionProps {
	text?: string
	full?: boolean
}

const LoadingSection = ({
	text = 'Loading...',
	full = false,
}: LoadingSectionProps) =>
	full ? (
		<LoadingPage text={text} />
	) : (
		<Loading text={''} subText={text} className="p-2">
			<IonSpinner name="lines-small" />
		</Loading>
	)

export default LoadingSection
