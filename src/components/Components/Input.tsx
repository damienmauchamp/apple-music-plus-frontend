import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
// import SpeechRecognition, {
// 	useSpeechRecognition,
// } from 'react-speech-recognition'
// import 'regenerator-runtime/runtime'
import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string
	value: string
	classNameContainer?: string
	leftIcon?: IconType
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			id,
			value = '',
			classNameContainer = '',
			className = '',
			onInput,
			leftIcon,
			...props
		},
		ref: ForwardedRef<HTMLInputElement>
	) => {
		const renderLeftIcon = () => {
			if (!leftIcon) return null
			const LeftIconComponent = leftIcon
			return <LeftIconComponent size={18} />
		}

		const [inputValue, setInputValue] = useState<string>(value)

		useEffect(() => {
			setInputValue(value)
		}, [value])

		// // region transcript
		// const {
		// 	transcript,
		// 	browserSupportsSpeechRecognition,
		// 	isMicrophoneAvailable,
		// } = useSpeechRecognition()

		// // transcript : speech to text enabled (browser support)
		// const [speechToTextEnabled, setSpeechToTextEnabled] = useState<boolean>(
		// 	Boolean(speechToText)
		// )
		// useEffect(() => {
		// 	if (!browserSupportsSpeechRecognition) {
		// 		setSpeechToTextEnabled(false)
		// 	}
		// }, [browserSupportsSpeechRecognition])

		// useEffect(() => {
		// 	setSpeechToTextEnabled(Boolean(speechToText))
		// }, [speechToText])

		// // transcript : speech to text listening
		// const [speechToTextIsListening, setSpeechToTextIsListening] =
		// 	useState<boolean>(false)
		// const [speechToTextCurrentId, setSpeechToTextCurrentId] =
		// 	useState<string>('')

		// const startListening = (listeningId: string) => {
		// 	// (/*event: React.MouseEventHandler<HTMLDivElement>*/) => {
		// 	if (!isMicrophoneAvailable || !speechToTextEnabled) {
		// 		// todo : handle error ?
		// 		setSpeechToTextEnabled(false)
		// 		console.error('Mic not available')
		// 		return
		// 	}
		// 	setSpeechToTextIsListening(true)
		// 	setSpeechToTextCurrentId(listeningId)
		// 	SpeechRecognition.startListening()
		// }
		// const stopListening =
		// 	(/*event: React.MouseEventHandler<HTMLDivElement>*/) => {
		// 		SpeechRecognition.stopListening()
		// 		setSpeechToTextIsListening(false)
		// 		setSpeechToTextCurrentId('')
		// 		setInputValue(transcript)
		// 	}

		// useEffect(() => {
		// 	if (!speechToTextEnabled) return

		// 	// not the good id
		// 	if (speechToTextCurrentId !== id) return

		// 	setInputValue(transcript)
		// 	onInput &&
		// 		onInput({
		// 			currentTarget: { value: transcript },
		// 			// currentTarget: { value: localTranscript },
		// 		} as React.FormEvent<HTMLInputElement>)
		// 	onTranscript && onTranscript(transcript)
		// }, [
		// 	id,
		// 	onInput,
		// 	onTranscript,
		// 	speechToTextCurrentId,
		// 	speechToTextEnabled,
		// 	transcript,
		// ])

		// const renderRightIcon = (
		// 	icon: React.ReactNode,
		// 	onClick: React.MouseEventHandler<HTMLDivElement> | undefined
		// ) => (
		// 	<div
		// 		className={styles.inputRightIcon}
		// 		style={{
		// 			background: speechToTextIsListening ? 'green' : '',
		// 			cursor: 'pointer',
		// 		}}
		// 		onClick={onClick}
		// 	>
		// 		{icon}
		// 	</div>
		// )

		// const renderClearable = () => {
		// 	const clearable = inputValue && !speechToTextIsListening
		// 	if (!clearable) return null

		// 	return renderRightIcon(<IoCloseCircle size={18} />, () =>
		// 		setInputValue('')
		// 	)
		// }

		// const renderMic = () => {
		// 	const clearable = inputValue && !speechToTextIsListening
		// 	if (clearable) return null

		// 	return renderRightIcon(
		// 		<IoMic
		// 			size={18}
		// 			className={`${speechToTextIsListening ? 'text-green' : ''}`}
		// 		/>,
		// 		(event: React.MouseEvent<HTMLDivElement>) => {
		// 			console.log('click Mic', event)
		// 			return speechToTextEnabled
		// 				? speechToTextIsListening
		// 					? stopListening()
		// 					: startListening(id)
		// 				: {}
		// 		}
		// 	)
		// }
		// // endregion

		// render

		return (
			<div
				className={`${styles.inputContainer} ${classNameContainer}`}
			>
				<input
					ref={ref}
					id={id}
					className={`${className} ${styles.input}
						${leftIcon ? styles.inputWithIcon : ''}
						`}
					value={inputValue}
					onInput={(event: React.FormEvent<HTMLInputElement>) =>
						onInput && onInput(event)
					}
					{...props}
				/>

					<div className={styles.inputIcons}>
						<div className={styles.inputIconsContainer}>
							<div className={styles.inputSearchIcon}>
								{renderLeftIcon()}
							</div>
							{/* {speechToText && renderMic()} */}
							{/* {renderClearable()} */}
						</div>
					</div>
			</div>
		)
	}
)
Input.displayName = 'Input'
export default Input
