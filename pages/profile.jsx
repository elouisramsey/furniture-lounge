import { useAuthContext } from '../components/context/AuthProvider'
import Login from './login'

function Profile() {
  const { user } = useAuthContext()

  return (
    <>
      <section className='px-10'>
        {user ? <h1>Welcome, {user.username}</h1> : <Login />}
      </section>
    </>
  )
}

export default Profile
