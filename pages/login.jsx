import React, { useState } from 'react'
import { useAuthContext } from '../components/context/AuthProvider'

const Login = () => {
  const { signIn, user } = useAuthContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      signIn(username, password)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <section className='flex justify-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='flex shadow-md flex-col py-8 px-8 w-3/5 h-3/5 my-8'
      >
        {' '}
        <h3 className='font-PlayFairDisplay text-xl font-medium text-gray-600 my-3'>
          Login to your account
        </h3>
        <label
          htmlFor='name'
          className='capitalize font-Poppins text-gray-600 text-sm'
        >
          username
        </label>
        <input
          type='text'
          className='border border-solid border-black mb-3 px-2'
          id='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label
          htmlFor='password'
          className='capitalize font-Poppins text-gray-600 text-sm'
        >
          password
        </label>
        <input
          type='password'
          name='password'
          className='border border-solid border-black mb-3 px-2'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='text-sm font-semibold tracking-wider bg-black text-white py-2 border border-black border-solid capitalize w-1/5 flex items-center justify-center'
        >
          login
        </button>
      </form>
    </section>
  )
}

export default Login
