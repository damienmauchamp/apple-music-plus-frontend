import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ disabled = false, className = '', ...props }: InputProps) => {
	return (
		<input
			disabled={disabled}
			className={`${className} outline-none border rounded border-gray-200 h-10 px-2 `}
			{...props}
		/>
	)
}

export default Input
