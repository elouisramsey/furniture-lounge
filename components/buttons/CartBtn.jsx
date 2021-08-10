import React from 'react'

const CartBtn = ({ add, sub, qty }) => {
  return (
    <section className='flex items-center'>
      <button
        className='
        h-6 w-6 lg:w-10 lg:h-10 lg:text-xl
        md:w-6 md:h-8 text-sm 
        cursor-pointer text-center pb-.5
        focus:outline-none overflow-hidden
        '
        onClick={sub}
      >
        -
      </button>
      <p
        className='
        h-6 w-6 lg:w-10 lg:h-10 text-sm
        md:w-6 md:h-8
        m-0 text-center flex items-center justify-center'
      >
        {qty}
      </p>
      <button
        className='
        h-6 w-6 lg:w-10 lg:h-10 lg:text-2xl
        md:w-6 md:h-8 text-sm
        cursor-pointer text-center pb-.5
        focus:outline-none overflow-hidden
        '
        onClick={add}
      >
        +
      </button>
    </section>
  )
}

export default CartBtn
