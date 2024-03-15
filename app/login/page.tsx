'use client'
import useAuth from '@/lib/useAuth'
import LoginForm from '@/src/components/Pages/Login/LoginForm'
import Page from '@/src/components/Pages/PageNavigation/Page'

export default function Login() {
	const { login, isLoading, user } = useAuth({ middleware: 'guest' })

	if (isLoading || user) {
		return <>Loading...</>
	}

	return (
		<Page>
			<h1>Login</h1>

			<LoginForm login={login} />
		</Page>
	)
}
