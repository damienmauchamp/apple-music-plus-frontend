'use client'
import useAuth from '@/lib/useAuth'
import LoadingPage from '@/src/components/Components/Loading/LoadingPage'
import RegisterForm from '@/src/components/Pages/Register/RegisterForm'

export default function Register() {
	const { register, isLoading, user } = useAuth({ middleware: 'guest' })

	if (isLoading || user) {
		return <LoadingPage />
	}

	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<RegisterForm register={register} />
		</div>
	)
}
