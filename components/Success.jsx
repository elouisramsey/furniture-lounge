import { BiPrinter } from 'react-icons/bi'
import { BsCheck } from 'react-icons/bs'
import Btn from './buttons/Btn'

const Success = ({ reference, cart, total }) => {
  console.log(cart, total)
  return (
    <section className='grid grid-cols-2'>
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
      <section className='bg-cateBg p-12'>
        <section className=' border-b border-solid border-borderColor py-4'>
          <section className='flex justify-between items-center mb-4'>
            {' '}
            <p className='text-lightGrey text-sm'>
              Receipt number: {reference}
            </p>
            <button
              className='flex items-center'
              onClick={() => window.print()}
            >
              <BiPrinter />{' '}
              <p className='text-black text-sm underline ml-2'>Print receipt</p>
            </button>
          </section>
          <p className='text-black text-base font-normal'>Order details</p>
        </section>
        <section className='border-b border-solid border-borderColor py-4 flex items-center'>
          <p className='text-lightGrey text-sm'>Ships to</p>
          <p className='text-lightGrey text-sm ml-6'>
            this is meant to be address
          </p>
        </section>
        <section className=' border-b border-solid border-borderColor pt-4 pb-8'>
          <section className='flex items-center justify-between'>
            <p className='text-black text-sm font-medium capitalize'>
              2 X King Sofa{' '}
            </p>
            <p className='text-black text-sm font-medium capitalize'>
              {'\u20A6'}
              {(183000).toLocaleString()}
            </p>
          </section>
        </section>
        <section className=' border-b border-solid border-black py-4'>
          <section className='flex items-center justify-between mb-4'>
            <p className='text-black text-sm capitalize'>Subtotal</p>
            <p className='text-black text-sm capitalize'>
              {'\u20A6'}
              {(183000).toLocaleString()}
            </p>
          </section>
          <section className='flex items-center justify-between mb-4'>
            <p className='text-black text-sm capitalize'>Shipping</p>
            <p className='text-black text-sm capitalize'>
              {'\u20A6'}
              {(17000).toLocaleString()}
            </p>
          </section>
        </section>
        <section className='py-4'>
          <section className='flex items-center justify-between mb-4'>
            <p className='text-black text-xl font-semibold capitalize'>
              Order total
            </p>
            <p className='text-black text-xl font-semibold capitalize'>
              {'\u20A6'}
              {(200000).toLocaleString()}
            </p>
          </section>
        </section>
      </section>
    </section>
  )
}

export default Success
