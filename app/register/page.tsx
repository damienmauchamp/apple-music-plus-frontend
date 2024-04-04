'use client'
import useAuth from '@/lib/useAuth'
import Loading from '@/src/components/Components/Loading/Loading'
import RegisterForm from '@/src/components/Pages/Register/RegisterForm'

export default function Register() {
	const { register, isLoading, user } = useAuth({ middleware: 'guest' })

	if (isLoading || user) {
		return <Loading subText="Register page loading" />
	}

	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<RegisterForm register={register} />
		</div>
	)
}
