import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import styles from './Input.module.css'
import { IconType } from 'react-icons'
import { IoMic } from 'react-icons/io5'
import 'regenerator-runtime/runtime'
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	// input
	value: string
	// onInput: React.FormEventHandler<HTMLInputElement> | undefined
	onTranscript?: (value: string) => void
	speechToText?: boolean
	// container
	classNameContainer?: string
	// icons
	// rightIcon?: JSX.IntrinsicElements | IconType
	rightIcon?: IconType
}

const Input = forwardRef(
	(
		{
			value = '',
			classNameContainer = '',
			className = '',
			onInput,
			onTranscript,
			speechToText,
			rightIcon,
			...props
		}: InputProps,
		// ref: ForwardedRef<HTMLDivElement>
		ref: ForwardedRef<HTMLInputElement>
	) => {
		// icons
		const renderRightIcon = () => {
			if (!rightIcon) return null
			const RightIconComponent = rightIcon
			return <RightIconComponent size={18} />
		}

		// text
		const [inputValue, setInputValue] = useState<string>(value)
		const updateInputValue = (text: string) => {
			console.log(`(Input[${props.id}]) >updateInputValue:`, text)
			setInputValue(text)
		}

		useEffect(() => {
			console.log(`(Input[${props.id}].useEffect[value]):`, value)
			updateInputValue(value)
		}, [value])

		// region transcript
		const {
			transcript,
			browserSupportsSpeechRecognition,
			isMicrophoneAvailable,
		} = useSpeechRecognition()

		// transcript : speech to text enabled (browser support)
		const [speechToTextEnabled, setSpeechToTextEnabled] = useState<boolean>(
			Boolean(speechToText)
		)
		useEffect(() => {
			if (!browserSupportsSpeechRecognition) {
				setSpeechToTextEnabled(false)
			}
		}, [browserSupportsSpeechRecognition])

		useEffect(() => {
			setSpeechToTextEnabled(Boolean(speechToText))
		}, [speechToText])

		// transcript : speech to text listening
		const [speechToTextIsListening, setSpeechToTextIsListening] =
			useState<boolean>(false)

		const startListening =
			(/*event: React.MouseEventHandler<HTMLDivElement>*/) => {
				if (!isMicrophoneAvailable || !speechToTextEnabled) {
					// todo : handle error ?
					setSpeechToTextEnabled(false)
					console.error('Mic not available')
					return
				}
				setSpeechToTextIsListening(true)
				SpeechRecognition.startListening()
			}
		const stopListening =
			(/*event: React.MouseEventHandler<HTMLDivElement>*/) => {
				SpeechRecognition.stopListening()
				setSpeechToTextIsListening(false)
				updateInputValue(transcript)
			}

		useEffect(() => {
			console.log(`(Input[${props.id}]) transcript:`, transcript, props)
			updateInputValue(transcript)
			onInput &&
				onInput({
					currentTarget: { value: transcript },
					// currentTarget: { value: localTranscript },
				} as React.FormEvent<HTMLInputElement>)
			onTranscript && onTranscript(transcript)
		}, [transcript])
		// endregion

		const renderMic = () => {
			return (
				<div
					className={styles.inputMicIcon}
					style={{
						background: speechToTextIsListening ? 'green' : '',
						cursor: 'pointer',
					}}
					onClick={(event: React.MouseEvent<HTMLDivElement>) => {
						console.log('click Mic', event)
						return speechToTextEnabled
							? speechToTextIsListening
								? stopListening()
								: startListening()
							: {}
					}}
				>
					<IoMic
						size={18}
						className={`${speechToTextIsListening ? 'text-green' : ''}`}
					/>
				</div>
			)
		}

		// render

		return (
			<div
				// ref={ref}
				// 	{...props}
				className={`${classNameContainer} ${styles.searchbar}`}
			>
				<div className={styles.inputContainer}>
					<input
						ref={ref}
						// disabled={disabled}
						// className={`${className} outline-none border rounded border-gray-200 h-10 px-2 `}
						className={`${className} ${styles.input}`}
						value={inputValue}
						onInput={(event: React.FormEvent<HTMLInputElement>) => {
							// updateInputValue(e.currentTarget.value)
							return onInput && onInput(event)
						}}
						{...props}
					/>

					<div className={styles.inputIcons}>
						<div className={styles.inputIconsContainer}>
							<div className={styles.inputSearchIcon}>
								{/* todo */}
								{renderRightIcon()}
								{/* <RightIconComponent size={18} /> */}
								{/* <IoSearch size={18} /> */}
							</div>
							{speechToText && renderMic()}
						</div>
					</div>
				</div>
			</div>
		)
	}
)
Input.displayName = 'Input'
export default Input
