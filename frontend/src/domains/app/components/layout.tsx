import config from '../../../config/custom-env-variables'
import 'tailwindcss/tailwind.css'
import {TopBar} from './topbar'
import {SideBar} from './sidebar'
import {useUser} from 'src/domains/app/contexts/user.context'
import {fetcher} from 'src/domains/app/lib/fetcher'
import {useEffect} from 'react'
import {UserDocument} from '../../../shared/auth'
import {history} from '../redux/redux-store'
import {fetchUserInfo} from '../thunks/load-data'
import {useDispatch, useSelector} from 'react-redux'
import {getUserInfo} from '../selectors'

type LayoutProps = {
  children: React.ReactNode // type children
}

export const LayoutComponent = (props: LayoutProps) => {
  const dispatch = useDispatch()
  const userInfo = useSelector(getUserInfo) || {} //access logged in user data from store

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [])

  return (
    <div className="bg-gray-800 font-sans leading-normal tracking-normal mt-12">
      <header>
        <TopBar data={userInfo} />
      </header>
      <main>
        <div className="flex flex-col md:flex-row">
          <SideBar />
          {props.children}
        </div>
      </main>
    </div>
  )
}

export default LayoutComponent
