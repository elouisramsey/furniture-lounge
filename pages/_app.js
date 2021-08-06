import '../styles/tailwind.css'
import { useState, useEffect } from 'react'

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { Auth } from 'aws-amplify'
import { AuthProvider } from '../components/context/AuthProvider'
import { useRouter, Router } from 'next/router'
import getConfig from 'next/config'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Nav from '../components/navigation/Nav'
import Footer from '../components/Footer'
import { CartProvider } from '../components/context/CartProvider'
import Layout from '../components/header/Layout'

const { publicRuntimeConfig } = getConfig()
NProgress.configure({ showSpinner: publicRuntimeConfig.NProgressShowSpinner })

Router.onRouteChangeStart = () => {
  // console.log('onRouteChangeStart triggered');
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChangeComplete triggered');
  NProgress.done()
}

Router.onRouteChangeError = () => {
  // console.log('onRouteChangeError triggered');
  NProgress.done()
}

Amplify.configure({ ...config, ssr: true })

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(false)
  const [userprofile, setUserProfile] = useState(null)

  const router = useRouter()

  useEffect(() => {
    // Access the user session on the client
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUserProfile(user)
        setUser(true)
      })
      .catch((err) => {
        setUser(false)
      })
  }, [])

  async function signIn(username, password) {
    try {
      const user = await Auth.signIn(username, password).then(() =>
        router.push('/profile')
      )
      setUser(user)
    } catch (error) {
      console.log('error signing in', error)
    }
  }

  async function signOut() {
    try {
      await Auth.signOut()
      setUser(false)
      setUserProfile(null)
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  const data = { user, signOut, userprofile, signIn }

  return (
    <AuthProvider value={data}>
      <CartProvider>
        <Layout />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </CartProvider>
    </AuthProvider>
  )
}

export default MyApp
