import Link from 'next/link'
import Image from 'next/image'

const Categories = () => {
  return (
    <section className='pb-12 px-10 my-10'>
      <article className='lg:my-8 lg:grid-cols-2 grid-cols-1 grid gap-4 my-4  '>
        <article className='mb-4 lg:mb-0 bg-light p-8 pb-0 hover:bg-light-200'>
          <Link href='/'>
            <a className='flex h-full flex-col py-4'>
              <section className='flex items-center justify-center h-58'>
                {' '}
                <img
                  src='/images/Futon-PNG-File.png'
                  alt='Sofa'
                  className='w-3/5'
                />
              </section>
              <section className='flex flex-col justify-end'>
                {' '}
                <p className='text-3xl font-semibold mb-1 font-Poppins capitalize'>
                  Sofas
                </p>
                <p className='text-xs text-gray-700 font-Poppins'>12 items</p>
              </section>
            </a>
          </Link>
        </article>
        <article className='mb-4 lg:mb-0 bg-light p-8 pb-0 hover:bg-light-200'>
          <Link href='/'>
            <a className='flex h-full flex-col py-4'>
              <section className='flex items-center justify-center h-58'>
                <img src='/images/Sofa-Bed.png' alt='Sofa' className='w-3/5' />
              </section>

              <section className='flex flex-col justify-end'>
                <p className='text-3xl font-semibold mb-1 font-Poppins capitalize'>
                  Printed Sofas
                </p>
                <p className='text-xs text-gray-700 font-Poppins'>5 items</p>
              </section>
            </a>
          </Link>
        </article>
      </article>
    </section>
  )
}

export default Categories
