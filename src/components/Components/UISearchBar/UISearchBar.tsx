'use client'
import { ChangeEvent, HTMLProps, useState } from 'react'
import Input from '../Input'
import styles from './UISearchBar.module.css'

export interface UISearchBarProps extends HTMLProps<HTMLDivElement> {
	value?: string
	// onInput: React.FormEventHandler<HTMLInputElement> | undefined
	// onTranscript?: (value: string) => void
	// speechToText?: boolean
}

const UISearchBar = ({
	value = '',
	// speechToText = true,
	// onTranscript,
	...props
}: UISearchBarProps) => {
	// searchText
	const [searchbarText, setSearchBarText] = useState<string>(value)

	return (
		<div
			// ref={ref}
			// {...props}
			className={`${props.className} ${styles.searchbar}`}
		>
			<Input
				id={'test'}
				placeholder="Search..."
				// speechToText={speechToText}
				value={searchbarText}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					setSearchBarText(event.target.value)
				}}
				// onTranscript={onTranscript}
			/>
		</div>
	)
}

export default UISearchBar
