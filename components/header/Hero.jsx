import Image from 'next/image'
import Btn from '../buttons/Btn'

const Hero = () => {
  return (
    <section className='lg:px-10'>
      <aside className='bg-blue-300 grid lg:grid-cols-2 px-4 lg:px-0 py-6'>
        <article className='flex flex-col lg:p-16'>
          <section className='flex items-center lg:w-1/5 overflow-hidden'>
            <section className='border-l h-full border-solid border-black mr-2' />
            <h3 className='font-Poppins font-light capitalize text-base'>
              couch <br />
              2021
            </h3>
          </section>
          <section className='flex flex-col'>
            <h1 className='text-heroHead my-6 text-2xl lg:text-4xl xl:text-5xl font-bold lg:tracking-widest lg:leading-none'>
              Get furniture that gives comfort
            </h1>
            <p className='text-base lg:text-lg text-white font-Poppins'>
              We offer high quality furniture for the best prices with access to
              doorstep delivery services
            </p>
            <section className='my-6 z-10 lg:z-0'>
              <Btn link='/products' color='white' bg='black' w='2/5' />
            </section>
          </section>
        </article>
        <article className='flex flex-1 justify-center items-center relative'>
          <section className='absolute w-36 h-36 sm:w-72 sm:h-72 xl:w-88 xl:h-88 bg-white z-0 rounded-full' />
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
