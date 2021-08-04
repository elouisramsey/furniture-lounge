import React from 'react'

const Quantity = ({ add, sub, qty }) => {
  return (
    <section className='my-3 flex items-center'>
      <button
        className='
        w-10 h-10 text-xl
        md:w-8 md:h-8 md:text-sm 
        cursor-pointer text-center border pb-.5
        hover:bg-gray-900 hover:text-white
        focus:outline-none overflow-hidden
        '
        onClick={sub}
      >
        -
      </button>
      <p
        className='
        w-10 h-10 pt-2 text-base
        md:w-8 md:h-8 md:pt-2 md:text-xs
        m-0 border-t border-b text-center'
      >
        {qty}
      </p>
      <button
        className='
        w-10 h-10 text-2xl
        md:w-8 md:h-8 md:text-sm
        cursor-pointer text-center border pb-.5
        hover:bg-gray-900 hover:text-white
        focus:outline-none overflow-hidden
        '
        onClick={add}
      >
        +
      </button>
    </section>
  )
}

export default Quantity
