import React from 'react'
import Arrow from './buttons/Arrow'

const Quote = () => {
  return (
    <section className='flex items-center flex-col justify-center px-16 my-20'>
      <p className='font-Poppins uppercase text-black text-3xl lg:w-2/3 text-center mx-auto'>
        softness IS THE ESSENCE OF comfort, AND comfort IS THE ESSENCE OF
        elegance.
      </p>
      <Arrow link='/more' />
    </section>
  )
}

export default Quote
