'use client'
import useAuth from '@/lib/useAuth'
import LoadingPage from '@/src/components/Components/Loading/LoadingPage'
import LoginForm from '@/src/components/Pages/Login/LoginForm'

export default function Login() {
	const { login, isLoading, user } = useAuth({ middleware: 'guest' })

	if (isLoading || user) {
		return <LoadingPage />
	}

	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<LoginForm login={login} />
		</div>
	)
}
