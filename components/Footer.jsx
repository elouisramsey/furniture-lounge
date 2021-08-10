import React from 'react'

const Footer = () => {
  return (
    <section className='items-center justify-between flex px-4 lg:px-10 py-3 border-solid border-t border-gray-300'>
      <p className='text-gray-700 text-tiny lg:text-xs'>
        Copyright © Louis-Ramsey
      </p>
      <p className='text-gray-700 text-tiny lg:text-xs'>
        Made with <span className='text-red-500'>❤</span>
      </p>
    </section>
  )
}

export default Footer
