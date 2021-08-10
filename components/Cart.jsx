import { AmplifyS3Image } from '@aws-amplify/ui-react'
import React, { useState } from 'react'
import { BsX } from 'react-icons/bs'
import Btn from './buttons/Btn'
import CartBtn from './buttons/CartBtn'
import { useCartContext } from './context/CartProvider'

const Cart = () => {
  const {
    numberOfItemsInCart,
    removeFromCart,
    emptyCart,
    total,
    cart,
    setProductQty,
    setOpen,
    open
  } = useCartContext()

  function increment(product) {
    product.quantity = product.quantity + 1
    setProductQty(product)
  }

  function decrement(product) {
    if (product.quantity === 1) return
    product.quantity = product.quantity - 1
    setProductQty(product)
  }

  return (
    <section
      className={
        (open ? 'active ' : 'notActive ') +
        'z-50 flex justify-end transition-all w-full fixed top-0 bottom-0 bg-cartBG'
      }
    >
      <section
        className={'w-full max-w-xl bg-white transition ease-in duration-700'}
      >
        <article className='flex flex-col transition ease-in duration-700 shadow-xl h-full relative'>
          <section className='px-2 py-10 lg:p-10 overflow-hidden'>
            <section className='flex items-center overflow-hidden justify-between pb-8 border-b border-solid border-black transition ease-in duration-700'>
              <h3 className='font-PlayFairDisplay text-xl font-medium text-black capitalize'>
                shopping cart
              </h3>
              <button onClick={() => setOpen(!open)}>
                <BsX className='text-black text-2xl' />
              </button>
            </section>
            <section className='flex flex-col h-4/5 scroller'>
              {numberOfItemsInCart < 1 ? (
                <h3 className='font-semibold font-Poppins text-black text-sm my-8 flex items-center justify-center'>
                  There are currently no items in cart
                </h3>
              ) : (
                <>
                  {cart?.map((product) => (
                    <React.Fragment key={product.id}>
                      <article className='flex items-center'>
                        <section className='flex justify-center items-center h-16 overflow-hidden bg-cateBg w-full lg:w-1/2 mr-5'>
                          <AmplifyS3Image
                            imgKey={product.image.key}
                            className='flex '
                            alt={product.name}
                          />
                        </section>
                        <section className='flex flex-col py-3 border-b border-solid border-gray-300 w-full lg:w-4/5 mx-auto justify-center xl:ml-8'>
                          <article className='flex w-full items-center justify-between'>
                            <h3 className='font-semibold font-Poppins text-black text-sm capitalize'>
                              {product.name}
                            </h3>
                            <h3 className='font-semibold font-Poppins text-black text-sm'>
                              {'\u20A6'}
                              {(
                                product.price * product.quantity
                              ).toLocaleString()}
                            </h3>
                          </article>
                          <p className='font-Poppins text-gray-400 text-xs'>
                            {product.weight}kg
                          </p>
                          <article className='flex items-center justify-between mt-3'>
                            <CartBtn
                              add={() => increment(product)}
                              sub={() => decrement(product)}
                              qty={product.quantity}
                            />
                            <button
                              onClick={() => removeFromCart(product)}
                              className='border-b border-solid capitalize font-Poppins text-gray-400 text-xs pb-0 border-gray-400 leading-none'
                            >
                              remove
                            </button>
                          </article>
                        </section>
                      </article>
                    </React.Fragment>
                  ))}
                </>
              )}
            </section>
          </section>
          <footer className='border-t py-10 border-solid border-black w-full px-2 lg:px-10 bg-cateBg absolute bottom-0'>
            <section className='flex items-center justify-between'>
              {' '}
              <h3 className='font-semibold font-Poppins text-gray-400 text-sm'>
                Subtotal:{' '}
                <span className='block text-black font-semibold'>
                  {total.toLocaleString()}
                </span>
              </h3>
              <button
                onClick={() => emptyCart()}
                className='border-b border-solid capitalize font-Poppins hover:text-red-500 text-gray-400 text-xs pb-0 border-gray-400 leading-none'
              >
                empty cart
              </button>
            </section>

            <section className='grid w-full grid-cols-2 gap-6 mt-4 justify-between'>
              <button
                onClick={() => setOpen(!open)}
                className='hidden lg:block'
              >
                <Btn link='/products' text='continue shopping' />
              </button>
              <button
                onClick={() => setOpen(!open)}
                // className={cart.length === 0 ? 'disabled-link' : ''}
              >
                <Btn
                  link='/checkout'
                  text='checkout'
                  bg='black'
                  color='white'
                />
              </button>
            </section>
          </footer>
        </article>
      </section>
    </section>
  )
}

export default Cart
