import { useAuthContext } from '../components/context/AuthProvider'
import Login from './login'

function Profile() {
  const { user, userprofile } = useAuthContext()

  return (
    <>
      <section className='px-4 lg:px-10'>
        {user ? <h1>Welcome, {userprofile.username}</h1> : <Login />}
      </section>
    </>
  )
}

export default Profile
