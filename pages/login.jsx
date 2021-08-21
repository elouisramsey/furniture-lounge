import React, { useState } from 'react'
import { useAuthContext } from '../components/context/AuthProvider'

const Login = () => {
  const { signIn } = useAuthContext()
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
    <section className='flex justify-center'>
      <form
        onSubmit={handleSubmit}
        className='flex shadow-md flex-col py-4 mx-4 lg:py-8 px-4 lg:px-8 w-full my-0 lg:w-3/5 h-3/5 lg:my-8'
      >
        {' '}
        <h3 className='font-PlayFairDisplay text-xl font-medium text-gray-600 my-3'>
          Login to your account
        </h3>
        <label
          htmlFor='name'
          className='text-lightGrey text-sm mb-2 capitalize'
        >
          username
        </label>
        <input
          type='text'
          className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mb-4'
          id='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label
          htmlFor='password'
          className='text-lightGrey text-sm mb-2 capitalize'
        >
          password
        </label>
        <input
          type='password'
          name='password'
          className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mb-4'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='text-sm font-semibold tracking-wider bg-black text-white py-2 border border-black border-solid capitalize w-full lg:w-1/5 flex items-center justify-center my-4'
        >
          login
        </button>
      </form>
    </section>
  )
}

export default Login
