import Link from 'next/link'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import Cart from '../Cart'
import { useAuthContext } from '../context/AuthProvider'
import { useCartContext } from '../context/CartProvider'

const Nav = () => {
  const [navOpen, setNavOpen] = useState(false)
  const { signOut, user } = useAuthContext()
  const { numberOfItemsInCart, setOpen, open } = useCartContext()
  return (
    <>
      <header className='flex items-center justify-between  px-4 lg:px-10 py-6 bg-transparent'>
        <section className='w-full flex items-center  justify-between'>
          {' '}
          <nav className='flex justify-between items-center lg:w-1/2'>
            <ul
              className={
                (navOpen ? 'flex' : 'hidden') + ' lg:flex items-center w-full'
              }
            >
              <li>
                <Link href='/'>
                  <a className='Poppins text-sm text-black capitalize font-medium mr-4'>
                    Home
                  </a>
                </Link>
              </li>
              <li></li>
              <li>
                <Link href='/products'>
                  <a className='Poppins text-sm text-black capitalize font-medium mr-4'>
                    all product
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/newProduct'>
                  <a className='Poppins text-sm text-black capitalize font-medium'>
                    add a chair
                  </a>
                </Link>
              </li>
            </ul>
            <div className='hamburger lg:hidden' />
            <section className='lg:w-2/3 flex items-center justify-end ml-4 lg:ml-0'>
              <Link href='/'>
                <a className='text-base lg:text-lg font-Poppins font-semibold lg:text-right capitalize text-black'>
                  furniture house
                </a>
              </Link>
            </section>
          </nav>
          <section className='flex items-center justify-end w-2/5 lg:mr-4'>
            <Link href='/profile'>
              <a className='Poppins text-sm text-black capitalize mx-2 font-semibold hidden lg:flex items-center'>
                <FaUser />
              </a>
            </Link>
            {user === true ? (
              <button
                onClick={() => signOut()}
                className='Poppins text-xs lg:text-sm text-black capitalize font-medium mr-4'
              >
                logout
              </button>
            ) : (
              <Link href='/profile'>
                <a className='Poppins text-xs lg:text-sm text-black capitalize font-medium mr-4'>
                  login
                </a>
              </Link>
            )}
            <section className='flex w-7'>
              <button
                open={open}
                onClick={() => setOpen(!open)}
                className='Poppins text-sm text-black capitalize font-medium w-full relative'
              >
                <img src='/bag.svg' alt='bag' className='w-full' />
                <p
                  className='Poppins text-sm text-black capitalize font-medium absolute '
                  style={{ right: '-4px', top: '-7px' }}
                >
                  {numberOfItemsInCart}
                </p>
              </button>
            </section>
          </section>
        </section>
      </header>
      <Cart />
    </>
  )
}

export default Nav
