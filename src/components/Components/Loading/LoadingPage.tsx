import React from 'react'
import { IonSpinner } from '@ionic/react'
import Loading from './Loading'
import styles from './Loading.module.css'

interface LoadingPageProps {
	text?: string
}

const LoadingPage = ({ text = 'Loading' }: LoadingPageProps) => (
	<Loading text={''} subText={text} className={styles.page}>
		<IonSpinner name="lines" />
	</Loading>
)

export default LoadingPage
