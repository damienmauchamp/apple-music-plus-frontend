import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { LoginFunction } from '@/lib/useAuth'
import Label from '@/src/components/Components/Label'
import Input from '@/src/components/Components/Input'
import Button from '@/src/components/Components/Button'
import FormErrors from '@/src/components/Components/FormErrors'
import Link from '../../Components/Link'

interface LoginFormProps {
	onSubmit?: (event: FormEvent<HTMLFormElement>) => void
	login: LoginFunction
}

const LoginForm = ({ onSubmit, login, ...props }: LoginFormProps) => {
	// const { login } = useAuth({ middleware: 'guest' })

	const searchParams = useSearchParams()
	const [email, setEmail] = useState<string>(searchParams.get('email') || '')
	const [password, setPassword] = useState<string>('')
	const [remember, setRemember] = useState<boolean>(false)
	const [errors, setErrors] = useState<string[]>([])

	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		login({ email, password, remember, setErrors })

		return onSubmit && onSubmit(event)
	}

	return (
		<div className={'w-3/4 mx-auto p-5 rounded-lg pt-48'}>
			<FormErrors className="mb-5" errors={errors} />

			<form onSubmit={(e) => submitForm(e)} autoComplete="off" {...props}>
				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={email}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setEmail(event.target.value)
						}
						required
						autoFocus
						autoComplete="off"
					/>
				</div>

				<div className="mt-4">
					<Label htmlFor="password">Password</Label>

					<Input
						id="password"
						type="password"
						value={password}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
							setPassword(event.target.value)
						}
						required
						autoComplete="current-password"
					/>
				</div>

				<div className="mt-4">
					<label
						htmlFor="remember_me"
						className="inline-flex items-center"
					>
						<input
							id="remember_me"
							type="checkbox"
							name="remember"
							checked={remember}
							onChange={() =>
								// event: ChangeEvent<HTMLInputElement>
								setRemember(!remember)
							}
							className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>

						<span className="ml-2 text-gray-600">Remember me</span>
					</label>
				</div>

				<div className="flex items-center gap-4">
					<Link href="/register">Register</Link>
					{/* <Link href="/forgot-password">Forgot your password?</Link> */}
					<Button>Login</Button>
				</div>
			</form>
		</div>
	)
}

export default LoginForm
