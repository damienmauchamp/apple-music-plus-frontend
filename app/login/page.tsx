'use client'
import useAuth from '@/lib/useAuth'
import LoginForm from '@/src/components/Pages/Login/LoginForm'

export default function Login() {
	const { login, isLoading, user } = useAuth({ middleware: 'guest' })

	if (isLoading || user) {
		return <>Loading...</>
	}

	return (
		<>
			<h1>Login</h1>

			<LoginForm login={login} />
		</>
	)
}
