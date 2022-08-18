import {useUser} from 'src/domains/app/contexts/user.context'
import {environment} from 'src/domains/app/lib/environment'
import {fetcher} from 'src/domains/app/lib/fetcher'
import {UserDocument} from '../../../../shared/auth'
import {LoginComponent} from '../../components/login'
import 'tailwindcss/tailwind.css'

export default function Login() {
  return (
    <main className="flex items-center justify-center h-full">
      <LoginComponent />
    </main>
  )
}
