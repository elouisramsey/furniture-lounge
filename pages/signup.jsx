import { Auth } from 'aws-amplify'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Signup = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [authenticationCode, setAuthenticationCode] = useState('')
  const [step, setStep] = useState(0)

  const register = async () => {
    e.preventDefault()
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number }
      })
      console.log('successful signup')
      setStep(1)
    } catch (error) {
      console.log(error)
    }
  }

  const confirmRegister = async () => {
    e.preventDefault()
    try {
      await Auth.confirmSignUp({ username, authenticationCode })
      await Auth.signIn(username, password)
      console.log('user successfully signed up')
      router.push('/')
    } catch (error) {
      console.log('there was an error: ', error)
    }
  }

  return (
    <section className='flex justify-center'>
      {step === 0 && (
        <form
          method='post'
          className='flex shadow-md flex-col py-8 px-8 w-3/5 my-8'
        >
          {' '}
          <h3 className='font-PlayFairDisplay text-xl font-medium text-gray-600 my-3 text-center'>
            Signup for an account
          </h3>
          <label
            htmlFor='name'
            className='text-lightGrey text-sm mb-2 capitalize'
          >
            username
          </label>
          <input
            required
            type='text'
            className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mb-4'
            id='username'
            name='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor='email'
            className='text-lightGrey text-sm mb-2 capitalize'
          >
            email
          </label>
          <input
            required
            type='email'
            name='email'
            className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mb-4'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor='phone_number'
            className='text-lightGrey text-sm mb-2 capitalize'
          >
            phone number
          </label>
          <input
            required
            type='text'
            className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mb-4'
            id='phone_number'
            name='phone_number'
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label
            htmlFor='password'
            className='text-lightGrey text-sm mb-2 capitalize'
          >
            password
          </label>
          <input
            required
            type='password'
            name='password'
            className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mb-4'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={register}
            className='text-sm font-semibold tracking-wider bg-black text-white py-2 border border-black border-solid capitalize w-1/5 flex items-center justify-center my-4'
          >
            sign up
          </button>
        </form>
      )}
      {step === 1 && (
        <form
          method='post'
          onSubmit={confirmRegister}
          className='flex shadow-md flex-col py-8 px-8 w-3/5 my-8'
        >
          {' '}
          <h3 className='font-PlayFairDisplay text-xl font-medium text-gray-600 my-3 text-center'>
            Confirm Signup for an account
          </h3>
          <label
            htmlFor='username'
            className='text-lightGrey text-sm mb-2 capitalize'
          >
            username
          </label>
          <input
            required
            type='text'
            className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mb-4'
            id='username'
            name='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor='authenticationCode'
            className='text-lightGrey text-sm mb-2 capitalize'
          >
            authentication code
          </label>
          <input
            required
            type='text'
            className='h-12 border border-solid border-borderColor font-Poppins font-medium text-black focus:ring-transparent focus:outline-none form-input mb-4'
            id='authenticationCode'
            name='authenticationCode'
            onChange={(e) => setAuthenticationCode(e.target.value)}
          />
          <button
            type='submit'
            className='text-sm font-semibold tracking-wider bg-black text-white py-2 border border-black border-solid capitalize w-1/5 flex items-center justify-center my-4'
          >
            confirm sign up
          </button>
        </form>
      )}
    </section>
  )
}

export default Signup
