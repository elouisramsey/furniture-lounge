import React from 'react'

const CartBtn = ({ add, sub, qty }) => {
  return (
    <section className='flex items-center'>
      <button
        className='
        w-10 h-10 text-xl
        md:w-6 md:h-8 md:text-sm 
        cursor-pointer text-center pb-.5
        focus:outline-none overflow-hidden
        '
        onClick={sub}
      >
        -
      </button>
      <p
        className='
        w-10 h-10 pt-2 text-base
        md:w-6 md:h-8 md:text-xs
        m-0 text-center'
      >
        {qty}
      </p>
      <button
        className='
        w-10 h-10 text-2xl
        md:w-6 md:h-8 md:text-sm
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
