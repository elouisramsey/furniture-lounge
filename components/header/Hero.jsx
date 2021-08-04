import Image from 'next/image'
import Btn from '../buttons/Btn'

const Hero = () => {
  return (
    <section className=' px-10'>
      <aside className='bg-blue-300 grid grid-cols-2 h-4/5'>
        <article className='flex flex-col py-20 pl-16'>
          <section className='flex items-center w-1/5 overflow-hidden'>
            <section className='border-l h-full border-solid border-black mr-2' />
            <h3 className='font-Poppins font-light capitalize text-base'>
              couch <br />
              2021
            </h3>
          </section>
          <section className='flex flex-col my-8'>
            <h1 className='text-heroHead my-6 capitalize text-4xl xl:text-5xl font-bold tracking-widest leading-none'>
              Vics leather couch
            </h1>
            <p className='text-lg text-black font-Poppins uppercase'>
              from {'\u20A6'}25,000
            </p>
            <section className='my-6'>
              <Btn link='/all' color='white' border='white' w='2/5' />
            </section>
          </section>
        </article>
        <article className='flex flex-1 justify-center items-center relative'>
          <section className='absolute w-48 h-48 sm:w-72 sm:h-72 xl:w-88 xl:h-88 bg-white z-0 rounded-full' />
          <section className='z-10'>
            <img
              src='/images/Yellow-Sofa-Transparent-PNG.png'
              alt='Sofa'
              style={{ width: '34rem' }}
            />
          </section>
        </article>
      </aside>
    </section>
  )
}

export default Hero
