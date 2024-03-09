'use client'
import Head from 'next/head'
import Link from 'next/link'
import Label from '@/src/components/tests/label'
import Input from '@/src/components/tests/input'
import Button from '@/src/components/tests/button'
import Errors from '@/src/components/tests/errors'
import { ChangeEvent, FormEvent, useState } from 'react'
import useAuth from '@/lib/useAuth'

export default function Register() {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	// const [password_confirmation, setPasswordConfirmation] = useState('')
	const [errors, setErrors] = useState<string[]>([])

	const { register, isLoading, user } = useAuth({ middleware: 'guest' })

	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		register({ name, email, password, setErrors })
	}

	if (isLoading || user) {
		return <>Loading...</>
	}

	return (
		<>
			<Head>
				<title>ergodnc — Register</title>
			</Head>

			<div className={'w-1/2 mx-auto bg-white p-5 rounded-lg'}>
				<Errors className="mb-5" errors={errors} />

				<form onSubmit={submitForm} autoComplete="off">
					<div>
						<Label htmlFor="email">Name</Label>

						<Input
							id="name"
							type="text"
							value={name}
							className="block mt-1 w-full"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setName(event.target.value)
							}
							required
							autoFocus
							autoComplete="off"
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="email">Email</Label>

						<Input
							id="email"
							type="email"
							value={email}
							className="block mt-1 w-full"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setEmail(event.target.value)
							}
							required
						/>
					</div>

					<div className="mt-4">
						<Label htmlFor="password">Password</Label>

						<Input
							id="password"
							type="password"
							value={password}
							className="block mt-1 w-full"
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setPassword(event.target.value)
							}
							required
						/>
					</div>

					{/* <div className="mt-4">
						<Label htmlFor="password">Confirm Password</Label>

						<Input
							id="password_confirmation"
							type="password"
							value={password_confirmation}
							className="block mt-1 w-full"
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
