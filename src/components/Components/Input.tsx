import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
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
					</div>
				</div>
			</div>
		)
	}
)
Input.displayName = 'Input'
export default Input
