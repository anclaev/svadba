import { AuthForm } from '@components/AuthForm'

export default function Welcome() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'>
      <AuthForm />
    </div>
  )
}
