import React from 'react'
import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ type = 'submit', className = '', ...props }: ButtonProps) => {
	return (
		<button
			type={type}
			className={`${className} ${styles.button}`}
			{...props}
		/>
	)
}

export default Button
