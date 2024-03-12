import { ChangeEvent, FormEvent, useState } from 'react'
import { RegisterFunction } from '@/lib/useAuth'
import Link from 'next/link'
import Head from 'next/head'
import Label from '@/src/components/Components/Label'
import Input from '@/src/components/Components/Input'
import Button from '@/src/components/Components/Button'
import FormErrors from '@/src/components/Components/FormErrors'
import { IoSearch } from 'react-icons/io5'

interface RegisterFormProps {
	onSubmit?: (event: FormEvent<HTMLFormElement>) => void
	register: RegisterFunction
}

const RegisterForm = ({ onSubmit, register, ...props }: RegisterFormProps) => {
	// const { register } = useAuth({ middleware: 'guest' })

	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	// const [password_confirmation, setPasswordConfirmation] = useState('')
	const [errors, setErrors] = useState<string[]>([])

	// const nameRef = useRef()
	// const emailRef = useRef()
	// const passwordRef = useRef()

	// const nameRef = useRef<HTMLDivElement>()
	// const emailRef = useRef<HTMLDivElement>()
	// const passwordRef = useRef<HTMLDivElement>()

	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		register({ name, email, password, setErrors })

		return onSubmit && onSubmit(event)
	}

	return (
		<>
			<Head>
				<title>ergodnc — Register</title>
			</Head>

			<div
				className={
					'w-1/2 mx-auto bg-white dark:bg-black p-5 rounded-lg'
				}
			>
				<FormErrors className="mb-5" errors={errors} />

				<form onSubmit={submitForm} autoComplete="off" {...props}>
					<div>
						<Label htmlFor="email">Name</Label>

						<Input
							// ref={nameRef}
							speechToText={true} // todo : del
							onTranscript={(val: string) => {
								console.log('onTranscript.name:', val)
							}} // todo : del
							id="name"
							type="text"
							value={name}
							className="mt-1"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setName(event.target.value)
							}
							required
							autoFocus
							autoComplete="off"
							placeholder="Your name"
							rightIcon={IoSearch}
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="email">Email</Label>

						<Input
							// ref={emailRef}
							speechToText={true} // todo : del
							onTranscript={(val: string) => {
								console.log('onTranscript.email:', val)
							}} // todo : del
							id="email"
							type="email"
							value={email}
							className="mt-1"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setEmail(event.target.value)
							}
							placeholder="Email"
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="password">Password</Label>

						<Input
							// ref={passwordRef}
							id="password"
							type="password"
							value={password}
							className="mt-1"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setPassword(event.target.value)
							}
							placeholder="Password"
							required
						/>
					</div>

					{/* <div className="mt-4">
						<Label htmlFor="password">Confirm Password</Label>

						<Input
							id="password_confirmation"
							type="password"
							value={password_confirmation}
							className="mt-1"
							onChange={(event) =>
								setPasswordConfirmation(event.target.value)
							}
							required
						/>
					</div> */}

					<div className="flex items-center justify-end mt-4">
						<Link
							href="/login"
							className="underline text-sm text-gray-600 hover:text-gray-900"
						>
							Already registered?
						</Link>

						<Button className="ml-3">Register</Button>
					</div>
				</form>
			</div>
		</>
	)
}

export default RegisterForm
