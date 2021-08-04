import React from 'react'
import { BsCheck } from 'react-icons/bs'
import Btn from './buttons/Btn'

const Success = ({ reference }) => {
  return (
    <section className='grid grid-cols-2 h-screen'>
      <section className='flex items-center justify-center flex-col h-full'>
        <section className='h-12 w-12 rounded-full items-center flex justify-center bg-success'>
          <BsCheck className='text-white text-2xl' />
        </section>
        <h3 className='text-black my-4 text-2xl'>
          Thank you for your purchase
        </h3>
        <p className='text-black text-base mb-4'>
          Your order was completed successfully
        </p>
        <p className='text-lightGrey text-sm mb-12'>
          Here is your order number for reference: {reference}
        </p>
        <section className='flex items-center w-4/5 justify-between'>
          <Btn
            link='/'
            color='lightGrey'
            border='lightGrey'
            text='go back home'
            bg='white'
            w='3/6'
          />
          <div className='mx-2' v />
          <Btn
            link='/products'
            bg='black'
            text='continue shopping'
            color='white'
            w='3/6'
          />
        </section>
      </section>
      <section className='bg-orderSummary p-12'>2</section>
    </section>
  )
}

export default Success
